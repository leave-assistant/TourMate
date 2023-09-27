import React , { useState }from 'react';
import styled from 'styled-components';

const ConnectPeople = () => {
  const [message, setMessage] = useState('');

  const requestButtonClick = () => {
    alert("클릭");
    setMessage('동행요청');
  };
  return (
    <Box>
      <Content>
        <ImageContainer>
          <img
            src="/User_Image/Profile_Blue.jpg"
            alt="My Image"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '70%',
            }}
          />
        </ImageContainer>
        <UserInfo>
          <Location>강릉 여행지</Location>
          <Name>이지원</Name>
          <Button onClick={requestButtonClick}>동행요청</Button>
        </UserInfo>
      </Content>
      <TimeLine>08:00 기상 -10:00 학교 - 13:00 점심
         - 14:00 오후 수업 17:00 -귀가 </TimeLine>
    </Box>
  );
};

export default ConnectPeople;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const Box = styled.div`
  margin-left: 20px;
  position: relative;
  width: 390px;
  height: 200px;
  border: 1px solid black;
  
`;

const ImageContainer = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;

const UserInfo = styled.div` 
  margin-left: 15px;
  margin-top: 10px;
`;

const Location = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 8px;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: light;
  margin-top: 7px;
  margin-bottom: 8px;
  text-align: left;
`;

const TimeLine = styled.p`
  font-size: 16px;
  font-weight: light;
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
`;

const Button = styled.button`
  width: 90px;
  height: 30px;
  background-color: #0160D6;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  position: absolute; //위치고정
  top: 25px;
  right: 5px;
  &:hover {
    background-color: #003f9e;
  }
`;
