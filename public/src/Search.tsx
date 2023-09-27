import MainMenu from "@/pages/Home/MainMenu";
import React from "react";
import styled from "styled-components";

const Search = () => {
    return(
        <SearchContainer>
            <IconContainer>
                <SearchButton src="../Menu_Picture/search.png" alt="logo" />
                <p>장소검색</p>
            </IconContainer>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 330px;
    height: 44px;
    border: 2.5px solid #0160D6;
    border-radius: 6px 6px 6px 6px;
    background-color: #ffffff;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    width: 120px;
    height: 24px;
    margin-left: 10px;
    p {
        margin-left: 10px;
        color: #9F9F9F; 
        font-size: 20px;
    }
`;

const SearchButton = styled.img`
    width: 24px;
    height: 24px;
`;



export default Search;
