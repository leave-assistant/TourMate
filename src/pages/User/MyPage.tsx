import React from "react";
import { UserProvider } from "../User/UserContext";
import { TripPlanProvider } from "./TripContext";
import { RoomProvider } from "./ChattingRoomContext";
import ChattingTwo from "./ChattingTwo";
import ChattingRoom from "./ChattingRoom";
import SignUp from "./SignUp";

const MyPage = () => {
    return (
        <UserProvider>
        <TripPlanProvider>
        <RoomProvider>
            <SignUp></SignUp>
        </RoomProvider>
        </TripPlanProvider>
        </UserProvider>
    );
};

export default MyPage;