import { useState } from 'react';
import styled from "styled-components";
import CourseSelect from './CourseSelect';

const Menu = () => {
    //이미지 클릭이벤트 (흐려짐)
    const [imageStates, setImageStates] = useState<{
        [key: string]: boolean;}>
        ({car: true,bus: true,metro: true,train: true,});

        const [courseBoxes, setCourseBoxes] = useState<number>(1); // 초기 CourseBox 개수
        const [courseAddBoxHeight, setCourseAddBoxHeight] = useState<number>(206); // 초기 CourseAddBox 높이
    
        const handleImageClick = (imageName: string) => {
            setImageStates({
                ...imageStates,
                [imageName]: !imageStates[imageName],
            });
        };
    
        const handleAddCourse = () => {
            setCourseBoxes(courseBoxes + 1);
            setCourseAddBoxHeight(courseAddBoxHeight + 50); // 클릭이벤트시 50px씩 높이 증가
        };

        const [isModalOpen, setIsModalOpen] = useState(false);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

  return (    
    <MenuExtend>
        <TitleBox>
            <div style={{marginLeft : "20px", fontSize : "28px", fontWeight : "bold"}}>AI 코스</div>
        </TitleBox>
        <div style={{marginLeft : "5px", fontSize : "22px", fontWeight : "bold"}}>코스의 계획을 선택해주세요</div>
        <CourseBox>
            <CourseNumber>1</CourseNumber>
                <CourseContent>
                    <Question>몇일 떠나실 예정이신가요?</Question>
                    <InputField type="text" placeholder="입력하세요" />
                </CourseContent>
        </CourseBox>
        <CourseBox>
            <CourseNumber>2</CourseNumber>
                <CourseContent>
                    <Question>어디에 묵으실 예정이신가요?</Question>
                    <InputField type="text" placeholder="입력하세요" />
                </CourseContent>
        </CourseBox>
        <CourseBox>
            <CourseNumber>3</CourseNumber>
                <CourseContent>
                    <Question>어떤 이동수단을 이용하실 예정이신가요?</Question>
                    <ImageContainer>
                        <ClickableImage
                        className="Clickable-Image"
                        src="/Ai_Image/Car.png"
                        alt="Car"
                        style={{ filter: imageStates.car ? 'blur(1px)' : 'none' , marginLeft : "30px", width : "40px", height : "40px"}}
                        onClick={() => handleImageClick('car')}
                        />
                        <ClickableImage
                        className="Clickable-Image"
                        src="/Ai_Image/bus.png"
                        alt="Bus"
                        style={{ filter: imageStates.bus ? 'blur(1px)' : 'none', marginLeft : "30px" , width : "40px", height : "40px"}}
                        onClick={() => handleImageClick('bus')}
                        />
                        <ClickableImage
                        className="Clickable-Image"
                        src="/Ai_Image/train-station.png"
                        alt="Metro"
                        style={{ filter: imageStates.metro ? 'blur(1px)' : 'none' , marginLeft : "30px" , width : "40px", height : "40px"}}
                        onClick={() => handleImageClick('metro')}
                        />
                        <ClickableImage
                        className="Clickable-Image"
                        src="/Ai_Image/Train.png"
                        alt="Train"
                        style={{ filter: imageStates.train ? 'blur(1px)' : 'none' , marginLeft : "30px" , width : "40px", height : "40px"}}
                        onClick={() => handleImageClick('train')}
                        />
                    </ImageContainer>
                    <NameContainer>
                        <ImageName>자가용</ImageName>
                        <ImageName>버스</ImageName>
                        <ImageName>지하철</ImageName>
                        <ImageName>기차</ImageName>
                    </NameContainer>
                </CourseContent>
        </CourseBox>
            <CourseAddBox style={{ height: `${courseAddBoxHeight}px` }}>
                <CourseNumber>4</CourseNumber>
                <CourseContent>
                    <Question>예정된 장소를 알려주세요.</Question>
                    {Array.from({ length: courseBoxes }).map((_, index) => (
                        <InputField
                            key={index}
                            type="text"
                            placeholder="입력하세요"
                        />
                    ))}
                    <AddCourseButton onClick={handleAddCourse}>+ 코스 추가</AddCourseButton>
                </CourseContent>
            </CourseAddBox>

            <OpenModalButton onClick={openModal}>활동 선택하기</OpenModalButton>

            <CourseSelect isOpen={isModalOpen} onClose={closeModal} />
    </MenuExtend>
  );
};

export default Menu;

const MenuExtend = styled.div`
    width : 390px;
    height : 1080px;
    background-color: white;
    border-left: 0.5px solid black;
    overflow-y: auto; 
`;


const TitleBox = styled.div`
    width : 100%;
    height : 70px;
    background-color:white;
    padding-top: 21px;
    margin-bottom : 10px;
    border-bottom : 1px solid black;
`;

const CourseBox = styled.div`
    width: 380px;
    height: 100px;
    display: flex;
    margin-left: 5px;
    margin-top: 10px;
    border-radius: 20px;
    border: 1px solid #000;
    background: rgba(1, 96, 214, 0.04);
`;

const CourseAddBox = styled.div`
    width: 380px;
    height: 206px;
    display: flex;
    margin-left: 5px;
    margin-top: 10px;
    border-radius: 20px;
    border: 1px solid #000;
    background: rgba(1, 96, 214, 0.04);
`;

const CourseContent = styled.div`
    display: flex;
    padding: 10px;
    flex-direction: column;
`;

const CourseNumber = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    margin-top: 30px;
    margin-left: 20px;
`;


const InputField = styled.input`
    width: 290px;
    height: 37px;
    border: none;
    outline: none;
    padding: 5px;
    margin-top: 5px;
    margin-left: 10px;  
    border-radius: 10px;
    background-color: #E5E5E5;;
`;

const Question = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 5px;
    margin-left: 10px;  
`;

const AddCourseButton = styled.button`
    width: 290px;
    height: 50px;
    font-family: Inter;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
    padding: 5px;
    margin-top: 70px;
    margin-left: 10px;
    border-radius: 10px;
    background: none;
    cursor: pointer;
    transition: filter 0.3s ease-in-out;
    &:hover {
        filter: brightness(0.9);
    }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ClickableImage = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const ImageName = styled.div`
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    margin-top: 3px;
    margin-left: 35px;
`;

const OpenModalButton = styled.button`
  width: 300px; 
  height: 40px; 
  background-color: #007bff; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 40px;
`;