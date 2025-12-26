'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signUp, getUser, AuthTokens, CognitoUser } from '@/lib/auth/cognito';
import { User, UserRole } from '@/types';

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
                    const cognitoUserData = await getUser(accessToken);
                    setCognitoUser(cognitoUserData);

                    // Fetch full user data from our database
                    const response = await fetch('/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
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
            const tokens = await signIn(email, password);

            // Store tokens
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('idToken', tokens.idToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            // Get user data
            const cognitoUserData = await getUser(tokens.accessToken);
            setCognitoUser(cognitoUserData);

            // Fetch full user data from our database
            const response = await fetch('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string, userData?: Partial<User>) => {
        try {
            // Sign up with Cognito
            await signUp(email, password, {
                given_name: userData?.firstName || '',
                family_name: userData?.lastName || '',
            });

            // Create user in our database
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    ...userData,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user account');
            }

            // Note: User will need to confirm email before logging in
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
                const response = await fetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
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
