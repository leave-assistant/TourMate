import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Popup from './Popup';
import { useUser } from '../User/UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../User/firebase';

interface TripData{
  id?: string;
  uid?: string;
  tripTitle?: string;
  tripPlan?: string;
  userPhoto?: string;
  nickname?: string;
  area?: string;
}

function Course() {
  const user = useUser();
  const [userTrips, setUserTrips] = useState<TripData[]>([]);

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

  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
        <Button type="button" onClick={openPopup}><Text>이전 코스 내역</Text></Button>
        <Popup visible={isPopupVisible} onClose={closePopup}>
          <MyPageContent>
            <Title>이전 코스 내역</Title>
            
            {userTrips.length > 0 ? (
              
              <div>
                {userTrips.map((trip) => (
                  // eslint-disable-next-line react/jsx-key
                  <Outline>
                  <div key={trip.id}>
                    <CourseTitle>{trip.tripTitle}</CourseTitle>
                    <CourseArea>지역 : {trip.area}</CourseArea>
                    <CourseDetail>
                      {trip.tripPlan}
                    </CourseDetail>
                  </div>
                  </Outline>
                ))}
              </div>
            ) : (
              <Outline>
              <p>사용자의 여행 플랜이 없습니다.</p>
              </Outline>
            )}
          </MyPageContent>
        </Popup>
    </div>
  );
}

const Button = styled.button`
  width: 360px;
  height: 40px;
  margin: 10px auto;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #0160D6;
  border-radius: 10px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: normal; 
  background-color: #ffffff;
`;

const MyPageContent = styled.div`
  width: 375px;
  height: 100%;
  background-color: #ffffff;
`;

const Title = styled.div`
  width: 350px;
  height: 50px;
  margin: 10px auto;
  font-size: 28px;
  font-weight: bold; 
  border-bottom: 1px solid #0160D6;
`;

const Outline = styled.div`
  width: 360px;
  height: 120px;
  padding: 10px;
  margin: 20px auto;
  background-color: #ffffff;
  border: 1px solid #0160D6;
  border-radius: 10px;
`;

const CourseTitle = styled.div`
  font-size: 20px;
  font-weight: bold; 
  text-align: center;
`;

const CourseArea = styled.div`
  margin-top: 1px;
  font-size: 13px;
  font-weight: normal; 
  text-align: center;
  color: #D3D3D3;
`;

const CourseDetail = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: normal; 
  text-align: center;
`;

export default Course;