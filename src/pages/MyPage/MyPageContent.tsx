import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useUser, UserProvider } from '../User/UserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignIn from '../User/SignInContent';
import EditProfile from '../MyPage/EditProfile';
import EditText from '../MyPage/EditText';
import Use from '../MyPage/Use';
import Logout from '../User/logout';

// Firebase 인증 객체 가져오기
const auth = getAuth();

const App = () => {
    const user = useUser();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            console.log('사용자가 로그인되어 있습니다.');
            setIsLogin(true);
        } else {
            console.log('사용자가 로그아웃되었습니다.');
            setIsLogin(false);
        }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
        {isLogin ? (
          <MyPageContent>
            <Top>
              <Title>MY 투어메이트</Title>
              <Logout />
            </Top>
            <Image><img src="/MyPage_Image/people.png" alt="people" /></Image>
            <Profile><EditProfile /></Profile>
            <Introduce>
              <Text><EditText /></Text>
            </Introduce>
            <Use />
          </MyPageContent>
        ) : (
            <SignIn />
        )}
        </>
    );
};

const MyPageContent = styled.div`
  width: 390px;
  height: 100%;
  background-color: #ffffff;
  border-left: 1px solid #0160D6;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar { width: 10px; }
  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3; 
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track { background-color: #f1f1f1; }
`;

const Top = styled.div`
  width: 350px;
  height: 50px;
  margin: 10px auto;
  display: flex;
  border-bottom: 1px solid #0160D6;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold; 
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  margin: 30px auto 10px;
`;

const Profile = styled.div`
  width: 100%;
  height: 70px;
  font-weight: normal; 
  text-align: center;
`;

const Introduce = styled.div`
  width: 350px;
  margin: 50px auto;
  padding-bottom: 40px;
  border-bottom: 1px solid #000000;
`;

const Text = styled.div`
  width: 80%;
  margin: 5px 0px 0px 40px;
  font-weight: normal; 
`;

export default App;
