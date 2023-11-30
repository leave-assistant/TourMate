import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { useUser } from "./UserContext";
import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useTripPlan } from "./TripContext";

interface RoomData {
	created_at: string;
    id: string;
    reqUid: string;
    resUid: string;
	tripPlanId: string;
}
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

const ChattingRoom: React.FC<ChattingRoomProps> = ({ roomId }) => {
    const userContext = useUser();
    const tripPlanContext = useTripPlan();
    const [tripPlan, setTripPaln] = useState<TripPlanData[]>([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const [modal, setModal] = useState(false)

    const handleOnChange = (e: any) => {
        setNewMessage(e.target.value);
    };


    const sendButtonClick = async (message: string) => {
        if(userContext){
            const MessageData = {
                id:'',
                roomId: roomId,
                uid: userContext.uid,
                message: message,
                created_at: serverTimestamp(),
            };
            try{
                const MessageCollection = collection(firestore, 'Message');
                const newMessageRef = await addDoc(MessageCollection, MessageData);
                const MessageRef = doc(firestore, 'Message', newMessageRef.id);
                const updatedMessage = {
                    id: MessageRef.id,
                };
                await updateDoc(MessageRef, updatedMessage);
                alert('메세지 성공적으로 추가');
            } catch(error){
                alert('메세지 추가 중 오류 발생: '+error);
            }
        }
    }

    useEffect(() => {
        const fetchChattingRoomData = async () => {
            try {
                if (userContext) {
                    // 해당 roomId를 가진 채팅방 데이터 가져오기
                    const roomQuery = query(
                        collection(firestore, 'ChattingRoom'),
                        where('id', '==', roomId)
                    );
                    const roomSnapshot = await getDocs(roomQuery);
                    const roomData: RoomData[] = roomSnapshot.docs.map(doc => ({ 
                        id: doc.id,
                        ...doc.data()
                    } as RoomData ));

                    if (roomData && roomData.length > 0) {
                        const targetRoom = roomData[0];
                        const tripQuery = query(
                            collection(firestore, "TripPlan"),
                            where('id', '==', targetRoom.tripPlanId)
                        );
                        const tripSnapshot = await getDocs(tripQuery);
                        const tripData: TripPlanData[] = tripSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        } as TripPlanData ));
                        setTripPaln(tripData);
                    }
                    if(roomId) {
                        const messagesRef = collection(firestore, 'Message');
                        const MessagesQuery = query(
                            messagesRef,
                            where('roomId', '==', roomId),
                            orderBy('created_at', 'asc')
                        );
                        const messagesSnapshot = await getDocs(MessagesQuery);
                        const messagesData: MessageData[] = messagesSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        } as MessageData));
                        setMessages(messagesData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChattingRoomData();
    }, [userContext, roomId, tripPlanContext]);
    

    
    return(
        <>
        <Room>
            {tripPlan.map((trip) => (
                <div key={trip.id}>
                <RoomHeader>
                <ImageBox>
                    <Img src="/User_Image/Profile_Blue.jpg"/>
                    <OtherImg src = "/User_Image/Profile_Purple.jpg"/>
                </ImageBox>
                <ChattingTitle>{trip.tripTitle}</ChattingTitle>
                </RoomHeader>
                <ChattingPlan onClick={()=>setModal(!modal)}>{trip.tripPlan}</ChattingPlan>
                {
                    modal == true ? <Modal>{trip.tripPlan}</Modal> : null  //기계역할
                }
                </div>
            ))}
            {messages?.map((messageData) => (
                    <ImgChat key={messageData.id}>
                    <ChatBubble isMine={messageData.uid === userContext?.uid}>
                        <UserImg src = "/User_Image/Profile_Blue.jpg" />
                        <Chatting>{messageData.message}</Chatting>
                        </ChatBubble>
                    </ImgChat>
                ))}
                <ChattingInput
                    onChange={(e) => setMessage(e.target.value)}
                    value={newMessage}
                    placeholder="메시지를 입력하세요."
                    />
                <MyChatting  />
                <Send onClick={() => sendButtonClick(newMessage)}>
                    <SendFont>전송</SendFont>
                </Send>
        </Room>
        </>
    ); 
    
}


const Room = styled.div`
    width: 390px;
    height: 100%;
    background-color: white;
    margin-top: 70px;
`;
const RoomHeader = styled.div`
    display: flex;
    width: 390px;
    height: 80px;
    background-color: #B4D8E7;
`;
const Img = styled.img`
    position: relative;
    width: 35px;
    height: 35px;
    margin-left : 9px;
    margin-top: 8px;
    border-radius: 17px;
`;
const OtherImg = styled.img`
    position: relative;
    width: 35px;
    height: 35px;
    margin-left : 37px;
    margin-top: -7px;
    border-radius: 17px;
`;
const ImageBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChattingTitle = styled.p`
    margin-top: 31px;
    margin-left: 15px;
    font-size : 22px;
    font-weight: bold;
    
`;

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


const ChattingPlan = styled.div`
    width: 350px;
    height: 45px;
    margin-left: 15px;
    margin-top: 35px;
    font-weight: bold;
    word-break:break-all;
    overflow:hidden;
	text-overflow:ellipsis;
    padding : 0.5px 2px 0px 3px;
    background-color: lightgray;
    border-radius: 17px;
`;
const ImgChat = styled.div`
    display: flex;
    margin-top: 20px;
`;
const UserImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 15px;
`;
const Chatting = styled.div`
    display: flex;
    width: 270px;
    padding: 8px;
    margin-left: 27px;
    border-radius: 25px; 
    background-color: lightgray ;
`;

const ChattingInput = styled.input.attrs({ type: 'text'})`
    position: fixed;
    width: 300px;
    height: 50px;
    word-break:break-all;
    bottom: 0;
    margin : 0 0 30px 30px;
    border-radius: 10px;
    border : 1px solid #0160D6;
`

const Send = styled.button`
    position : fixed;
    width: 45px;
    height: 35px;
    bottom: 0;
    margin: 0 0 30px 330px;
    border-radius: 5px;
    background-color: #0160D6;
    
`
const SendFont = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
`
const Modal = styled.div`
    display: flex;
    width: 100%;
    height: 150px;
    margin-top: 20px;
    padding: 20px;
    word-break:break-all;
    overflow:hidden;
	text-overflow:ellipsis;
    background-color: lightblue;
    text-align: left;
`
const MyChatting = styled.div`
    display: flex;
    justify-content: center;
    
    margin: 30px 50px 0px 50px;
    width: 300px;
    height: 50px;
    padding: 8px;  
    border-radius: 25px; 
    background-color: lightgray ;
`;


export default ChattingRoom;