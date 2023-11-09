import { useUser } from './UserContext';

function UserProfile() {
	const user = useUser();

	// user를 사용하여 사용자 데이터 렌더링
	return (
		<div>
		<p>사용자 UID: {user?.nickname}</p>
		<p>이메일: {user?.age}</p>
		<p>투어스타일: {user?.TourStyle}</p>
		{/* 다른 사용자 데이터 필드 렌더링 */}
		</div>
	);
}

export default UserProfile;
