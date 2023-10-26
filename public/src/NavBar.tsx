import React from "react";
import styled from "styled-component";

const MenuBar: React.FC<{ onSelectComponent: (component: string) => void }> = ({ onSelectComponent }) => {
    return (
        <MenuContainer>
            <LogoContainer onClick={() => onSelectComponent("home")}>
                <LogoButton src="../Menu_Picture/logo.png" alt="logo" />
            </LogoContainer>

            <NavContainer>
                <HomeContainer onClick={() => onSelectComponent("home")}>
                    <ImageButton src="../Menu_Picture/home.png" alt="logo" />
                    <p>홈</p>
                </HomeContainer>

                <AiContainer onClick={() => onSelectComponent("ai")}>
                    <ImageButton src="../Menu_Picture/ai.png" alt="logo" />
                    <p>AI 코스</p>
                </AiContainer>

                <MatchingContainer onClick={() => onSelectComponent("Matching")}>
                    <ImageButton src="../Menu_Picture/match.png" alt="logo" />
                    <p>매칭</p>
                </MatchingContainer>

                <ChattingContainer onClick={() => onSelectComponent("Chatting")}>
                    <ImageButton src="../Menu_Picture/chat.png" alt="logo" />
                    <p>채칭</p>
                </ChattingContainer>

                <PlaceContainer onClick={() => onSelectComponent("Place")}>
                    <ImageButton src="../Menu_Picture/place.png" alt="logo" />
                    <p>장소</p>
                </PlaceContainer>
            </NavContainer>
            
            <Profile onClick={() => onSelectComponent("Profile")}>
                <ImageButton src="../MyPage_Image/people.png" alt="logo" />
                <p>프로필</p>
            </Profile>
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 62px;
    height: 100%;
    background-color: #ffffff;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 62px;
    height: 100px;
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 62px;
    height: 380px;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 62px;
    height: 57.5px;
`;

const AiContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 62px;
    height: 57.5px;
`;

const MatchingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 62px;
    height: 57.5px;
`;

const ChattingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 62px;
    height: 57.5px;
`;

const PlaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 62px;
    height: 57.5px;
`;

const LogoButton = styled.img`
    width: 38px;
    height: 38px;
    margin: auto;
`;

const ImageButton = styled.img`
    width: 34px;
    height: 34px;
    margin: 0px auto 4px auto;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 62px;
    height: 80px;
    margin-top: auto;
`
export default MenuBar;
