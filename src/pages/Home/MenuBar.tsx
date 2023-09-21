import React from "react";
import styled from "styled-components";

// onClick 프로퍼티에 대한 타입을 명시적으로 지정
interface MenuBarProps {
    onClick: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onClick }) => {
    return (
        <MenuContainer onClick={onClick}>
            <h1>메뉴</h1>
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    width: 70px;
    height: 100%;
    background-color: pink;
`;



export default MenuBar;
