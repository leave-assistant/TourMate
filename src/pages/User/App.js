import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe(); // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
        };
    }, []);

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const handleRegisterEmailChange = (e) => {
        setRegisterEmail(e.target.value);
    };

    const handleRegisterPasswordChange = (e) => {
        setRegisterPassword(e.target.value);
    };

    const handleLoginEmailChange = (e) => {
        setLoginEmail(e.target.value);
    };

    const handleLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value);
    };

    return (
        <div style={{ textAlign: "center", margin: 10 }}>
            <div>
                <input
                    placeholder="Email"
                    onChange={handleRegisterEmailChange}
                />
                <input
                    placeholder="Password"
                    onChange={handleRegisterPasswordChange}
                />
                <button onClick={register}>Create User</button>
            </div>
            <div>
                <h3>Login</h3>
                <input placeholder="Email" onChange={handleLoginEmailChange} />
                <input
                    placeholder="Password"
                    onChange={handleLoginPasswordChange}
                />
                <button onClick={login}>Login</button>
                <div>User Logged In:</div>
                <div>{user?.email}</div>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default App;
