import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "@firebase/auth";
import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import { AuthContext } from "./authContext";
import { auth, firestore } from "./firebase";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore"; // firestore 추가

function App() {
const userInfo = useContext(AuthContext);
const [email, setLoginEmail] = useState("");
const [pwd, setLoginPassword] = useState("");
const [isCreate, setIsCreate] = useState(false);
const [userData, setUserData] = useState<any>(null); // Firestore에서 가져온 사용자 데이터

// Firestore 인스턴스 초기화
const db = getFirestore();

useEffect(() => {
    // Firebase 인증 상태 변화를 감지하고 사용자 데이터를 가져옵니다.
    const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
        // 사용자가 로그인 상태일 때 Firestore에서 사용자 데이터를 가져옵니다.
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        getDoc(userRef)
            .then((doc) => {
                if(doc.exists()){
                    setUserData(doc.data());
                } else{
                    console.log("사용자 데이터가 존재하지 않습니다.");
                }
            })
        .catch((error) => {
            console.error("Firestore에서 사용자 데이터를 가져오는 중 오류 발생:", error);
        });
    } else {
        // 사용자가 로그아웃 상태일 때 사용자 데이터를 초기화합니다.
        setUserData(null);
    }
    });

    // 컴포넌트가 언마운트되면 Firebase 리스너 구독을 해제합니다.
    return () => unsubscribe();
}, []);

const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginEmail(e.target.value);
};

const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginPassword(e.target.value);
};

const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCreate((prev) => !prev);
};

const handleSubit = (e: React.FormEvent) => {
    e.preventDefault();

    // 회원 가입일 때
    if (isCreate) {
    createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
        const userId = userCredential.user.uid;
        const userData = {
            email: email
        };
        // Firestore 'users' 컬렉션에 사용자 정보를 추가합니다.
        setDoc(doc(firestore, "users", userId), userData)
        .then(() => {
            alert("회원가입 성공");
        })
            .catch((error) => {
            alert("Firestore에 사용자 정보 저장 중 오류 발생: " + error);
            });
        })
        .catch((error) => {
        alert(error);
        });
    } else {
    signInWithEmailAndPassword(auth, email, pwd)
        .then(() => {
        alert("로그인 성공");
        })
        .catch((error) => {
        alert(error);
        });
    }
};

// 로그아웃 기능
const handleLogout = () => {
    signOut(auth);
};

return (
    <div className="App">
    {userInfo ? (
        <div>
        <p>로그인 상태입니다</p>
        <p>사용자 이름: {userData ? userData.displayName : ""}</p>
        <button onClick={handleLogout}>로그아웃</button>
        </div>
    ) : (
        <form onSubmit={handleSubit}>
        이메일 : <input type="email" name="email" onChange={handleEmail} value={email} />
        비밀번호 : <input type="password" name="pwd" onChange={handlePwd} value={pwd} />
        <button type="submit"> {isCreate ? "만들기" : "로그인"}</button>
        <button type="button" onClick={handleClickCreate}>
            {isCreate ? "취소" : "회원가입"}
        </button>
        </form>
    )}
    </div>
);
}

export default App;
