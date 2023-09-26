import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MyPage = () => {
return (
    <Background>
        <MyPageContent>
        <Title>MY 투어메이트</Title>
        <Image><img src="/MyPage_Image/people.png"/></Image>
        <Profile><br/>투어메이트를 더 안전하고<br/> 편리하게 이용하세요</Profile>
        <Introduce>
        </Introduce>
        <History>
            <Button><Link href='./SignIn'>로그인</Link></Button>
            <Button><Link href="./SignUp">회원가입</Link></Button>
        </History>
        </MyPageContent>
    </Background>
);
};


const Background = styled.div`
    width: 440px;
    height: 100%;
    background-color: skyblue;
`;

const MyPageContent = styled.div`
width: 440px;
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
width: 300px;
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

export default MyPage;