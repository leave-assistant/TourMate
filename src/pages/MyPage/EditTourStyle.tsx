import React, { useState } from 'react';
import styled from "styled-components";

function EditTourStyle() {
  const [isEditing, setIsEditing] = useState(false);
  const [TourStyle, setText] = useState('여행스타일을 입력해주세요');

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
        <input type="text" value={TourStyle} onChange={handleTextChange} />
      ) : (
        <p>{TourStyle}</p>
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

export default EditTourStyle;
