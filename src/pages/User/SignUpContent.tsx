import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth"; // Firebase의 createUserWithEmailAndPassword 함수를 import
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // firestore 추가

const SignUp = () => {
    const [email, setEmail] = useState(""); // 이메일 상태
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [age, setAge] = useState(""); // 비밀번호 상태

    // 이메일 입력값 변경 핸들러
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    // 비밀번호 입력값 변경 핸들러
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    // age 입력값 변경 핸들러
    const handleAgeChange = (e: any) => {
        setAge(e.target.value);
    };

    // 회원 가입 버튼 클릭 핸들러
    const handleSignUp = async (e: any) => {
        e.preventDefault();
        
        // Firebase를 사용하여 회원 가입 수행
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                const userData = {
                    nickname: email,
                    age: '',
                    gender: '',
                    MBTI: '',
                    introduce: '',
                    tripStyle: '',
                };
                // Firestore 'users' 컬렉션에 사용자 정보를 추가합니다.
                const db = getFirestore();
                setDoc(doc(db, "users", userId), userData)
                    .then(() => {
                        alert("회원가입 성공");
                    })
                    .catch((error) => {
                        alert("Firestore에 사용자 정보 저장 중 오류 발생: " + error);
                    });
            })
            .catch((error) => {
                alert("회원가입 실패: " + error.message);
            });
    };

    return (
        <SignUpContainer>
            <SignUpForm onSubmit={handleSignUp}>
                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Input
                    type="date"
                    placeholder="비밀번호"
                    value={age}
                    onChange={handleAgeChange}
                />
                <SignUpButton type="submit">회원가입</SignUpButton>
            </SignUpForm>
        </SignUpContainer>
    );
};

// 스타일드 컴포넌트를 사용하여 스타일을 정의
const SignUpContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SignUpButton = styled.button`
    padding: 10px;
    width: 100%;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default SignUp;
