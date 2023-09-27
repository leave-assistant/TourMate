import MainMenu from "@/pages/Home/MainMenu";
import React from "react";
import styled from "styled-components";

const MenuContent = () => {
    return(
        <Background>
            <MainMenu/>
        </Background>
    );
};

const Background = styled.div`
    width: 390px;
    height: 100%;
    background-color: skyblue;
`;



export default MenuContent;
