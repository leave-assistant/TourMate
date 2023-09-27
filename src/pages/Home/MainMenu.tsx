import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth } from '../User/firebase';
import styled from "styled-components";
import Search from "../../../public/src/Search";
import HorizonLine from "../../../public/src/HorizonLine";
import CourseElement from '../../../public/src/CourseElement';

const MainMenu: React.FC = () => {
    const [stringData, setStringData] = useState<string[]>([]);
    const [combinedString, setCombinedString] = useState<string[]>([]);   //더미데이터 문자열

    // 더미 데이터 생성
    const dummyData = ["데이터1", "데이터2", "데이터3", "데이터1", "데이터2", "데이터3", "데이터1", "데이터2", "데이터3"];
    

    useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     // 현재 로그인된 사용자의 UID 가져오기
        //     const user = firebase.auth().currentUser;
        //     const userUid = user?.uid;
    
        //     // 여기에서 데이터를 가져오는 로직을 작성합니다.
        //     // 사용자 UID를 사용하여 해당 사용자의 데이터를 가져올 수 있습니다.
        //     const data = await fetchDataFromDatabase(userUid); // 사용자 UID 전달
        //     setStringData(data);
        //   } catch (error) {
        //     console.error('데이터 가져오기 오류:', error);
        //   }
        // };
    
        // fetchData();

        // 문자열 배열 생성
        const combinedData = dummyData.map(item => item);



        {/* 더미데이터 */}
        setStringData(dummyData);
        // CourseElement 컴포넌트로 결합된 문자열을 전달
        setCombinedString(combinedData);



      }, []);

      const fetchDataFromDatabase = async (userUid: string | undefined) => {
        try {
          if (userUid) {
            // 데이터를 받아오는 비동기 로직을 이곳에 작성하세요.
            // 예시: Firestore에서 해당 사용자의 데이터 가져오기
            const db = firebase.firestore();
            const userDocRef = db.collection('users').doc(userUid);
            const userData = await userDocRef.get();
    
            if (userData.exists) {
              // 필요한 데이터를 가져옵니다.
              const data = userData.data()?.someField;
              return [data]; // 데이터 배열로 반환
            } else {
              console.log('사용자 문서를 찾을 수 없습니다.');
              return [];
            }
          } else {
            console.log('사용자 UID가 없습니다.');
            return [];
          }
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
          return [];
        }
      };
      
    return(
        <BackgroundContainer>
            {/* 검색창 */}
            <SearchContainer>
                <Search/>
            </SearchContainer>

            {/* 예정된 코스 */}
            <CourseContainer>
                <CourseHeader>
                    <CourseText>예정된 코스</CourseText>
                    <HorizonLine width="150px" />
                    <More>자세히</More>
                </CourseHeader>
                
                <DayCourseContainer>
                    <Day>N 일차</Day>
                    <Course>
                        {/* <CourseElement data={stringData} /> */}
                        <CourseElement data={combinedString} /> {/* 더미데이터 테스트 */}
                    </Course>
                </DayCourseContainer>
            </CourseContainer>

            {/* 인기 장소 추천 */}
            <PopularSpot>
                <SpotHeader>
                    <SpotText>인기 장소 추천</SpotText>
                    <HorizonLine width="180px" />
                </SpotHeader>

                <PlaceContainer>
                    
                </PlaceContainer>
            </PopularSpot>
        </BackgroundContainer>
    );
};

// 배경
const BackgroundContainer = styled.div`
    width: 390px;
    height: 100%;
    background-color: pink;
`;

// 검색
const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 390px;
    height: 72px;
    background-color: purple;
`;

// 예정된 코스
const CourseContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 390px;
    height: 180px;
    background-color: red;
`;

const CourseHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 28px;
    margin: 20px 0 20px;
`;

const CourseText = styled.div`
    width: 130px;
    height: 28px;
    font-size: 26px;
    font-weight: bolder;
`;

const More = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 28px;
    padding-top: 8px;
    font-size: 15px;
    font-weight: bold;
    color: #828282;
`;

const DayCourseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 390px;
    height: 112px;
    background-color: skyblue;
`;

const Day = styled.div`
    display: flex;
    width: 330px;
    height: 30px;
    font-size: 18px;
    font-weight: 600;
`;

const Course = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 330px;
    height: 300px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.8;   // 텍스트 줄 간격
`;

// 인기 장소 추천
const PopularSpot = styled.div`
    display: flex;
    justify-content: center;
    width: 390px;
    height: calc(100% - 252px);
    background-color: blue;
`;

const SpotHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 40px;
    background-color: white;
`;

const SpotText = styled.div`
    width: 150px;
    height: 28px;
    font-size: 26px;
    font-weight: bolder;
`;

const PlaceContainer = styled.div`

`;

export default MainMenu;
