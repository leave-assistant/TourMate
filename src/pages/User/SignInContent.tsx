import React, { useEffect, useState, useContext } from "react";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "@firebase/auth";
import styled from "styled-components";
import { auth } from "./firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // firestore 추가
import Link from "next/link";
import { AuthContext } from "./authContext";
import { useRouter } from "next/router";

const SignIn = () => {
    const userInfo = useContext(AuthContext);
    const [email, setLoginEmail] = useState(""); // 이메일 상태
    const [password, setLoginPassword] = useState(""); // 비밀번호 상태
    const [isCreate, setIsCreate] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [showAlert, setShowAlert] = useState(false);

    // Firestore 인스턴스 초기화
    const db = getFirestore();

    // 라우터 초기화(로그인성공시 자동으로 페이지 이동)
    const router = useRouter();

    useEffect(() => {
        // Firebase 인증 상태 변화를 감지하고 사용자데이터 가져오기
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if(user) {
                    // 사용자가 로그인 상태일때
                    const userId = user.uid;
                    const userRef = doc(db, "users", userId);
                    getDoc(userRef)
                    .then((doc) => {
                        if(doc.exists()) {
                            setUserData(doc.data());
                        } else {
                            setShowAlert(true);
                            // alert("사용자가 존재하지 않습니다.");
                        }
                    })
                    .catch((error) => {
                        alert("사용자 데이터를 가져오는 중 오류 발생 : "+error);
                    });
                } else {
                    // 사용자가 로그아웃 상태, 사용자 데이터 초기화
                    setUserData(null);
                }
            });
            // 컴포넌트가 언마운트 -> Firebase 리스너 구독을 해제함
            return () => unsubscribe();
        });
        
    }, [db]);

    // 이메일 입력값 변경 핸들러
    const handleLoginEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginEmail(e.target.value);
    };

    // 비밀번호 입력값 변경 핸들러
    const handleLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginPassword(e.target.value);
    };

    // 회원 가입 버튼 클릭 핸들러
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        // 로그인 로직
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("로그인 성공");
                // 로그인 성공 시 MyPage로 이동
                router.push("./MyPage");
            })
            .catch((error) => {
                alert("로그인 실패 : " + error.message);
            })
    };

    return (
        <SignUpContainer>
            <Title>MY 투어메이트</Title>
            <Introduce>
                <Image><img src="/MyPage_Image/people.png"/></Image><br/>
                <Profile>여행메이트에 오신것을 환영합니다<br/>편리하게 이용하세요</Profile>
                <GoogleImage><img src="/Logo/btn_google_signin_light_normal_web.png"/></GoogleImage><br/>
                {/* <GoogleButton type="submit">구글로그인</GoogleButton> */}
            </Introduce>
            <History>
                    <SignUpForm onSubmit={handleSignIn}>
                        <Input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={handleLoginEmail}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={handleLoginPassword}
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

const GoogleImage = styled.div`
    margin-top: 0px;
    display: flex;
    margin-left: 25%;
    margin-right: auto;
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

export default SignIn;
