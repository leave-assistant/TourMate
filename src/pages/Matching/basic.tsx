import React from "react";
import styled from "styled-components";
import ConnectPeople from "./ConnectionPeople";
import Top from "./Top";
import SearchLocation from "./SearchLocation";
const Basic = () => {
    return (
        <Page>
            <MenuExtend>
                <Top/>
                <SearchLocation/>
                
                <TextTourMate>
                    투어메이트<hr/>
                </TextTourMate>
                <ConnectPeople/>

               

            </MenuExtend>
        </Page>
    );
}


const Page = styled.div`
    display : flex;
    width : 1920px;
    height : 1080px;
    position : relative;
  background-color : white;
    
`;
const MenuExtend = styled.div`
    width : 390px;
    height : 1080px;
    background-color :white;

`;

const TextTourMate=styled.div`
    width : 390px;
    height : 50px;
    background-color :white;
    margin-top : 20px;
    font-size : 28px;
    font-weight : bold;
`;


export default Basic;