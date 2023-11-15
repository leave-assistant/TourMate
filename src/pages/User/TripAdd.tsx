import { useState } from 'react';
import { firestore } from './firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useUser } from './UserContext';

function TripAdd() {
    const user = useUser();
    const [tripTitle, setTripTitle] = useState('');
    const [tripPlan, setTripPlan] = useState('');
    const [tripId, setTripId] = useState(null);
    const [editing, setEditing] = useState(false);
    
    const handleAddTrip = async () => {
        if(user){
            const tripData = {
                id:'',
                uid: user.uid,
                tripTitle: tripTitle,
                tripPlan: tripPlan,
                userPhoto: '',
                nickname: user.nickname,
                area: '',
            };
            try {
                const tripCollection = collection(firestore, 'TripPlan');
                const newTripRef = await addDoc(tripCollection, tripData);
                const tripId = newTripRef.id;

                const tripRef = doc(firestore, 'TripPlan', tripId);
                const updatedData = {
                    id: tripId,
                };
                await updateDoc(tripRef, updatedData);
                alert('여행 계획이 성공적으로 추가');
            } catch (error){
                alert('여행 계획 추가 중 오류 발생: '+error);
            }
        } else {
            alert('사용자가 로그인하지않았습니다.')
        }
    };

    const handleEditTrip = async () => {
        if (tripId) {
            const tripRef = doc(firestore, 'TripPlan', tripId);
            const updatedData = {
                //uid: ,
                tripTitle: tripTitle,
                tripPlan: tripPlan,
            };
            try {
                await updateDoc(tripRef, updatedData);
                alert('여행 계획이 성공적으로 수정되었습니다.');
                clearForm();
            } catch (error) {
                alert('여행 계획 수정 중 오류 발생:'+error);
            }
            }
        };

        const handleDeleteTrip = async () => {
            if (tripId) {
                const tripRef = doc(firestore, 'TripPlan', tripId);
                try {
                    await deleteDoc(tripRef);
                    console.log('여행 계획이 성공적으로 삭제되었습니다.');
                    clearForm();
                } catch (error) {
                    console.error('여행 계획 삭제 중 오류 발생:', error);
                }
                }
            };

    const selectTripToEdit = (trip: any) => {
        setTripId(trip.id);
        setTripTitle(trip.tripTitle);
        setTripPlan(trip.tripPlan);
        setEditing(true);
        };

    const clearForm = () => {
        setTripTitle('');
        setTripPlan('');
        setTripId(null);
        setEditing(false);
        };

    return (
        <div>
            {user ? (
                <div>
                <p>사용자 닉네임: {user.nickname}</p>
                <p>사용자 나이: {user.age}</p>
        
                <h2>{editing ? '여행 수정' : '여행 추가'}</h2>
                <input
                    type="text"
                    placeholder="여행 제목"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="여행 계획"
                    value={tripPlan}
                    onChange={(e) => setTripPlan(e.target.value)}
                />
                {editing ? (
                <div>
                <button onClick={handleEditTrip}>여행 수정</button>
                <button onClick={clearForm}>취소</button>
                </div>
            ) : (
                <button onClick={handleAddTrip}>여행 추가</button>
            )}

            <h2>여행 삭제</h2>
            <button onClick={handleDeleteTrip}>여행 삭제</button>
            </div>
        ) : (
            <p>사용자가 로그인하지 않았습니다.</p>
        )}
        </div>
        );
}

export default TripAdd;