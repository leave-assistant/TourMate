import React, { useState } from 'react';
import styled from "styled-components";
import MemberEdit from './MemberEdit';

function Edit() {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="Edit">
      {editing ? (
        <MemberEdit />
      ) : (
        <button onClick={toggleEditing}><EditImage><img src="/MyPage_Image/edit.png"/></EditImage></button>
      )}
    </div>
  );
}

const EditImage = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  background-color: white;
`;

export default Edit;
