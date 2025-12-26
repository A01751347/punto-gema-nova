import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand,
    ForgotPasswordCommand,
    ConfirmForgotPasswordCommand,
    GetUserCommand,
    AdminGetUserCommand,
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID!;
const CLIENT_ID = process.env.AWS_COGNITO_CLIENT_ID!;

export interface AuthTokens {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface CognitoUser {
    username: string;
    email: string;
    emailVerified: boolean;
    sub: string;
    attributes: Record<string, string>;
}

/**
 * Sign in user with email and password
 */
export async function signIn(email: string, password: string): Promise<AuthTokens> {
    try {
        const command = new InitiateAuthCommand({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        });

        const response = await client.send(command);

        if (!response.AuthenticationResult) {
            throw new Error('Authentication failed');
        }

        return {
            accessToken: response.AuthenticationResult.AccessToken!,
            idToken: response.AuthenticationResult.IdToken!,
            refreshToken: response.AuthenticationResult.RefreshToken!,
            expiresIn: response.AuthenticationResult.ExpiresIn!,
        };
    } catch (error: any) {
        console.error('Sign in error:', error);
        throw new Error(error.message || 'Failed to sign in');
    }
}

/**
 * Sign up new user
 */
export async function signUp(
    email: string,
    password: string,
    attributes?: Record<string, string>
): Promise<{ userSub: string; userConfirmed: boolean }> {
    try {
        const userAttributes = [
            { Name: 'email', Value: email },
            ...(attributes
                ? Object.entries(attributes).map(([key, value]) => ({
                    Name: key,
                    Value: value,
                }))
                : []),
        ];

        const command = new SignUpCommand({
            ClientId: CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: userAttributes,
        });

        const response = await client.send(command);

        return {
            userSub: response.UserSub!,
            userConfirmed: response.UserConfirmed!,
        };
    } catch (error: any) {
        console.error('Sign up error:', error);
        throw new Error(error.message || 'Failed to sign up');
    }
}

/**
 * Confirm user sign up with verification code
 */
export async function confirmSignUp(email: string, code: string): Promise<void> {
    try {
        const command = new ConfirmSignUpCommand({
            ClientId: CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        });

        await client.send(command);
    } catch (error: any) {
        console.error('Confirm sign up error:', error);
        throw new Error(error.message || 'Failed to confirm sign up');
    }
}

/**
 * Initiate forgot password flow
 */
export async function forgotPassword(email: string): Promise<void> {
    try {
        const command = new ForgotPasswordCommand({
            ClientId: CLIENT_ID,
            Username: email,
        });

        await client.send(command);
    } catch (error: any) {
        console.error('Forgot password error:', error);
        throw new Error(error.message || 'Failed to initiate password reset');
    }
}

/**
 * Confirm forgot password with code and new password
 */
export async function confirmForgotPassword(
    email: string,
    code: string,
    newPassword: string
): Promise<void> {
    try {
        const command = new ConfirmForgotPasswordCommand({
            ClientId: CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
            Password: newPassword,
        });

        await client.send(command);
    } catch (error: any) {
        console.error('Confirm forgot password error:', error);
        throw new Error(error.message || 'Failed to reset password');
    }
}

/**
 * Get user details from access token
 */
export async function getUser(accessToken: string): Promise<CognitoUser> {
    try {
        const command = new GetUserCommand({
            AccessToken: accessToken,
        });

        const response = await client.send(command);

        const attributes: Record<string, string> = {};
        response.UserAttributes?.forEach((attr) => {
            if (attr.Name && attr.Value) {
                attributes[attr.Name] = attr.Value;
            }
        });

        return {
            username: response.Username!,
            email: attributes.email,
            emailVerified: attributes.email_verified === 'true',
            sub: attributes.sub,
            attributes,
        };
    } catch (error: any) {
        console.error('Get user error:', error);
        throw new Error(error.message || 'Failed to get user');
    }
}

/**
 * Admin: Get user by username/email
 */
export async function adminGetUser(username: string): Promise<CognitoUser> {
    try {
        const command = new AdminGetUserCommand({
            UserPoolId: USER_POOL_ID,
            Username: username,
        });

        const response = await client.send(command);

        const attributes: Record<string, string> = {};
        response.UserAttributes?.forEach((attr) => {
            if (attr.Name && attr.Value) {
                attributes[attr.Name] = attr.Value;
            }
        });

        return {
            username: response.Username!,
            email: attributes.email,
            emailVerified: attributes.email_verified === 'true',
            sub: attributes.sub,
            attributes,
        };
    } catch (error: any) {
        console.error('Admin get user error:', error);
        throw new Error(error.message || 'Failed to get user');
    }
}

/**
 * Admin: Create user
 */
export async function adminCreateUser(
    email: string,
    temporaryPassword: string,
    attributes?: Record<string, string>
): Promise<string> {
    try {
        const userAttributes = [
            { Name: 'email', Value: email },
            { Name: 'email_verified', Value: 'true' },
            ...(attributes
                ? Object.entries(attributes).map(([key, value]) => ({
                    Name: key,
                    Value: value,
                }))
                : []),
        ];

        const command = new AdminCreateUserCommand({
            UserPoolId: USER_POOL_ID,
            Username: email,
            TemporaryPassword: temporaryPassword,
            UserAttributes: userAttributes,
            MessageAction: 'SUPPRESS', // Don't send welcome email
        });

        const response = await client.send(command);
        return response.User?.Username!;
    } catch (error: any) {
        console.error('Admin create user error:', error);
        throw new Error(error.message || 'Failed to create user');
    }
}

/**
 * Admin: Set permanent password for user
 */
export async function adminSetUserPassword(
    username: string,
    password: string
): Promise<void> {
    try {
        const command = new AdminSetUserPasswordCommand({
            UserPoolId: USER_POOL_ID,
            Username: username,
            Password: password,
            Permanent: true,
        });

        await client.send(command);
    } catch (error: any) {
        console.error('Admin set password error:', error);
        throw new Error(error.message || 'Failed to set password');
    }
}

/**
 * Admin: Update user attributes
 */
export async function adminUpdateUserAttributes(
    username: string,
    attributes: Record<string, string>
): Promise<void> {
    try {
        const userAttributes = Object.entries(attributes).map(([key, value]) => ({
            Name: key,
            Value: value,
        }));

        const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: USER_POOL_ID,
            Username: username,
            UserAttributes: userAttributes,
        });

        await client.send(command);
    } catch (error: any) {
        console.error('Admin update attributes error:', error);
        throw new Error(error.message || 'Failed to update user attributes');
    }
}

export { client as cognitoClient };
