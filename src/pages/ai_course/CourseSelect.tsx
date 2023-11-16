import { useState} from 'react';
import React from 'react';
import styled from 'styled-components';

interface CourseSelectProps {
  isOpen: boolean;
  onClose: () => void;
}

//객체 타입 정의
interface ImageStates {
  rice: boolean;
  meat: boolean;
  ramen: boolean;
  hamburger: boolean;
  coffee: boolean;
  greentea: boolean;
  soju: boolean;
  cocktail: boolean;
  history: boolean;
  museum: boolean;
  beach: boolean;
  trekking: boolean;
}

const CourseSelect: React.FC<CourseSelectProps> = ({ isOpen, onClose }) => {

  const [imageStates, setImageStates] = useState<ImageStates>({
    rice: true,
    meat: true,
    ramen: true,
    hamburger: true,
    coffee: true,
    greentea: true,
    soju: true,
    cocktail: true,
    history: true,
    museum: true,
    beach: true,
    trekking: true,
  });

  const handleImageClick = (imageName: keyof ImageStates) => {
    // 클릭한 이미지만 투명도를 변경
    setImageStates(prevStates => ({
      ...prevStates,
      [imageName]: !prevStates[imageName],
    }));
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SearchContainer>
          <SearchInputContainer>
            <SearchIconImage src="/Ai_Image/Search icon.png" alt="Search Icon" />
            <SearchInput type="text" placeholder="취향 검색" />
          </SearchInputContainer>
        </SearchContainer>
        <div style={{ marginLeft: "30px", fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>OO 님을 위한 활동을 선택해주세요</div>

        {/*음식 유형 선택 */}
        <div style={{ marginLeft: "30px", fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>음식</div>
        <ImageContainer>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/rice.png"
              alt="rice"
              style={{
                filter: imageStates.rice ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('rice')}
            />
            <ImageName>한식</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/meat.png"
              alt="meat"
              style={{
                filter: imageStates.meat ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('meat')}
            />
            <ImageName>고기</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/ramen.png"
              alt="ramen"
              style={{
                filter: imageStates.ramen ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('ramen')}
            />
            <ImageName>면류</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/hamburger.png"
              alt="hamburger"
              style={{
                filter: imageStates.hamburger ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('hamburger')}
            />
            <ImageName>양식</ImageName>
          </ImageWrapper>
        </ImageContainer>
        
        {/*음료 유형 선택 */}
        <div style={{ marginLeft: "30px", fontSize: "20px", fontWeight: "bold", marginBottom: "10px", marginTop:"20px" }}>음료</div> 
        <ImageContainer>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/coffee.png"
              alt="coffee"
              style={{
                filter: imageStates.coffee ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('coffee')}
            />
            <ImageName>커피</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/greentea.png"
              alt="greentea"
              style={{
                filter: imageStates.greentea ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('greentea')}
            />
            <ImageName>차/음료</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/soju.png"
              alt="soju"
              style={{
                filter: imageStates.soju ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('soju')}
            />
            <ImageName>술</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/cocktail.png"
              alt="cocktail"
              style={{
                filter: imageStates.cocktail ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('cocktail')}
            />
            <ImageName>칵테일</ImageName>
          </ImageWrapper>
        </ImageContainer>

        {/*놀거리 유형 선택 */}
        <div style={{ marginLeft: "30px", fontSize: "20px", fontWeight: "bold", marginBottom: "10px", marginTop:"20px" }}>놀거리</div>
        <ImageContainer>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/history.png"
              alt="history"
              style={{
                filter: imageStates.history ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('history')}
            />
            <ImageName>관광명소</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/museum.png"
              alt="museum"
              style={{
                filter: imageStates.museum ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('museum')}
            />
            <ImageName>관람</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/beach.png"
              alt="beach"
              style={{
                filter: imageStates.beach ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('beach')}
            />
            <ImageName>휴양지</ImageName>
          </ImageWrapper>
          <ImageWrapper>
            <ClickableImage
              className="Clickable-Image"
              src="/Ai_Image/trekking.png"
              alt="trekking"
              style={{
                filter: imageStates.trekking ? 'blur(1px)' : 'none',
                width: "50px",
                height: "50px"
              }}
              onClick={() => handleImageClick('trekking')}
            />
            <ImageName>하이킹/등산</ImageName>
          </ImageWrapper>
        </ImageContainer>
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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #0160D6;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  width: 340px;
  height: 40px;
  padding: 5px;
  outline: none;
`;

const SearchIconImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

// 이미지 스타일 및 컨테이너
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ClickableImage = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 40px;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;
  border: 1px solid #0160D6;
  border-radius: 50%;
  padding: 5px;
`;

const ImageName = styled.div`
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 40px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;