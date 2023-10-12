import React from "react";
import styled from "styled-components";

const Use = () => {
    return(
        <History>
          <UseHistory>이용 기록</UseHistory>
          <Button><a>이전 코스 내역</a></Button>
          <Button><a>내가 작성한 리뷰</a></Button>
        </History>
    )
}

const History = styled.div`
  width: 100%;
  margin-top: 35px;
`;

const UseHistory = styled.div`
  width: 100%;
  margin-left: 25px;
  font-size: 26px;
  font-weight: bold; 
`;

const Button = styled.div`
  width: 360px;
  height: 40px;
  margin: 10px auto;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: normal; 
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #0160D6;
  border-radius: 10px;
`;

export default Use;