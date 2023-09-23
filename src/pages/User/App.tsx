import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "@firebase/auth";
import React, { useContext, useState, ChangeEvent } from "react";
import { AuthContext } from "./authContext";
import { auth } from "./firebase";

    function App() {
        const userInfo = useContext(AuthContext);
        const [email, setLoginEmail] = useState("");
        const [pwd, setLoginPassword] = useState("");
        const [isCreate, setIsCreate] = useState(false);
    
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
        setIsCreate(pre => !pre);
        };
    
        const handleSubit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // 회원 가입일때
        if (isCreate) {
            createUserWithEmailAndPassword(auth, email, pwd)
            .then(() => {
                alert("회원가입 성공");
            })
            .catch(e => {
                alert(e);
            });
        } else {
            signInWithEmailAndPassword(auth, email, pwd)
            .then(() => {
                alert("로그인 성공");
            })
            .catch(e => {
                alert(e);
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
                로그인 상태입니다
                <button onClick={handleLogout}> 로그아웃 </button>
            </div>
            ) : (
            <form onSubmit={handleSubit}>
                <input type="email" name="email" onChange={handleEmail} value={email} />
                <input type="password" name="pwd" onChange={handlePwd} value={pwd} />
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