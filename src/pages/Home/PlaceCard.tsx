import React from 'react';
import styled from 'styled-components';

const PlaceCard = () => {
  return (
    <CardContainer>

        <ImageContainer>
            <Image src="data:image/png;base64,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" alt="이미지 설명" />
        </ImageContainer>

        <TextContainer>
            <TitleContainer>
                <Title>홍지관</Title>
                <Subtitle>대림대학교</Subtitle>
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

const Title = styled.div`
    font-size: 28px;
    font-weight: bold;
    margin-right: 5px;
`;

const Subtitle = styled.div`
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
