import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";
//페이지 이동
import Link from "next/link";

const SignUp = () => {
    //컴포넌트 상태 초기화
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    //onAuthStateChanged: 인증 상태 변경될때마다 호출되는 리스너 등록
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


    //onChange 이벤트 처리
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
                <h3>SignUp</h3>
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
                <Link href={'/User/SignIn'}>로그인</Link>
            </div>
        </div>
    );
};

export default SignUp;