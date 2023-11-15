import React from "react";
import styled from "styled-components";
import { useSearchContext } from "@/pages/SearchContext";

const Search = () => {
    const { inputValue, setInputValue } = useSearchContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    // 필요한 경우 추가 작업 수행
    // 아마도 검색을 시작하거나 WriteMapPage에서 상태를 업데이트할 수 있을 것입니다
  };
    return(
        <SearchContainer>
            <IconContainer>
                <SearchButton
                    src="../Menu_Picture/search.png"
                    alt="로고"
                    onClick={handleSearchClick}
                />
                    <input
                    type="text"
                    placeholder="장소 검색"
                    value={inputValue}
                    onChange={handleInputChange}
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
