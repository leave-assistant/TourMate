
import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react"
import ChattingRoom from "./ChattingRoom";

const UserProfile = () => {
    const [isChattingRoomVisible, setChattingRoomVisible] = useState(false);
    const outside = useRef(null);	

    const openChattingRoomModal = () => {
        setChattingRoomVisible(true);
    };

    const closeChattingRoomModal = () => {
        setChattingRoomVisible(false);
    };
  

    return (
        <div>
        <User onClick={openChattingRoomModal}>
            <ImageContainer>
                <img
                    src="/User_Image/Profile_Blue.jpg"
                    alt="My Image"
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '30px',
                    
                    }}
                />
            </ImageContainer>
            <UserInfo>
                <UserName>진희도</UserName>
                <Chat>최근에 여행가기로 한...</Chat>
            </UserInfo>
        </User>
            {isChattingRoomVisible && (
                <ModalOverlay
                    ref={outside} 
                    onClick={ (e) => { if(e.target == outside.current) setChattingRoomVisible(false) } }>
                        <ChattingRoom />
                </ModalOverlay>
            )}
        </div>
    );
}

export default UserProfile;

const User = styled.div`
    display: flex;
    width: 433px;
    height: 100px;
    margin-bottom: 10px;
`;

const ImageContainer = styled.div`
    margin-left: 10px;
    margin-top: 10px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    margin-top: 10px;
`;

const UserName = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 8px;
`;

const Chat = styled.p`
    font-size: 14px;
    margin-top: 0px;
    margin-bottom: 0;
`;

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
