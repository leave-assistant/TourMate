import React from "react";
import styled from "styled-components";
import EditText from './EditText';
import Use from "./Use";

const MyPage = () => {
  return (
      <MyPageContent>
        <Title>MY 투어메이트</Title>
        <Image><img src="/MyPage_Image/people.png"/></Image>
        <Profile>홍길동<br/>20대/남성</Profile>
        <Introduce>
          <Edit><EditText /></Edit>
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
  overflow: auto;
  &::-webkit-scrollbar { width: 12px; }
  &::-webkit-scrollbar-thumb {
    background-color: #0160D6; 
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track { background-color: #f1f1f1; }
`;

const Title = styled.div`
  width: 350px;
  height: 50px;
  margin: 5px auto;
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
  margin: 50px auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #000000
`;

const Edit = styled.div`
  width: 80%;
  margin: 5px 0px 0px 40px;
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