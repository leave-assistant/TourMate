import React from "react";
import styled from "styled-components";

const MyPage = () => {
  return (
    <MyPageWrapper>
      <MenuBar></MenuBar>
      <MyPageContent>
        <Title>MY 투어메이트</Title>
        <Edit><img src="/MyPage_Image/edit.png"/></Edit>
        <Image><img src="/MyPage_Image/people.png"/></Image>
        <Profile>홍길동<br/>20대/남성</Profile>
        <Introduce>
          <Question>여행스타일</Question> <Answer>여행스타일을 입력해주세요</Answer>
          <Question>MBTI</Question> <Answer>MBTI을 입력해주세요</Answer>
          <Question>소개글</Question> <Answer>소개글을 입력해주세요</Answer>
        </Introduce>
        <History>
          <UseHistory>이용 기록</UseHistory>
          <Button><a href="./Course">이전 코스 내역</a></Button>
          <Button><a href="./Review">내가 작성한 리뷰</a></Button>
        </History>
      </MyPageContent>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled.div`
  width: 100%;
  height: 1080px;
  display: flex;
  background-color: #000000;
`;

const MenuBar = styled.div`
  width: 62px;
  height: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid black;
`;

const MyPageContent = styled.div`
  width: 390px;
  height: 100%;
  background-color: #ffffff;
`;

const Title = styled.div`
  width: 350px;
  height: 50px;
  margin: 15px auto;
  font-size: 28px;
  font-weight: bold; 
  border-bottom: 1px solid #0160D6
`;

const Edit = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  margin-left: 340px;
`;

const Image = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  margin: 0px auto;
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
  height: 290px;
  margin: 35px 0px 0px 10px;
  border-bottom: 1px solid #000000
`;

const Question = styled.div`
  width: 100%;
  margin: 25px 0px 0px 30px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000
`;

const Answer = styled.div`
  width: 100%;
  margin: 5px 0px 0px 50px;
  font-size: 22px;
  font-weight: normal; 
  color: #D3D3D3;
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
  width: 360px;
  height: 50px;
  margin: 10px auto;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: normal; 
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #0160D6;
  border-radius: 10px;
`;

export default MyPage;