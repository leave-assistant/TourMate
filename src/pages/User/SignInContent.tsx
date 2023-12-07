import React, { useEffect, useState } from "react";
import { 
    getAuth, 
    setPersistence, 
    signInWithEmailAndPassword, 
    browserSessionPersistence,
    GoogleAuthProvider,
    inMemoryPersistence,
    signInWithRedirect,
} from "@firebase/auth";
import styled from "styled-components";
import { auth } from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // firestore 추가
import { useRouter } from "next/router";
import SignUpContent from "./SignUpContent";

const SignIn = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    //const userInfo = useContext(AuthContext);
    const [email, setLoginEmail] = useState(""); // 이메일 상태
    const [password, setLoginPassword] = useState(""); // 비밀번호 상태
    const [userData, setUserData] = useState<any>(null);
    const [showAlert, setShowAlert] = useState(false);

    // Firestore 인스턴스 초기화
    const db = getFirestore();

    // 라우터 초기화(로그인성공시 자동으로 페이지 이동)
    const router = useRouter();

    const handleSignUpClick = () => {
        router.push('./SignUp');
    };

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

    // 로그인 버튼 클릭 핸들러
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            // 로그인 로직
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("로그인 성공");
                // 로그인 성공 시 MyPage로 이동
                router.push("./");
            })
            .catch((error) => {
                console.log("로그인 실패 : ", error.message);
            })
            })
        
    };

    // GoogleAuthProvider 생성
    const provider = new GoogleAuthProvider(); // GoogleAuthProvider 클래스를 authentication 라이브러리에서 사용할 수 있도록 불러오는 코드.
    provider.setCustomParameters({prompt: 'select_account'}); // signIn이랑 authentication을 위해서 GoogleAuthProvider를 사용할 때마다 구글 팝업을 항상 띄우기를 원한다는 의미이다.


    const signInWithGoogle = async () => {
        setPersistence(auth, inMemoryPersistence)
            .then(() => {
                const provider = new GoogleAuthProvider();
                signInWithRedirect(auth, provider);
                router.push("./MyPage");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    };

    return (
        <>
        <SignInContainer>
            <Title>MY 투어메이트</Title>
            <Introduce>
                <Image><img src="/MyPage_Image/people.png"/></Image><br/>
                <Profile>여행메이트에 오신것을 환영합니다<br/>편리하게 이용하세요</Profile>
                <GoogleImage onClick={signInWithGoogle}><img src="/Logo/btn_google_signin_light_normal_web.png"/></GoogleImage><br/>
                {/* <GoogleButton type="submit">구글로그인</GoogleButton> */}
            </Introduce>
            <History>
                    <SignInForm onSubmit={handleSignIn}>
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
                    </SignInForm>
            </History>
            </SignInContainer>
        </>
    );
};

const Button = styled.button`
    width: 360px;
    height: 40px;
    margin: 10px auto;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #0160D6;
    border-radius: 10px;
`;

const Text = styled.div`
    font-size: 20px;
    font-weight: normal; 
    background-color: #ffffff;
`;

const SignInContainer = styled.div`
    width: 390px;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;  
`;

const Title = styled.div`
    width: 350px;
    height: 50px;
    margin: 20px auto;
    font-size: 28px;
    font-weight: bold; 
    border-bottom: 1px solid #0160D6;
`;

const Image = styled.div`
    width: 130px;
    height: 130px;
    margin-top: 20px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
`;

const Profile = styled.div`
    width: 100%;
    height: 70px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: normal; 
    text-align: center;
`;

const GoogleImage = styled.div`
    margin-top: 0px;
    display: flex;
    margin-left: 25%;
    margin-right: auto;
`;

const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Introduce = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 35px;
    border-bottom: 1px solid #000000;
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
    background-color: #0160D6;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const History = styled.div`
    width: 100%;
    margin-top: 35px;
`;

export default SignIn;
