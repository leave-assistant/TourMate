import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { useUser } from "./UserContext";
import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useTripPlan } from "./TripContext";

interface TripPlanData {
    id?: string;
    uid?: string;
    tripTitle?: string;
    tripPlan?: string;
    userPhoto?: string;
    nickname?: string;
    area?: string;
    }
interface MessageData {
    created_at: string;
    id: string;
    message: string;
    roomId: string;
    uid: string;
}
interface ChattingRoomProps {
    roomId: string;
}

const ChattingTwo: React.FC<ChattingRoomProps> = ({ roomId }) => {
    const userContext = useUser();
    const tripPlanContext = useTripPlan();
    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        const fetchChattingRoomData = async () => {
            try {
                    const MessagesQuery = query(
                        collection(firestore, 'Message'),
                        where('roomId', '==', roomId),
                        orderBy('created_at', 'asc')
                    );
                    const messagesSnapshot = await getDocs(MessagesQuery);
                    const messagesData: MessageData[] = messagesSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as MessageData));
                    setMessages(messagesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChattingRoomData();
    }, [userContext, roomId, tripPlanContext]);
    

    
    return(
        <>
            {messages?.map((messageData) => (
                <div key={messageData.id}>
                    <div >
                        <p>{messageData.uid}</p>
                        <p>{messageData.message}</p>
                    </div>
                </div>
                ))}
        </>
    ); 
    
}

const ChatBubble = styled.div<{ isMine: boolean }>`
    display: flex;
    justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    /* 사용자 별로 채팅 표시 위치를 변경합니다. */

    & > div {
        padding: 8px;
        margin: 4px;
        border-radius: 8px;
        background-color: ${({ isMine }) => (isMine ? 'lightblue' : 'lightgray')};
        /* 사용자 별로 채팅 배경색을 변경합니다. */
    }
`;


export default ChattingTwo;

