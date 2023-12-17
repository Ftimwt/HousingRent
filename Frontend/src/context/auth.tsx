// AuthContext.tsx
import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import {Login, Logout, Whoami} from "../requests/auth.ts";

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    whoami: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}


const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        whoami().then(console.log);
    }, [user]);

    const whoami = async () => {
        try {
            setLoading(true);
            const response = await Whoami();
            console.log(response.data)
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    const login = async (username: string, password: string) => {
        let result = false;
        try {
            setLoading(true);
            result = await Login({username, password});
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
        return result;
    };

    const logout = async () => {
        setLoading(true);
        let result = false;
        try {
            setLoading(true)
            result = await Logout()
        } catch (e) {
        } finally {
            setLoading(false);
        }
        setUser(null);
        return result;
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading, whoami}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    useEffect(() => {
        Whoami().then(console.log);
    }, []);

    return context;
};

export {AuthProvider, useAuth};
