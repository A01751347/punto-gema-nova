'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginAction, registerAction, getUserAction, getUserDbAction } from '@/app/actions/auth-actions';
import { User, UserRole } from '@/types';
// Types needed locally
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

interface AuthContextType {
    user: User | null;
    cognitoUser: CognitoUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const { success, user: cognitoUserData, error } = await getUserAction(accessToken);

                    if (success && cognitoUserData) {
                        setCognitoUser(cognitoUserData);

                        if (cognitoUserData.email) {
                            const { success: dbSuccess, user: dbUser } = await getUserDbAction(cognitoUserData.email);
                            if (dbSuccess && dbUser) {
                                setUser(dbUser);
                            }
                        }
                    } else {
                        // Token invalid/expired
                        throw new Error(error || 'Invalid token');
                    }
                }
            } catch (error) {
                console.error('Failed to load user:', error);
                // Clear invalid tokens
                localStorage.removeItem('accessToken');
                localStorage.removeItem('idToken');
                localStorage.removeItem('refreshToken');
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { success, tokens, error } = await loginAction(email, password);

            if (!success || !tokens) {
                throw new Error(error || 'Login failed');
            }

            // Store tokens
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('idToken', tokens.idToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            // Get user data (Server Action)
            const { success: userSuccess, user: cognitoUserData } = await getUserAction(tokens.accessToken);
            if (userSuccess && cognitoUserData) {
                setCognitoUser(cognitoUserData);

                if (cognitoUserData.email) {
                    const { success: dbSuccess, user: dbUser } = await getUserDbAction(cognitoUserData.email);
                    if (dbSuccess && dbUser) {
                        setUser(dbUser);
                    }
                }
            }

        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string, userData?: Partial<User>) => {
        try {
            // Sign up with Cognito (Server Action)
            const { success, error } = await registerAction(email, password, {
                given_name: userData?.firstName || '',
                family_name: userData?.lastName || '',
            });

            if (!success) {
                throw new Error(error || 'Registration failed');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setCognitoUser(null);
    };

    const refreshUser = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const { success, user: cognitoUserData } = await getUserAction(accessToken);
                if (success && cognitoUserData && cognitoUserData.email) {
                    const { success: dbSuccess, user: dbUser } = await getUserDbAction(cognitoUserData.email);
                    if (dbSuccess && dbUser) {
                        setUser(dbUser);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to refresh user:', error);
        }
    };

    const value = {
        user,
        cognitoUser,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
