// client/src/utils/auth.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
        // Split the token into its parts
        const base64Url = token.split('.')[1];
        // Replace '-' with '+' and '_' with '/' to correctly decode base64Url encoding
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decode from Base64
        const payload = atob(base64);
        // Parse the payload as JSON
        const parsed = JSON.parse(payload);
        // Return the user ID from the payload
        return parsed.userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [personalInfoId, setPersonalInfoId] = useState(null);

    const setPersonalInfoIdAndStore = useCallback((id) => {
        localStorage.setItem('personalInfoId', id);
        setPersonalInfoId(id);
    }, []);

    const fetchPersonalInfoId = async (userId, token) => {
        const url = `/api/personalInformation/${userId}`;
        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
            const data = await response.json();
            setPersonalInfoIdAndStore(data.personalInfoId);
        } catch (error) {
            console.error(`Error fetching personal information ID: ${error}`);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const userId = getUserIdFromToken(token);
            if (userId) fetchPersonalInfoId(userId, token).catch(console.error);
        }
    }, [fetchPersonalInfoId]);

    const login = async (token, userData = null) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(userData);
        const userId = getUserIdFromToken(token);
        if (userId) await fetchPersonalInfoId(userId, token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('personalInfoId');
        setIsAuthenticated(false);
        setUser(null);
        setPersonalInfoId(null);
    };

    const value = {
        isAuthenticated,
        user,
        personalInfoId,
        login,
        logout,
        setPersonalInfoIdAndStore,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
