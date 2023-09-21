import React from "react";
import styled from "styled-components";

const UserProfile = () => {
    return (
        <User>
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





