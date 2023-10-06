import React, { useState, useEffect} from "react";
import KakaoMap from "../KakaoMap";
import styled from "styled-components";
import MenuBar from "../../../public/src/NavBar";
import { app, auth, firestore } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

interface UserData{
	nickname?: string;
	age?: string;
	gender?: string;
	MBTI?: string;
	introduce?: string;
	tripStyle?: string;
}

const Main = () => {
    // MenuBar와 MenuContent의 보이기/숨기기 상태를 관리하는 상태 변수
    const [isMenuVisible, setMenuVisible] = useState(true);

    // MenuBar를 클릭할 때 MenuContent의 상태를 토글하는 함수
    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if(user) {  //로그인한 경우
			const userRef = doc(firestore, 'users', user.uid);
			const docSnap = await getDoc(userRef);
			if(docSnap.exists()){
				setUser(docSnap.data());
			} else {
				console.log("사용자 정보가 없습니다.");
			}
		} else{
			setUser(null);
		}
	});
		return () => unsubscribe();
}, []);

		return (
			<MainPage>
				<Sidebar>
					<MenuBar/>
					<MenuContentWrapper isVisible={isMenuVisible}>
					<MyPageContent>
					<Title>MY 투어메이트</Title>
						{user !== null ? (
							<Image>
							<img src="/MyPage_Image/people.png"/>
							</Image>
						) : 
							<div></div>
						}
					
					<Profile>
						{user !== null ? (
							<div>
								<div>
									<p>{user.nickname}</p>
								</div>
								<div>
									<p>{user.age}</p>
								</div>
								<div>
									<p>{user.gender}</p>
								</div>
							</div>
						) : (
							<div>
								<LinkButton>
								<Link href="./SignIn">로그인</Link>
								</LinkButton>
								<LinkButton>
								<Link href="./SignUp">회원가입</Link>
								</LinkButton>
							</div>
							
						)}
					</Profile>
					<Introduce>
						<Question>여행스타일</Question> 
						<Answer>
							{user !== null ? (
								<div>
									<div>
										<p>{user.tripStyle}</p>
									</div>
								</div>
							) : (
								<p>여행스타일을 입력해주세요</p>
							)}
						</Answer>
						<Question>MBTI</Question> <Answer>MBTI을 입력해주세요</Answer>
						<Question>소개글</Question> <Answer>소개글을 입력해주세요</Answer>
					</Introduce>
					<History>
						<UseHistory>이용 기록</UseHistory>
						<Button>이전 코스 내역</Button>
						<Button>내가 작성한 리뷰</Button>
					</History>
					</MyPageContent>
					</MenuContentWrapper>
				</Sidebar>

				<MapContainer>
					<KakaoMap />
				</MapContainer>
			</MainPage>
		);
	};

	const LinkButton = styled.div`
    padding: 10px;
    width: 60%;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
	margin: 0 auto;
	margin-bottom: 10px;
`;

	const MainPage = styled.div`
		display: flex;
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: white;
	`;

	const Sidebar = styled.div`
		display: flex;
		width: 510px; /* 원하는 사이드바 너비로 조정 */
		height: 100%;
		position: absolute;
		z-index: 2;
		background-color: #ffffff;
		
	`;
	const MenuContentWrapper = styled.div<{ isVisible: boolean }>`
		width: ${(props) => (props.isVisible ? "86.5%" : "0%")};
		overflow: hidden;
		transition: width 0.3s ease-in-out;
	`;

	const MapContainer = styled.div`
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
	`;

	const MyPageContent = styled.div`
	width: 433px;
	height: 100%;
	background-color: #ffffff;
	padding: 20px;
	`;

	const Title = styled.div`
	width: 100%;
	height: 50px;
	margin-top: 20px;
	font-size: 28px;
	font-weight: bold; 
	border-bottom: 1px solid #0160D6
	`;

	const Image = styled.div`
	width: 130px;
	height: 130px;
	margin-top: 40px;
	display: flex;
	margin-left: auto;
	margin-right: auto;
	`;

	const Profile = styled.div`
	width: 100%;
	height: 70px;
	margin-top: 10px;
	font-size: 24px;
	font-weight: normal; 
	text-align: center;
	`;

	const Introduce = styled.div`
	width: 100%;
	height: 300px;
	margin-top: 35px;
	border-bottom: 1px solid #000000
	`;

	const Question = styled.div`
	width: 100%;
	margin-top: 25px;
	margin-left: 30px;
	font-size: 24px;
	font-weight: bold; 
	color: #000000
	`;

	const Answer = styled.div`
	width: 100%;
	margin: 5px;
	font-size: 22px;
	font-weight: naomal; 
	text-align: center;
	color: #D3D3D3
	`;

	const History = styled.div`
	width: 100%;
	margin-top: 35px;
	`;

	const UseHistory = styled.div`
	width: 100%;
	margin-left: 25px;
	font-size: 26px;
	font-weight: bold; 
	`;

	const Button = styled.div`
	width: 400px;
	height: 50px;
	margin-top: 10px;
	margin-left: auto;
	margin-right: auto;
	line-height: 50px;
	font-size: 24px;
	font-weight: normal; 
	text-align: center;
	background-color: #ffffff;
	border: 1px solid #0160D6;
	border-radius: 10px;
	`;

export default Main;
