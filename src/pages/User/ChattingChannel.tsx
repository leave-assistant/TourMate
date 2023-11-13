import React, { useState } from 'react';
import { firestore } from './firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useUser } from './UserContext';

const ChattingChannel = ({id = null}) => {
    const user = useUser();
    const [chatText, setChatText] = useState('');


    const handleSendMessage = async () => {
        if(user && chatText.trim() !== ''){
            const messages = {
                id:'',
                uid: user.uid,
                text: chatText,
                nickname: user.nickname,
                isRead: false,
                created_at: new Date(),
            };
            try {
                const messagesCollection = collection(firestore, 'messages');
                const newMessagesRef = await addDoc(messagesCollection, messages);
                const MessagesId = newMessagesRef.id;

                const MessagesRef = doc(firestore, 'messages', MessagesId);
                const updatedData = {
                    id: MessagesId,
                };
                await updateDoc(MessagesRef, updatedData);
                alert('채팅이 성공적으로 추가');
            } catch (error){
                alert('채팅 추가 중 오류 발생: '+error);
            }
            } else {
                alert('사용자가 로그인하지않았습니다.')
            }
        };
    

    return (
        <div>
            {user ? (
                
                <div>
                <h2>여행 추가</h2>
                <input
                    type="text"
                    placeholder="여행 제목"
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                />
                <button onClick={handleSendMessage}>채팅 추가</button>
            </div>

        ) : (
            <p>사용자가 로그인하지 않았습니다.</p>
        )}

        
        </div>
        );
}