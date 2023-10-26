import React from 'react';
import styled from 'styled-components';

const Top = () => {
  return (
  <>
       <SearchContainer>
          <SearchInputContainer>
            <SearchIconImage src="/Ai_Image/Search icon.png" alt="Search Icon" />
            <SearchInput type="text" placeholder="장소 검색" />
          </SearchInputContainer>
        </SearchContainer>

        
        </>
  );
}

export default Top;

const Box1 = styled.div`
width: 390px;
height: 160px;
background-color: white;
margin-left: 20px;
  
`;
const h1= styled.p`

font-size: 28px;
margin-bottom: 20px;


`

;
const Input = styled.input`
margin-top: 50px;
border: 1px solid #0160D6; 
height:50px;
width: 332px;
border-radius: 10px;
margin:30px auto;

    
`;
const SearchIconImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
`;


const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #0160D6;
  border-radius: 5px;
`;
const SearchInput = styled.input`
  width: 340px;
  height: 40px;
  padding: 5px;
  outline: none;
`;

