import React, { useState } from 'react';
import styled from "styled-components";
import Review from './Review';
import Course from './Course';

function Use() {
  return (
    <div>
      <History>
        <UseHistory>이용 기록</UseHistory>
        <Course />
        <Review />
      </History>
    </div>
  );
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

export default Use;