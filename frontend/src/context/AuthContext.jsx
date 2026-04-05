import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('AuthContext useEffect running');
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (!isExpired) {
                    setUser(decoded);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('accessToken');
                }
            } catch {
                localStorage.removeItem('accessToken');
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback((token, userData) => {
        localStorage.setItem('accessToken', token);
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    // ✅ useMemo prevents new object reference on every render
    const value = useMemo(() => ({
        user,
        isAuthenticated,
        loading,
        login,
        logout
    }), [user, isAuthenticated, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);