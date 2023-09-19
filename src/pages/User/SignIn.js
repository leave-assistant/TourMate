import React, { useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
//페이지 이동
import Link from "next/link";

const SignIn = () => {
    //컴포넌트 상태 초기화

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

    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        signInWithPopup(auth, provider) // popup을 이용한 signup
            .then((data) => {
                setUserData(data.user); // user data 설정
                console.log(data) // console로 들어온 데이터 표시
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    //onChange 이벤트 처리

    const handleLoginEmailChange = (e) => {
        setLoginEmail(e.target.value);
    };

    const handleLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value);
    };

    return (
        <div style={{ textAlign: "center", margin: 10 }}>
            <div>
                <h3>Login</h3>
                <input placeholder="Email" onChange={handleLoginEmailChange} />
                <input
                    placeholder="Password"
                    onChange={handleLoginPasswordChange}
                />
                <button onClick={login}>Login</button>
                </div>
                <div>
                <div>User Logged In:</div>
                <div>{user?.email}</div>
                <button onClick={logout}>Logout</button>
                <div><button><Link href={'/User/SignUp'}>회원가입</Link></button></div>
                <div>
                    <button onClick={handleGoogleLogin}>구글로그인</button>
                    {user ? user.displayName : null}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
