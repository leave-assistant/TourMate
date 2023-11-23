import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react"
import ChattingRoom from "./ChattingRoom";
import { QuerySnapshot, Timestamp, collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "./UserContext";
import { firestore } from "./firebase";
import { useRoom } from "./ChattingRoomContext";
import { useTripPlan } from "./TripContext";

interface UserRoomsData {
    id?: string;
    uid?: string;
    lastMessage?: string;
    profileImg?: string;
    roomId?: string;
    updated_at?: Timestamp;
    partnerNickname?: string;
}

interface TripData{
    id?: string;
    uid?: string;
    tripTitle?: string;
    tripPlan?: string;
    userPhoto?: string;
    nickname?: string;
    area?: string;
}

const UserProfile = () => {
    const user = useUser();
    const chattingRooms = useRoom();
    const tripPlan = useTripPlan();
    const [userRooms, setUserRooms] = useState<UserRoomsData[]>([]);
    const [userTrips, setUserTrips] = useState<TripData[]>([]);

    const [isChattingRoomVisible, setChattingRoomVisible] = useState(false);
    const outside = useRef(null);	
    const openChattingRoomModal = () => {
        setChattingRoomVisible(true);
    };
    const closeChattingRoomModal = () => {
        setChattingRoomVisible(false);
    };

    useEffect(() => {
        if(user) {
            const userRoomsQuery = query(
                collection(firestore, "UserRooms"),
                where('uid', '==', user.uid)
            );
    
            getDocs(userRoomsQuery)
                .then((querySnapshot) => {
                    const userRoom: UserRoomsData[] = [];
                    querySnapshot.forEach((doc) => {
                        userRoom.push({ id: doc.id, ...doc.data()} as UserRoomsData);
                    });
                    setUserRooms(userRoom);
                })
                .catch((error) => {
                    alert('사용자의 채팅방 불러오기 오류: '+error);
                });
            
            
        }
    }, [user]);
    

    return (
        <div>
        {userRooms.length > 0 ? (
        
        <User onClick={openChattingRoomModal}>
            {userRooms.map((UserRoomsData, TripData) => (
            <>
                <ImageContainer>
                    <img
                        src="/User_Image/Profile_Blue.jpg"
                        alt="My Image"
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '30px',
                        }} />
                </ImageContainer>
                        
                <UserInfo>
                    <UserName>{UserRoomsData.partnerNickname}</UserName>
                    <Chat>{UserRoomsData.lastMessage}</Chat>
                </UserInfo>
            </>
            ))}
        </User>
        ) : (
            <p>사용자의 여행 플랜이 없습니다.</p>
        )}

            {isChattingRoomVisible && (
                <ModalOverlay
                    ref={outside} 
                    onClick={ (e) => { if(e.target == outside.current) setChattingRoomVisible(false) } }>
                        <ChattingRoom></ChattingRoom>
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
