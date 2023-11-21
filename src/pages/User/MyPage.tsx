import React from "react";
import styled from "styled-components";
import EditProfile from '../MyPage/EditProfile';
import EditText from '../MyPage/EditText';
import Use from "../MyPage/Use";
import { UserProvider } from "../User/UserContext";
import App from "./LastMyPage";

const MyPage = () => {
    return (
        <UserProvider>
            <App />
        </UserProvider>
    );
};

export default MyPage;