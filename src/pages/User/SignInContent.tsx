import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth"; // Firebase의 createUserWithEmailAndPassword 함수를 import
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // firestore 추가
import Link from "next/link";

const SignUp = () => {
    const [email, setEmail] = useState(""); // 이메일 상태
    const [password, setPassword] = useState(""); // 비밀번호 상태

    // 이메일 입력값 변경 핸들러
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    // 비밀번호 입력값 변경 핸들러
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    // 회원 가입 버튼 클릭 핸들러
    const handleSignUp = async (e: any) => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                const userData = {
                    nickname: email,
                    age: age,
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
            <Title>MY 투어메이트</Title>
            <Introduce>
                <Image><img src="/MyPage_Image/people.png"/></Image><br/>
                <Profile>여행메이트를 더 안전하고<br/>편리하게 이용하세요</Profile>
            </Introduce>
            <History>
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
                        <br/>
                        <SignUpButton type="submit">로그인</SignUpButton>
                        <br/>
                        <Link href="./SignUp">회원이 아니신가요?</Link>
                </SignUpForm>
            </History>
        </SignUpContainer>
    );
};

// 스타일드 컴포넌트를 사용하여 스타일을 정의
const SignUpContainer = styled.div`
    width: 433px;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;  
`;

const Title = styled.div`
    width: 100%;
    height: 50px;
    margin-top: 20px;
    font-size: 28px;
    font-weight: bold; 
    border-bottom: 1px solid #000000
`;

const Image = styled.div`
    width: 130px;
    height: 130px;
    margin-top: 40px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
`;

const Profile = styled.div`
    width: 100%;
    height: 70px;
    margin-top: 10px;
    font-size: 24px;
    font-weight: normal; 
    text-align: center;
`;

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Introduce = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 35px;
    border-bottom: 1px solid #000000
`;

const Input = styled.input`
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SignUpButton = styled.button`
    padding: 10px;
    width: 60%;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const History = styled.div`
    width: 100%;
    margin-top: 35px;
`;

// const LoginLink = styled.div`
//     padding: 10px;
//     width: 60%;
//     font-size: 18px;
//     background-color: #007bff;
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
// `;

export default SignUp;
