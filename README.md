# 코딩 스타일 가이드

### 1. 들여쓰기 밑 공백
* 스페이스바 4번, = 기호 사용시 앞뒤 한칸 공백

### 2. 변수 및 함수 명명 규칙
* 카멜표기법 사용해주세요.

### 3. 주석
* 어떤 주석이로든 작성한 코드에 대해 설명을 적어주세요.

### 4.폴더 및 파일 구조
* 페이지를 다룰 폴더 및 파일 구조
    * src/pages/페이지 폴더/페이지 컴포넌트
* 리유저블 컴포넌트(공용 컴포넌트) 다를 폴더 및 파일 구조
    * src/pages/Reuse/리유저블 컴포넌트 <b>(이 또한 회의를 통해 상의후 수정해주세요.)</b>

### 5. 라이브러리 및 패키지 관리
* 깃 클론시 아래의 라이브러리 및 패키지를 install 해주세요.
```
npm install
npm install styled-component
npm install react-kakao-maps-sdk
```

### 6. 테스트 규칙
* 테스트 코드를 사용하신후 삭제하시거나 주석처리 해주세요.

### 7. 버전 관리 및 협업 규칙
* Organization(팀)의 레파지토리를 Fork하여  
Fork한 개인 레파지토리를 git clone해서 코드를 작성해주세요.
* 구분할 수 있는 영역의 개발을 완료하신 경우 커밋후 PR을 작성해주시고 언급해주세요.
* PR(Pull requests)을 하시면 카톡에 "PR했습니다. 다들 확인 부탁드려요."라고 언급해주세요.
* 다른 팀원분이 작업하는 코드 및 리유저블 코드를 수정해야 할 시 git에서 issue로 전달해주세요. (형성관리를 위함)


* 리액트 컴포넌트 코드 블록 아래에 Styled-components 코드를 작성해주세요.
    ```tsx
    import React from 'react';
    import styled from "styled-components";

    function MyComponent(props) {
    return (
        <div>
        {/* 내용 */}
        </div>
    );
    }

    // 아래에 Styled-components 코드를 작성하세요.
    const StyledDiv = styled.div`
    /* 필요한 스타일을 추가하세요 */
    `;
    ```

### 8. 보안 규칙
* KakaoMap.tsx에 있는 key값을 다른 프로젝트에서 사용하지 마세요.  
Key값을 다루는 코드는 아래와 같습니다.
```tsx
<Script
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6df8d48eb03e1c3748f717217e7314c1&autoload=false"
    strategy="beforeInteractive"                
/>
```
