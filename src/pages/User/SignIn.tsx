import React, {useState} from "react";
import SignInContent from "./SignInContent";
import SignUp from "./SignUp";
import SignUpContent from "./SignUpContent";

const Main = () => {
    // MenuBar와 MenuContent의 보이기/숨기기 상태를 관리하는 상태 변수
    const [isMenuVisible, setMenuVisible] = useState(true);

    // MenuBar를 클릭할 때 MenuContent의 상태를 토글하는 함수
    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    return (
        <>
        <SignInContent />
        </>
    );
};

export default Main;
