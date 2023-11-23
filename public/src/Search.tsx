import { useSearch } from "@/pages/SearchContext";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Search: React.FC = () => {
    // input요소 입력값 업데이트 객체
    const [inputValue, setInputValue] = useState<string>("");
    const { searchValue, setSearchValue } = useSearch();

    // input요소 입력값 업데이트 함수
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // 입력값 저장 함수
    const handleSearchButtonClick = () => {
        setSearchValue(inputValue);
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchButtonClick();
        }
    };

    return (
        <SearchContainer>
            <IconContainer>
                <SearchButton
                    src="../Menu_Picture/search.png"
                    alt="로고"
                    onClick={handleSearchButtonClick}
                />
                <input
                    type="text"
                    placeholder="장소 검색"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
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
