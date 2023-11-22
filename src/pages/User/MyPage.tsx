import React from "react";
import styled from "styled-components";
import { UserProvider } from "../User/UserContext";
import App from "./LastMyPage"; //로그인여부에 따른 MyPage
import { TripPlanProvider } from "./TripContext";
import { RoomProvider } from "./ChattingRoomContext";
import TripList from "./TripList";
import Review from "../MyPage/Review";
import Course from "./Course";

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