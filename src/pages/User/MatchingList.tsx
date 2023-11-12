import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import router, { useRouter } from 'next/router';
import { useUser } from './UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebase';

interface TripData{
    id?: string;
    uid?: string;
    tripTitle?: string;
    tripPlan?: string;
    userPhoto?: string;
    nickname?: string;
    area?: string;
    created_at?: string;
}


const ConnectPeople = () => {
    const user = useUser();
    const [userTrips, setUserTrips] = useState<TripData[]>([]);
    useEffect(() => {
        if (user) {
        // 해당 사용자의 UID로 여행 플랜을 가져오는 쿼리 생성
        const tripsQuery = query(
            collection(firestore, 'TripPlan')
            //,where('uid', '==', user.uid)
        );

        getDocs(tripsQuery)
            .then((querySnapshot) => {
            const trips: TripData[] = [];
            querySnapshot.forEach((doc) => {
                trips.push({ id: doc.id, ...doc.data() } as TripData);
            });
            setUserTrips(trips);
            })
            .catch((error) => {
            console.error('여행 플랜 불러오기 오류:', error);
            });
        }
    }, [user]);

    const [message, setMessage] = useState('');
    const router = useRouter();
    const requestButtonClick = () => {
        alert('동행 요청을 보냈습니다.');
        router.push('/Chatting/ChattingRoom');
    };
    const rejectButtonClick = () => {
        alert('동행 거절을 보냈습니다.');
        setMessage('동행거절');
    };

    return (
        <div>
            {userTrips.map((trip, index) => (
                <Box key={index}>
                    <Content>
                    <ImageContainer>
                    <img
                        src="/User_Image/Profile_Blue.jpg"
                        alt="My Image"
                        style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '70%',
                        }}
                    />
                    </ImageContainer>
                    <UserInfo>
                        <Location>{trip.tripTitle}</Location>
                        <Name>{trip.nickname}</Name>
                        <Button onClick={requestButtonClick}>동행요청</Button>
                        <RejectButton onClick={rejectButtonClick}>동행거절</RejectButton>
                    </UserInfo>
                    </Content>
                    <TimeLine>{String(trip.tripPlan)}</TimeLine>
                </Box>
            ))}
        </div>
    );
    };

    const Content = styled.div`
    display: flex;
    align-items: center;
    `;

    const Box = styled.div`
    
    position: relative;
    width: 380px;
    height: 200px;
    border: 1px solid black;
    `;

    const ImageContainer = styled.div`
    margin-left: 10px;
    margin-top: 10px;
    `;

    const UserInfo = styled.div`
    margin-left: 15px;
    margin-top: 10px;
    `;

    const Location = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 8px;
    `;

    const Name = styled.p`
    font-size: 20px;
    font-weight: light;
    margin-top: 7px;
    margin-bottom: 8px;
    text-align: left;
    `;

    const TimeLine = styled.p`
    width: 270px;
    font-size: 16px;
    font-weight: light;
    margin-top: 10px;
    margin-left: 10px;
    text-align: left;
    `;

    const Button = styled.button`
    width: 90px;
    height: 30px;
    background-color: #0160d6;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    position: absolute;
    top: 25px;
    right: 5px;
    &:hover {
        background-color: #003f9e;
    }
    `;

    const RejectButton = styled.button`
    width: 90px;
    height: 30px;
    background-color: red;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    position: absolute;
    top: 65px;
    right: 5px;
    &:hover {
        background-color: #990000;
    }
`;

export default ConnectPeople;
