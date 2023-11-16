import React, { useState } from "react";
import styled from "styled-components";
import MainMenu from "@/pages/Home/MainMenu";
import Basic from "@/pages/Matching/basic";
import Chatting from "@/pages/Chatting";
import MyPage from "@/pages/MyPage/MyPage";
import Menu from "@/pages/ai_course/Menu";

interface MenuContentProps {
    selectedComponent: string | null;
}

const MenuContent: React.FC<MenuContentProps> = ({ selectedComponent }) => {

    const renderComponent = () => {
        switch (selectedComponent) {
            case "home":
                return <MainMenu/>;
            case "ai":
                return <Menu />;
            case "Matching":
                return <Basic />;
            case "Chatting":
                return <Chatting />;
            case "Place":
                return null;
            case "Profile":
                return <MyPage />;
            default:
                return <MainMenu />;
        }
    };

    return (
        <Background>
            {renderComponent()}
        </Background>
    );
};

const Background = styled.div`
    width: 390px;
    height: 100%;
    background-color: #ffffff;
    background-image: url("../Menu_Picture/waiting.png"); /* 이미지 경로를 지정하세요 */
    background-size: contain; /* 이미지를 컨테이너에 맞게 조절 */
    background-position: center; /* 이미지를 중앙에 위치시킵니다 */
    background-repeat: no-repeat;
    
`;



export default MenuContent;
