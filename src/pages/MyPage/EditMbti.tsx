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
        <Save><button onClick={handleSaveClick}><SaveImage><img src="/MyPage_Image/save.png"/></SaveImage></button></Save>
      ) : (
        <button onClick={handleEditClick}><EditImage><img src="/MyPage_Image/edit.png"/></EditImage></button>
      )}
    </div>
  );
}

const Save = styled.div`
  margin-top: 1px;
`;

const SaveImage = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  background-color: white;
`;

const EditImage = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  background-color: white;
`;

export default EditMbti;
