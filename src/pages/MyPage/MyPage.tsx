import React from "react";
import styled from "styled-components";
import { UserProvider } from "../User/UserContext";
import App from "./MyPageContent"; //로그인여부에 따른 MyPage
import { TripPlanProvider } from "../User/TripContext";
import { RoomProvider } from "../User/ChattingRoomContext";
const MyPage = () => {
    return (
        <UserProvider>
        <TripPlanProvider>
		    <RoomProvider>
            <App></App>
        </RoomProvider>
        </TripPlanProvider>
        </UserProvider>
    );
};

export default MyPage;