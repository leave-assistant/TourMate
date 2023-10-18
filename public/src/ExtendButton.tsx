import React, { useState } from "react";
import styled from "styled-components";

// onClick 프로퍼티에 대한 타입을 명시적으로 지정
interface ExtendButtonProps {
    onClick: () => void;
}

const ExtendButton: React.FC<ExtendButtonProps> = ({ onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleExtend = () => {
        setIsOpen(!isOpen);
        onClick(); // 원래의 onClick 핸들러 호출
    };

    return (
        <ExtendContainer>
            <Extend onClick={toggleExtend}>
                <b>{isOpen ? ">" : "<"}</b>
            </Extend>
        </ExtendContainer>
        
    );
};

const ExtendContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 100%;
`;

const Extend = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 45px;
    border: 0.2px solid gray;
    border-radius: 0 5px 5px 0;
    background-color: #ffffff;
    p {
        color: gray;
    }
`;



export default ExtendButton;
