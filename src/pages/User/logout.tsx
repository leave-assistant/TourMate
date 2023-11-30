import { auth } from './firebase'; // path-to-firebase는 실제 파일 위치에 맞게 수정
import styled from "styled-components";
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
    const router = useRouter();

    const onLogOutClick = async () => {
        await auth.signOut();
        router.push('/');
    };

    return (
        <>
        <Logoutstyles onClick={onLogOutClick}>
            Log Out
        </Logoutstyles>
        </>
    );
};

export default Logout;

const Logoutstyles = styled.button`
    margin: 5px 0px 0px 80px;
    padding: 5px;
    height: 30px;
	text-align: center;
    font-size: 18px;
    background-color: #0160D6;
    color: #fff;
    border: none;
    border-radius: 5px;
`;