import React from "react";
import styled from "styled-components";

const MenuContent = () => {
    return(
        <Background>
            <h1>컨텐츠</h1>
        </Background>
    );
};

const Background = styled.div`
    width: 440px;
    height: 100%;
    background-color: skyblue;
`;



export default MenuContent;
