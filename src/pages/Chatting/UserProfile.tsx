import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react"
import ChattingRoom from "./ChattingRoom";
import { QuerySnapshot, Timestamp, collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "../User/UserContext";
import { firestore } from "../User/firebase";
import { useRoom } from "../User/ChattingRoomContext";
import { useTripPlan } from "../User/TripContext";

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
    

    // ... (이전 코드)

return (
    <div>
        {userRooms.length > 0 ? (
            <UserContainer>
            {userRooms.map((userData) => (
                <User key={userData.id} onClick={openChattingRoomModal}>
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
                    <UserName>{userData.partnerNickname}</UserName>
                    <Chat>{userData.lastMessage}</Chat>
                </UserInfo>
                </User>
            ))}
            </UserContainer>
        ) : (
            <p>채팅방이 없습니다.</p>
        )}
    
        {isChattingRoomVisible && (
            <ModalOverlay
            ref={outside}
            onClick={(e) => {
                if (e.target === outside.current) setChattingRoomVisible(false);
            }}
            >
            <ChattingRoom></ChattingRoom>
            </ModalOverlay>
        )}
        </div>
    );
    
}

export default UserProfile;

const UserContainer = styled.div`
    margin-left: 10px;
    margin-top: 10px;
`;

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
