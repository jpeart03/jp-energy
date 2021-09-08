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

    function login() {
        const googleProvider = new GoogleAuthProvider();
        return signInWithRedirect(auth, googleProvider);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
