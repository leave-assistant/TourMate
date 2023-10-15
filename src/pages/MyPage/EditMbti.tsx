import React, { useState } from 'react';
import styled from "styled-components";

function EditMbti() {
  const [isEditing, setIsEditing] = useState(false);
  const [Mbti, setText] = useState('MBTI를 입력해주세요');

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <input type="text" value={Mbti} onChange={handleTextChange} />
      ) : (
        <p>{Mbti}</p>
      )}
      {isEditing ? (
        <SaveButton><Save type="button" onClick={handleSaveClick}><SaveImage><img src="/MyPage_Image/save.png"/></SaveImage></Save></SaveButton>
      ) : (
        <Edit type="button" onClick={handleEditClick}><EditImage><img src="/MyPage_Image/edit.png"/></EditImage></Edit>
      )}
    </div>
  );
}

const SaveButton = styled.div`
  margin: 1px;
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
  margin: 1px;
  border:none;
`;

const EditImage = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  background-color: white;
`;

export default EditMbti;
