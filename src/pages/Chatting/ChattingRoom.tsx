import React from "react"
import styled from "styled-components"

const ChattingRoom = () => {
    return (
        <Room>
            <RoomHeader>
                <ImageBox>
                    <Img src="/User_Image/Profile_Blue.jpg"/>
                    <OtherImg src = "/User_Image/Profile_Purple.jpg"/>
                </ImageBox>
                <ChattingTitle>수원행궁가자</ChattingTitle>
                <Exit src = "ChattingRoom_Picture/exit.png"/>
            </RoomHeader>
            <ChattingPlan />
            <ImgChat>
                <UserImg src = "/User_Image/Profile_Blue.jpg" />
                <Chatting />
            </ImgChat>
            <Camera src = "/ChattingRoom_Picture/camera.png/"></Camera>
            <Chatting_Div></Chatting_Div>
            <Send>
                <SendFont>전송</SendFont>
            </Send>
        </Room>
    );
}

const Room = styled.div`
    width: 390px;
    height: 1018px;
    background-color: white;
    margin-top: 70px;
`;
const RoomHeader = styled.div`
    display: flex;
    width: 390px;
    height: 80px;
    background-color: #D9D9D9;
`;
const Img = styled.img`
    position: relative;
    width: 35px;
    height: 35px;
    margin-left : 9px;
    margin-top: 8px;
    border-radius: 17px;
`;
const OtherImg = styled.img`
    position: relative;
    width: 35px;
    height: 35px;
    margin-left : 37px;
    margin-top: -7px;
    border-radius: 17px;
`;
const ImageBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChattingTitle = styled.p`
    margin-top: 31px;
    margin-left: 15px;
    font-size : 18  px;
    font-weight: bold;
`;

const Exit = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 145px;
    margin-top: 25px;
`
const ChattingPlan = styled.div`
    width: 350px;
    height: 45px;
    margin-left: 15px;
    margin-top: 35px;
    background-color: lightgray;
    border-radius: 17px;
`;
const ImgChat = styled.div`
    display: flex;
    margin-top: 20px;
`;
const UserImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 15px;
`;
const Chatting = styled.div`
    display: flex;
    width: 270px;
    padding: 8px;
    margin-left: 27px;
    border-radius: 25px; 
    background-color: brown;
`;
const Camera = styled.img`
    position: absolute;
    bottom: 0;
    width: 25px;
    height: 20px;
    margin: 0px 30px 40px 20px;
`
const Chatting_Div = styled.div`
    position: absolute;
    width: 260px;
    height: 100px;
    bottom: 0;
    margin : 0 0 30px 60px;
    border-radius: 30px;
    border : 1px solid #0160D6;
`

const Send = styled.button`
    position : absolute;
    width: 45px;
    height: 35px;
    bottom: 0;
    margin: 0 0 30px 330px;
    border-radius: 15px;
    background-color: #0160D6;
    
`
const SendFont = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: white;
`



export default ChattingRoom;