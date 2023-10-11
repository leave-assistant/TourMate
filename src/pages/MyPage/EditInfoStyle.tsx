import React, { useState } from 'react';
import styled from "styled-components";

function EditInfoStyle() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('소개글을 입력해주세요');

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
        <input type="text" value={text} onChange={handleTextChange} />
      ) : (
        <p>{text}</p>
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

export default EditInfoStyle;
