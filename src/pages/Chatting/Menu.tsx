import React from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";

import ChattingRoom from "./ChattingRoom";
import { useState, useEffect } from "react"

const Menu = () => {
  
    return (
        <Page>
            <MenuExtend>
                <ChattingBox>
                    <ChattingTitle>
                        채팅
                    </ChattingTitle>
                </ChattingBox>
                <UserProfile/>
                <UserProfile/>
                <UserProfile/>
                <UserProfile/>
                <UserProfile/>
            </MenuExtend>
            
        </Page>
    );
}

const Page = styled.div`
    display : flex;
    width : 1920px;
    height : 1080px;
    position : relative;
    margin : 0;
    background-color : white;
`;
const MenuExtend = styled.div`
    width : 390px;
    height : 1080px;
    background-color :white;
    border-left: 0.5px solid black;

`;
const ChattingTitle = styled.p`
    margin-left : 21px;
    font-size : 21px;
    font-weight : bold;
`;
const ChattingBox = styled.div`
    width : 100%;
    height : 70px;
    background-color:white;
    padding-top: 21px;
    margin-bottom : 10px;
    border-bottom : 1px solid black;
`;
 


export default Menu;