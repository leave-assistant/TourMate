import React, { useState, useEffect} from "react";
import KakaoMap from "../KakaoMap";
import styled from "styled-components";
import MenuBar from "../../../public/src/NavBar";
import { auth } from "./firebase"; 

const Main = () => {
    // MenuBar와 MenuContent의 보이기/숨기기 상태를 관리하는 상태 변수
    const [isMenuVisible, setMenuVisible] = useState(true);

    // MenuBar를 클릭할 때 MenuContent의 상태를 토글하는 함수
    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
      // Firestore에서 사용자 데이터를 가져오는 비동기 함수
      const fetchUserData = async () => {}
    })

    return (
        <MainPage>
            <Sidebar>
                <MenuBar/>
                <MenuContentWrapper isVisible={isMenuVisible}>
                <MyPageContent>
                  <Title>MY 투어메이트</Title>
                  <Image><img src="/MyPage_Image/people.png"/></Image>
                  <Profile>홍길동<br/>20대/남성</Profile>
                  <Introduce>
                    <Question>여행스타일</Question> <Answer>여행스타일을 입력해주세요</Answer>
                    <Question>MBTI</Question> <Answer>MBTI을 입력해주세요</Answer>
                    <Question>소개글</Question> <Answer>소개글을 입력해주세요</Answer>
                  </Introduce>
                  <History>
                    <UseHistory>이용 기록</UseHistory>
                    <Button>이전 코스 내역</Button>
                    <Button>내가 작성한 리뷰</Button>
                    <LogoutButton onClick={() =>{
                      auth.signOut();
                      alert("로그아웃 되었습니다");
                    }}>로그아웃</LogoutButton>
                  </History>
                </MyPageContent>
                </MenuContentWrapper>
            </Sidebar>

            <MapContainer>
                <KakaoMap />
            </MapContainer>
        </MainPage>
    );
};

const LogoutButton = styled.button`
    padding: 10px;
    width: 60%;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const MainPage = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: white;
`;

const Sidebar = styled.div`
    display: flex;
    width: 510px; /* 원하는 사이드바 너비로 조정 */
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: #ffffff;
    
`;
const MenuContentWrapper = styled.div<{ isVisible: boolean }>`
    width: ${(props) => (props.isVisible ? "86.5%" : "0%")};
    overflow: hidden;
    transition: width 0.3s ease-in-out;
`;

const MapContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const MyPageContent = styled.div`
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
  border-bottom: 1px solid #0160D6
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

const Introduce = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 35px;
  border-bottom: 1px solid #000000
`;

const Question = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-left: 30px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000
`;

const Answer = styled.div`
  width: 100%;
  margin: 5px;
  font-size: 22px;
  font-weight: naomal; 
  text-align: center;
  color: #D3D3D3
`;

const History = styled.div`
  width: 100%;
  margin-top: 35px;
`;

const UseHistory = styled.div`
  width: 100%;
  margin-left: 25px;
  font-size: 26px;
  font-weight: bold; 
`;

const Button = styled.div`
  width: 400px;
  height: 50px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  line-height: 50px;
  font-size: 24px;
  font-weight: normal; 
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #0160D6;
  border-radius: 10px;
`;

export default Main;
