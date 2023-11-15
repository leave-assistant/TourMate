import React from 'react';
import styled from 'styled-components';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ visible, onClose, children }) => {
  return (
    <PopupContainer visible={visible}>
      <CloseButton onClick={onClose}><Image><img src="/MyPage_Image/close.png" /></Image></CloseButton>
      {children}
    </PopupContainer>
  );
};

const PopupContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ visible }) => (visible ? '1' : '-100%')};
  width: 390px;
  height: 100%;
  background-color: #ffffff;
  z-index: 100;
  overflow: auto;
  &::-webkit-scrollbar { width: 12px; }
  &::-webkit-scrollbar-thumb {
    background-color: #0160D6; 
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track { background-color: #f1f1f1; }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: #ffffff;
`;

const Image = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  margin-top: 3px;
`;

export default Popup;
