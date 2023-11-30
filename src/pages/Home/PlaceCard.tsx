import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from "@/pages/SearchContext";

const PlaceCard: React.FC = () => {
    const { searchResult } = useSearch();
    console.log("값 받아오기", searchResult);

    const {coordinates, setCoordinates} = useSearch();
    console.log("좌표 확인", coordinates)

    const handlePlaceNameClick = (place_name: string, x: number, y: number) => {
        setCoordinates([...coordinates, { place_name, x, y }]);
        alert(`${place_name}(이)가 코스가 추가되었습니다.`);
    };

    return (
        <>
            {searchResult.map((result, index) => (
                <CardContainer key={index}>
                    <ImageContainer>
                        <Image src="../Menu_Picture/Rectangle 10.png" alt="placePicture" />
                    </ImageContainer>

                    <TextContainer>
                        <TitleContainer>
                            <PlaceName>{result.place_name}</PlaceName>
                            <CourseAdd onClick={() => handlePlaceNameClick(result.place_name, result.x, result.y)}>장소 추가</CourseAdd>
                        </TitleContainer>

                        <ReviewContainer>
                            {/* <Review>리뷰</Review>
                            <Score>점수</Score> */}
                            <RoadAddress>{result.road_address_name}</RoadAddress>
                        </ReviewContainer>
                    </TextContainer>
                </CardContainer>
            ))}
        </>
    );
};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 390px;
    height: 260px;
    background-color: #ffffff;
    margin-bottom: 20px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 260px;
`;

const Image = styled.img`
    width: 330px;
    height: 185px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 390px;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 330px;
`;

const CourseAdd = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0160D6;
    color: white;
    border-radius: 8px;
    width: 70px;
    height: 30px;
    margin-left: 4px;
    cursor: pointer;
`;

const PlaceName = styled.div`
    width: 256px;
    font-size: 28px;
    font-weight: bold;
    margin-right: 5px;
`;

const RoadAddress = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #828282;
    margin-bottom: 3px;
`;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 330px;
    margin-top: 8px;
`;

// const Review = styled.div`
//     font-size: 16px;
//     font-weight: bold;
// `;

// const Score = styled.div`
//     font-size: 16px;
//     font-weight: bold;
// `;

export default PlaceCard;
