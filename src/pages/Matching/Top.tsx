import React from 'react';
import styled from 'styled-components';

const Top = () => {
  return (
    <Box1>
        <h1>매칭</h1>
        <Input type="text" id="search" name="search" placeholder='&#128269;장소검색' />
        
    </Box1>
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
= 
    
`;

