import React from 'react';
import styled from 'styled-components';
import people from 'src/pages/MyPages/people.png';

const MyPage = () => {
  return (
    <MyPageWrapper>
      <MenuBar></MenuBar>
      <MyPageContent>
        <Title>MY 투어메이트</Title>
        <Image src={people} />
        <Profile>홍길동<br/>20대/남성</Profile>
        <Introduce>
          <Q>여행스타일</Q> <A>여행스타일을 입력해주세요</A>
          <Q>MBTI</Q> <A>MBTI을 입력해주세요</A>
          <Q>소개글</Q> <A>소개글을 입력해주세요</A>
        </Introduce>
        <Record>
          <T>이용 기록</T>
          <Button>이전 코스 내역</Button>
          <Button>내가 작성한 리뷰</Button>
        </Record>
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
  width: 66px;
  height: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid black;
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

const Image = styled.img`
  width: 131px;
  height: 131px;
  margin-top: 40px;
  text-align: center;
`;

const Profile = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 15px;
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

const Q = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-left: 30px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000
`;

const A = styled.div`
  width: 100%;
  margin: 5px;
  font-size: 22px;
  font-weight: naomal; 
  text-align: center;
  color: #D3D3D3
`;

const Record = styled.div`
  width: 100%;
  margin-top: 35px;
`;

const T = styled.div`
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