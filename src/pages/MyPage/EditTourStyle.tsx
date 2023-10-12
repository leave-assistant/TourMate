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

export default EditTourStyle;
