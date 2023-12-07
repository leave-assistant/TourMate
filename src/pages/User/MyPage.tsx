import React from "react";
import { UserProvider } from "../User/UserContext";
import { TripPlanProvider } from "./TripContext";
import { RoomProvider } from "./ChattingRoomContext";
import ChattingTwo from "./ChattingTwo";
import ChattingRoom from "./ChattingRoom";

const MyPage = () => {
    return (
        <UserProvider>
        <TripPlanProvider>
        <RoomProvider>
            <ChattingTwo roomId={"pYj0onqSKwlc7QFyBK14"} />
            {/* <ChattingRoom roomId={"pYj0onqSKwlc7QFyBK14"}/> */}
        </RoomProvider>
        </TripPlanProvider>
        </UserProvider>
    );
};

export default MyPage;