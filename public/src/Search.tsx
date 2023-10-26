import MainMenu from "@/pages/Home/MainMenu";
import React from "react";
import styled from "styled-components";

const Search = () => {
    return(
        <SearchContainer>
            <IconContainer>
                <SearchButton src="../Menu_Picture/search.png" alt="logo" />
                <input type="text" placeholder="장소 검색" />
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
    height: 24px;
    margin-left: 10px;
    input {
        margin-left: 10px;
        height: 35px;
        width: 280px;
        font-size: 20px;
        border: none;
        outline: none;
    }
`;

const SearchButton = styled.img`
    width: 24px;
    height: 24px;
`;



export default Search;
