import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useUser } from './UserContext';
import { useRoom } from "./ChattingRoomContext";
import ChattingRoom from "./ChattingMessages";
import { useTripPlan } from "./TripContext";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";

interface RoomData{
    id?: string;
    reqUid?: string;
    resUid?: string;
    created_at?: string;
    userPhoto?: string;
    tripPlanId?: string;
}

interface UserProfileProps {
    roomId: string;
}

const UserProfile = () => {
    const user = useUser();
    const tripPlan = useTripPlan();
    const room = useRoom();

    const [chattingRoom, setChattingRoom] = useState<RoomData[]>([]);

    const [isChattingRoomVisible, setChattingRoomVisible] = useState(false);
    const outside = useRef(null);

    const openChattingRoomModal = () => {
        setChattingRoomVisible(true);
    };

    const closeChattingRoomModal = () => {
        setChattingRoomVisible(false);
    };

    useEffect(() => {
        const fetchChattingRoom = async () => {
            try {
                // Firestore에서 채팅방 정보를 가져오는 쿼리 생성
                const RoomQuery = query(collection(firestore, 'ChattingRoom'), 
                where('reqUid', '==', user?.uid), where('resUid', '==', user?.uid)
                );

                getDocs(RoomQuery)
                .then((querySnapshot) => {
                    const rooms: RoomData[] = [];
                    querySnapshot.forEach((doc) => {
                        rooms.push({ id: doc.id, ...doc.data() as RoomData});
                    });
                    setChattingRoom(rooms);
                })
            } catch (error) {
                console.error('채팅방 정보 가져오기 오류:', error);
            }
            };
            fetchChattingRoom();
        });

    return (
        <div>
            <User onClick={openChattingRoomModal}>
                {chattingRoom.length > 0 ? (
                    <div>
                    <ImageContainer>
                    <img
                        src="/User_Image/Profile_Blue.jpg"
                        alt="My Image"
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '30px',
                        }}
                    />
                </ImageContainer>
                <UserInfo>
                    {chattingRoom.map((RoomData) => (
                        <li key={RoomData.id}>
                            <UserName>{}{RoomData.tripPlanId}</UserName>
                            <Chat>최근에 여행가기로 한...</Chat>
                        </li>
                    ))}
                    
                </UserInfo>
                </div>
                ) : (
                    <p>사용자의 여행 플랜이 없습니다.</p>
                )}
                
            </User>
            {isChattingRoomVisible && (
                <ModalOverlay
                    ref={outside}
                    onClick={(e) => { if (e.target === outside.current) setChattingRoomVisible(false) }}
                >
                    <ChattingRoom />
                </ModalOverlay>
            )}
        </div>
    );
}

export default UserProfile;

const User = styled.div`
    display: flex;
    width: 433px;
    height: 100px;
    margin-bottom: 10px;
`;

const ImageContainer = styled.div`
    margin-left: 10px;
    margin-top: 10px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    margin-top: 10px;
`;

const UserName = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 8px;
`;

const Chat = styled.p`
    font-size: 14px;
    margin-top: 0px;
    margin-bottom: 0;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
