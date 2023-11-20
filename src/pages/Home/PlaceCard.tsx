import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from "@/pages/SearchContext";

interface Place {
    place_name: string,
    road_address_name: string,
    x: number,
    y: number,
}

const PlaceCard = (props: any) => {
    const { searchResult } = useSearch();
    console.log("값 받아오기",searchResult);
    const popularPlace = [
        {place_name: "안양역", road_address_name: "경기 안양시 만안구 만안로 232", x: "126.922643794145", y: "37.4018568034268" }
        ,{place_name: "롯데시네마 안양", road_address_name: "경기 안양시 만안구 만안로 244", x: "126.922300592287", y: "37.4017196232175"}
        ,{place_name: "엔터식스 안양역점", road_address_name: "경기 안양시 만안구 만안로 232", x: "126.923001121893", y: "37.4014353588592"}
    ];

    // useEffect(() => {
    //     console.log("값 받아오기",searchResult);
    // }, [searchResult])

  return (
    <CardContainer>

        <ImageContainer>
            <Image src="../Menu_Picture/Rectangle 10.png" alt="placePicture" />
        </ImageContainer>

        <TextContainer>
            <TitleContainer>
                <PlaceName>place_name</PlaceName>
                <RoadAddress>road_address_name</RoadAddress>
            </TitleContainer>

            <ReviewContainer>
                <Review>리뷰</Review>
                <Score>점수</Score>
            </ReviewContainer>
        </TextContainer>

    </CardContainer>
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

const PlaceName = styled.div`
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

const Review = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const Score = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

export default PlaceCard;
