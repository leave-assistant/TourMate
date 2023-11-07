import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { firestore } from './firebase';

interface TripData{
    id?: string;
    uid?: string;
    tripTitle?: string;
    tripPlan?: string;
    userPhoto?: string;
    nickname?: string;
    area?: string;
}

function TripList() {
    const user = useUser();
    const [userTrips, setUserTrips] = useState<TripData[]>([]);
    const [tripId, setTripId] = useState(null);
    const [editing, setEditing] = useState(true);

    useEffect(() => {
        if (user) {
        // 해당 사용자의 UID로 여행 플랜을 가져오는 쿼리 생성
        const tripsQuery = query(
            collection(firestore, 'TripPlan'),
            where('uid', '==', user.uid)
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

    const handleEditTrip = async () => {
        if (tripId) {
            const tripRef = doc(firestore, 'TripPlan', tripId);
            const updatedData = {
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

    return (
        <div>
        {userTrips.length > 0 ? (
            <div>
            <h2>사용자의 여행 플랜 목록:</h2>
            <ul>
                {userTrips.map((trip) => (
                <li key={trip.id}>
                    <p>여행 제목: {trip.tripTitle}</p>
                    <p>여행 계획: {trip.tripPlan}</p>
                    <button onClick={handleEditTrip}>여행 수정</button>
                </li>
                ))}
            </ul>
            </div>
        ) : (
            <p>사용자의 여행 플랜이 없습니다.</p>
        )}
        </div>
    );
}

export default TripList;
