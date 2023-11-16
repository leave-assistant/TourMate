import { useState } from 'react';
import { firestore } from './firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useUser } from './UserContext';


function TripAdd() {
    const user = useUser();
    const [tripTitle, setTripTitle] = useState('');
    const [tripPlan, setTripPlan] = useState('');
    const [tripId, setTripId] = useState(null);
    const [area, setArea] = useState('');
    
    const [isEditing, setIsEditing] = useState(false);
    const [texts, setTexts] = useState({
        TourStyle: user?.TourStyle,
        Mbti: user?.Mbti,
        Info: user?.Info,
    });

    let today = new Date();
    
    const handleAddTrip = async () => {
        if(user){
            const tripData = {
                id:'',
                uid: user.uid,
                tripTitle: tripTitle,
                tripPlan: tripPlan,
                userPhoto: '',
                nickname: user.nickname,
                area: area,
                created_at: today,
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

    return (
        <div>
            {user ? (
                
                <div>
                <h2>여행 추가</h2>
                <input
                    type="text"
                    placeholder="여행 제목"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="여행 일정"
                    value={tripPlan}
                    onChange={(e) => setTripPlan(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="지역"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                <button onClick={handleAddTrip}>여행 추가</button>
            </div>

        ) : (
            <p>사용자가 로그인하지 않았습니다.</p>
        )}

        
        </div>
        );
}

export default TripAdd;