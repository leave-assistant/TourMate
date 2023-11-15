import React, { useState } from 'react';
import styled from "styled-components";
import { useUser } from './UserContext';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

function EditText() {
  const user = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [texts, setTexts] = useState({
    TourStyle: user?.TourStyle,
    Mbti: user?.Mbti,
    Info: user?.Info,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    

    if (user?.uid) {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);

        const updatedData = {
          Mbti: texts.Mbti,
          TourStyle: texts.TourStyle,
          Info: texts.Info,
        };

        await updateDoc(userDocRef, updatedData);
        console.log('MBTI 업데이트 성공');
        alert('MBTI 업데이트 성공');
      } catch (error) {
        console.error('MBTI 업데이트 오류:', error);
        alert('MBTI 업데이트 오류');
      }
    } else {
      alert('UID 또는 MBTI 값이 없습니다.');
    }

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
