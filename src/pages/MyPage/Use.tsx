import React, { useState } from 'react';
import styled from "styled-components";
import Course from './Course';

function Use() {
  return (
    <div>
      <History>
        <UseHistory>이용 기록</UseHistory>
        <Course />
      </History>
    </div>
  );
}

const History = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const UseHistory = styled.div`
  width: 100%;
  margin-left: 25px;
  font-size: 26px;
  font-weight: bold; 
`;

export default Use;