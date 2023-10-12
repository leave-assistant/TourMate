import React from "react";
import styled from "styled-components";
import EditTourStyle from './EditTourStyle';
import EditMbti from './EditMbti';
import EditInfo from './EditInfo';
import Use from "./Use";

const MyPage = () => {
  return (
      <MyPageContent>
        <Title>MY 투어메이트</Title>
        <Image><img src="/MyPage_Image/people.png"/></Image>
        <Profile>홍길동<br/>20대/남성</Profile>
        <Introduce>
          <TourStyleQuestion>여행스타일</TourStyleQuestion> 
          <TourStyle><EditTourStyle /></TourStyle>
          <MbtiQuestion>MBTI</MbtiQuestion> 
          <Mbti><EditMbti /></Mbti>
          <InfoQuestion>소개글</InfoQuestion> 
          <Info><EditInfo /></Info>
        </Introduce>
        <Use />
        <Bottom><b>홍길동</b>님 | 로그아웃</Bottom>
      </MyPageContent>
  );
};

const MyPageContent = styled.div`
  width: 390px;
  height: 100%;
  background-color: #ffffff;
  border-left: 1px solid #0160D6;
  overflow: scroll;
`;

const Title = styled.div`
  width: 350px;
  height: 50px;
  margin: 0px auto;
  padding: 5px 0px 0px 5px;
  font-size: 28px;
  font-weight: bold; 
  border-bottom: 1px solid #0160D6;
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
  margin-top: 10px;
  font-size: 24px;
  font-weight: normal; 
  text-align: center;
`;

const Introduce = styled.div`
  width: 350px;
  margin: 35px auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #000000
`;

const TourStyleQuestion = styled.div`
  width: 100%;
  margin: 25px 0px 0px 30px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000
`;

const TourStyle = styled.div`
  width: 80%;
  margin: 5px 0px 0px 50px;
  font-size: 20px;
  font-weight: normal; 
`;

const MbtiQuestion = styled.div`
  width: 100%;
  margin: 25px 0px 0px 30px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000
`;

const Mbti = styled.div`
  width: 80%;
  margin: 5px 0px 0px 50px;
  font-size: 20px;
  font-weight: normal; 
`;

const InfoQuestion = styled.div`
  width: 100%;
  margin: 25px 0px 0px 30px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000
`;

const Info = styled.div`
  width: 80%;
  margin: 5px 0px 0px 50px;
  font-size: 20px;
  font-weight: normal; 
`;

const Bottom = styled.div`
  width: 390px;
  height: 20px;
  position : fixed;
  bottom : 0;
  text-align: right;
  font-size: 16px;
  font-weight: normal; 
  color: #585858;
  background-color: #D3D3D3;
`;

export default MyPage;