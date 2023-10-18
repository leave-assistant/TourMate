import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, UserMetadata, UserInfo } from '@firebase/auth';
import { auth } from './firebase';

// AuthContext의 타입 정의
interface AuthContextProps extends User {
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

// AuthProvider 컴포넌트 정의
export const AuthProvider: React.FunctionComponent<{ children: React.ReactNode}> = ({ children }) => {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
    });

    return () => unsubscribe();
}, []);

// AuthContextProps 형식으로 컨텍스트 값 설정
const contextValue: AuthContextProps | null = user
    ? {
        ...user,
        loading,
}
: null;

// AuthContext.Provider를 사용하여 자식 컴포넌트에 컨텍스트 값 제공
return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth 훅 정의
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
