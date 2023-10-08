import React, { useState } from 'react';
import styled from "styled-components";

interface MemberInfo {
  tourstyle: string;
  mbti: string;
  info: string;
}

const MemberEdit: React.FC = () => {
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    tourstyle: '',
    mbti: '',
    info: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log('수정된 정보:', memberInfo);
  };

  return (
    <Edit>
      <div>
      <h1>정보 수정</h1>
      <form>
        <div>
          <TourStyleQuestion><label>여행스타일</label></TourStyleQuestion>
          <TourStyle><input
            type="text"
            name="tourstyle"
            value={memberInfo.tourstyle}
            onChange={handleInputChange}
          /></TourStyle>
        </div>
        <div>
          <MbtiQuestion><label>MBTI </label></MbtiQuestion>
          <Mbti><input
            type="text"
            name="mbti"
            value={memberInfo.mbti}
            onChange={handleInputChange}
          /></Mbti>
        </div>
        <div>
          <InfoQuestion><label>소개글 </label></InfoQuestion>
          <Info><input
            type="text"
            name="info"
            value={memberInfo.info}
            onChange={handleInputChange}
          /></Info>
        </div>
      </form>
      <Button><button onClick={handleSave}>저장</button></Button>
    </div>
    </Edit>
    
  );
};

const Edit = styled.div`
  margin-left: 20px;
`;

const TourStyleQuestion = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const TourStyle = styled.div`
  font-size: 18px;
`;

const MbtiQuestion = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const Mbti = styled.div`
  font-size: 18px;
`;
const InfoQuestion = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const Info = styled.div`
  font-size: 18px;
`;

const Button = styled.div`
  margin-top: 10px;
`;

export default MemberEdit;
