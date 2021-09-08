import React, { useContext, useState, useEffect } from "react";
import {
    signInWithRedirect,
    GoogleAuthProvider,
    signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [authLoading, setAuthLoading] = useState(true);

    function login() {
        const googleProvider = new GoogleAuthProvider();
        setAuthLoading(true);
        return signInWithRedirect(auth, googleProvider);
    }

    function logout() {
        setAuthLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setAuthLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        authLoading,
        currentUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
