import React, { useState } from 'react';
import styled from "styled-components";

function EditText() {
  const [isEditing, setIsEditing] = useState(false);
  const [texts, setTexts] = useState({
    TourStyle: '여행스타일을 입력해주세요',
    Mbti: 'MBTI를 입력해주세요',
    Info: '소개글을 입력해주세요',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleTextChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setTexts({
      ...texts,
      [field]: e.target.value,
    });
  };

  return (
    <div>
      {isEditing ? (
        <SaveButton><Save type="button" onClick={handleSaveClick}><SaveImage><img src="/MyPage_Image/save.png"/></SaveImage></Save></SaveButton>
      ) : (
        <Edit type="button" onClick={handleEditClick}><EditImage><img src="/MyPage_Image/edit.png"/></EditImage></Edit>
      )}
      {isEditing ? (
        <div>
          <Question>여행스타일</Question> 
          <EditAnswer><input type="text" value={texts.TourStyle} onChange={(e) => handleTextChange('TourStyle', e)} /></EditAnswer>
          <Question>MBTI</Question>
          <EditAnswer><input type="text" value={texts.Mbti} onChange={(e) => handleTextChange('Mbti', e)} /></EditAnswer>
          <Question>소개글</Question>
          <EditAnswer><input type="text" value={texts.Info} onChange={(e) => handleTextChange('Info', e)} /></EditAnswer>
        </div>
      ) : (
        <div>
          <Question>여행스타일</Question> 
          <SaveAnswer><p>{texts.TourStyle}</p></SaveAnswer>
          <Question>MBTI</Question>
          <SaveAnswer><p>{texts.Mbti}</p></SaveAnswer>
          <Question>소개글</Question>
          <SaveAnswer><p>{texts.Info}</p></SaveAnswer>
        </div>
      )}
    </div>
  );
}

const SaveButton = styled.div`
  float: right;
`;

const Save = styled.button`
  border:none;
`;

const SaveImage = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  background-color: white;
`;

const Edit = styled.button`
  float: right;
  border:none;
`;

const EditImage = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  background-color: white;
`;

const Question = styled.div`
  width: 100%;
  margin: 25px 0px 0px 0px;
  font-size: 24px;
  font-weight: bold; 
  color: #000000;
`;

const EditAnswer = styled.button`
  margin-top: 5px;
  border: none;
`;

const SaveAnswer = styled.div`
  margin: 5px 0px 0px 10px;
  font-size: 18px;
  font-weight: normal; 
`;

export default EditText;
