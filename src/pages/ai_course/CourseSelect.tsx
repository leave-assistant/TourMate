import React from 'react';
import styled from 'styled-components';

interface CourseSelectProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseSelect: React.FC<CourseSelectProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div>
          oo님을 위한 활동을 선택해주세요.
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseSelect;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 480px;
  height: 680px; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;