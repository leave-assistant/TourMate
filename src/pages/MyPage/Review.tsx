import React from "react";
import styled from "styled-components";

const Course = () => {
  return (
      <MyPageContent>
        <a href="./MyPage"><Back><img src="/MyPage_Image/back.png"/></Back></a>
        <Title>내가 작성한 리뷰</Title>
        <Outline>
          <ReviewTitle>2000 - 00 - 00 XX코스</ReviewTitle>
          <ReviewArea>지역 : 안양&nbsp;&nbsp;&nbsp;★★★★★</ReviewArea>
          <ReviewDetail>
            너무 좋았고 너무 완벽하고 펄펙함 
          </ReviewDetail>
        </Outline>
        <Outline>
          <ReviewTitle>2000 - 00 - 00 XX코스</ReviewTitle>
          <ReviewArea>지역 : 안양&nbsp;&nbsp;&nbsp;★★★★★</ReviewArea>
          <ReviewDetail>
            너무 좋았고 너무 완벽하고 펄펙함 
          </ReviewDetail>
        </Outline>
        <Outline>
          <ReviewTitle>2000 - 00 - 00 XX코스</ReviewTitle>
          <ReviewArea>지역 : 안양&nbsp;&nbsp;&nbsp;★★★★★</ReviewArea>
          <ReviewDetail>
            너무 좋았고 너무 완벽하고 펄펙함 
          </ReviewDetail>
        </Outline>
        <Outline>
          <ReviewTitle>2000 - 00 - 00 XX코스</ReviewTitle>
          <ReviewArea>지역 : 안양&nbsp;&nbsp;&nbsp;★★★★★</ReviewArea>
          <ReviewDetail>
            너무 좋았고 너무 완벽하고 펄펙함 
          </ReviewDetail>
        </Outline>
        <Outline>
          <ReviewTitle>2000 - 00 - 00 XX코스</ReviewTitle>
          <ReviewArea>지역 : 안양&nbsp;&nbsp;&nbsp;★★★★★</ReviewArea>
          <ReviewDetail>
            너무 좋았고 너무 완벽하고 펄펙함 
          </ReviewDetail>
        </Outline>
      </MyPageContent>
  );
};

const MyPageContent = styled.div`
  width: 390px;
  height: 100%;
  padding: 1px;
  background-color: #ffffff;
`;

const Back = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  margin: 20px;
  float: left;
`;

const Title = styled.div`
  width: 350px;
  height: 50px;
  margin: 15px auto;
  font-size: 28px;
  font-weight: bold; 
  border-bottom: 1px solid #0160D6;
`;

const Outline = styled.div`
  width: 360px;
  height: 120px;
  padding: 10px;
  margin: 20px auto;
  background-color: #ffffff;
  border: 1px solid #0160D6;
  border-radius: 10px;
`;

const ReviewTitle = styled.div`
  font-size: 20px;
  font-weight: bold; 
  text-align: center;
`;

const ReviewArea = styled.div`
  margin-top: 1px;
  font-size: 13px;
  font-weight: normal; 
  text-align: center;
  color: #D3D3D3;
`;

const ReviewDetail = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: normal; 
  text-align: center;
`;

export default Course;