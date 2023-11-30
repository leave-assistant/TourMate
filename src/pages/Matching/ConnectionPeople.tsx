import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import router, { useRouter } from 'next/router';
import ChattingRoom from"../Chatting/ChattingRoom";
class Persona {
  location: string;
  name: string;
  timeline: string;
  constructor(location: string, name: string, timeline: string) {
    this.location = location;
    this.name = name;
    this.timeline = timeline;
  }
}

const personas = [
  new Persona(' 강릉 여행지', '이지원', '08:00 기상  -10:00 학교 - 13:00 점심 - 14:00 오후 수업 17:00 -귀가'),
  new Persona(' 서울 여행지', '허균', '08:00 기상   -10:00 학교 - 13:00 점심 - 14:00 오후 수업 17:00 -귀가'),
  new Persona(' 부산 여행지', '홍길동', '08:00 기상 -10:00 학교 - 13:00 점심 - 14:00 오후 수업 17:00 -귀가'),
  new Persona('제주도 여행지', '이지원', '08:00 기상 -10:00 학교 - 13:00 점심 - 14:00 오후 수업 17:30 -귀가')
];

const ConnectPeople = () => {
  const [message, setMessage] = useState('');
  const [isChattingRoomVisible, setChattingRoomVisible] = useState(false);
  const outside = useRef(null);	
  const openChattingRoomModal = () => {
    setChattingRoomVisible(true);
  };
  const closeChattingRoomModal = () => {
    setChattingRoomVisible(false);
};
  const router = useRouter();
  const requestButtonClick = () => {
    alert('동행 요청을 보냈습니다.');
     openChattingRoomModal();
  //router.push('/Chatting/ChattingRoom');
  };


  const maxDisplayedPersona = personas.slice(0, 4);

  return (
    <div>
      {maxDisplayedPersona.map((individual, index) => (
        <Box key={index}>
          <Content>
            <ImageContainer>
              <img
                src="/User_Image/Profile_Blue.jpg"
                alt="My Image"
                style={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '70%',
                }}
              />
            </ImageContainer>
            <UserInfo>
              <Location>{individual.location}</Location>
              <Name>{individual.name}</Name>
              <Button onClick={requestButtonClick}>동행요청</Button>
            
            </UserInfo>
          </Content>
          <TimeLine>{individual.timeline}</TimeLine>
          
        </Box>
        
      ))}
       {isChattingRoomVisible && (
                <ModalOverlay
                    ref={outside} 
                    onClick={ (e) => { if(e.target == outside.current) setChattingRoomVisible(false) } }>
                        <ChattingRoom />
                </ModalOverlay>
            )}
    </div>
  );
};

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
 
  position: relative;
  width: 390px;
  height: 200px;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
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
  font-size: 30px;
  font-weight: light;
  margin-top: 7px;
  margin-bottom: 8px;
  text-align: left;
`;

const TimeLine = styled.p`
  width: 390px;
  font-size: 20px;
  font-weight: light;
  margin-top: 10px;
  margin-left: 15px;
  text-align: left;
`;

const Button = styled.button`
  width: 90px;
  height: 40px;
  background-color: #0160d6;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  position: absolute;
  top: 25px;
  right: 5px;
  &:hover {
    background-color: #003f9e;
  }
`;



;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


export default ConnectPeople;
