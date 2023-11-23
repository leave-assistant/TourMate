import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import router, { useRouter } from 'next/router';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from './firebase';
import { useUser } from './UserContext';
import { useTripPlan } from './TripContext';

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


const ConnectPeople = (data: TripData) => {
    const trip = useTripPlan();
    const user = useUser();
    const [userTrips, setUserTrips] = useState<TripData[]>([]);

    useEffect(() => {
        const fetchUserTrips = async () => {
            if (user) {
                try {
                    // 해당 사용자의 UID로 해당사용자외의 다른 사용자들의 여행 플랜을 가져오는 쿼리 생성
                    const tripsQuery = query(
                        collection(firestore, 'TripPlan')
                        ,where('uid', '!=', user.uid)
                    );
                    const querySnapshot = await getDocs(tripsQuery);
                    const trips: TripData[] = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    } as TripData));
                    setUserTrips(trips);
                } catch(error)  {
                console.error('여행 플랜 불러오기 오류:', error);
                }
            }
        };
        fetchUserTrips();
    }, [user]);

    const [message, setMessage] = useState('');
    const router = useRouter();

    const requestButtonClick = async (resUid?: string, tripid?:string, tripnickname?:string) => {
        if(user){
            const RoomData = {
                id:'',
                reqUid: user.uid,
                resUid: resUid,
                tripPlanId: tripid,
                created_at: new Date(),
            };
            const User1Data = {
                id: '',
                uid: user.uid,
                partnerNickname: tripnickname,
                lastMessage: "채팅 시작",
                profileImg: '',
                roomId: '',
                updated_at: new Date(),
            };
            const User2Data = {
                id: '',
                uid: resUid,
                partnerNickname: user.nickname,
                lastMessage: "채팅 시작",
                profileImg: '',
                roomId: '',
                updated_at: new Date(),
            };
            try
            {
                //ChattingRoom DB 추가
                const RoomCollection = collection(firestore, 'ChattingRoom');
                const newRoomRef = await addDoc(RoomCollection, RoomData);
                //UserRooms DB 추가
                const User1Collection = collection(firestore, 'UserRooms');
                const newUser1Ref = await addDoc(User1Collection, User1Data);
                const User2Collection = collection(firestore, 'UserRooms');
                const newUser2Ref = await addDoc(User2Collection, User2Data);

                const RoomRef = doc(firestore, 'ChattingRoom', newRoomRef.id);
                const updatedData = {
                    id: RoomRef.id,
                };
                const User1Ref = doc(firestore, 'UserRooms', newUser1Ref.id);
                const updatedUser1Data = {
                    id: User1Ref.id,
                    roomId: RoomRef.id,
                };
                const User2Ref = doc(firestore, 'UserRooms', newUser2Ref.id);
                const updatedUser2Data = {
                    id: User2Ref.id,
                    roomId: RoomRef.id,
                };
                await updateDoc(RoomRef, updatedData);
                await updateDoc(User1Ref, updatedUser1Data);
                await updateDoc(User2Ref, updatedUser2Data);

                alert('채팅룸이 성공적으로 추가');
            } catch (error){
                alert('채팅룸 추가 중 오류 발생: '+error);
            }
        } else {
            alert('사용자가 로그인하지않았습니다.')
        }


        // alert('동행 요청을 보냈습니다.');
        router.push('/Chatting/ChattingRoom');
    };
    const rejectButtonClick = () => {
        alert('동행 거절을 보냈습니다.');
        setMessage('동행거절');
    };

    return (
        <div>
            {userTrips.map((TripData) => (
                <Box key={TripData.id}>
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
                        <Location>{TripData.tripTitle}</Location>
                        <Name>{TripData.nickname}</Name>
                        <Button onClick={() => requestButtonClick(TripData.uid, TripData.id, TripData.nickname)}>동행요청</Button>
                        <RejectButton onClick={rejectButtonClick}>동행거절</RejectButton>
                    </UserInfo>
                    </Content>
                    <TimeLine>{String(TripData.tripPlan)}</TimeLine>
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
