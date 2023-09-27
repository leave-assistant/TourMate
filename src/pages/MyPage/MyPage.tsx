import React from 'react';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <MyPageWrapper>
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

export default MyPage;