import React from 'react';
import styled from 'styled-components';
const SearchLocation=()=>{
    return(
       <Box2>
        지역검색 
        <hr/>
        <Search> 강원 제주 경상 전라-충청 경기</Search> 
        <hr/>
       </Box2>
    );
}
export default SearchLocation;
const Box2 = styled.div`
width : 390px;
height : 100px;
background-color :white;
font-size : 28px;
font-weight : bold;
hr{
    width:370px;
    margin:5px;
}
`
const Search = styled.p`
 
  height: 10px;
  text-align: center; 
  word-spacing: 10px;
   padding: 0 20px;
   margin-: 20px;
   margin-bottom: 20px;
   font-size: 20px;
   font-weight:normal;
`;
