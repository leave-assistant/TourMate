import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Script from "next/script";
import styled from "styled-components";

const KakaoMap = () => {
  const [level, setLevel] = useState(3);
  return (
    <KakaoMapContainer>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6df8d48eb03e1c3748f717217e7314c1&autoload=false"
        strategy="beforeInteractive"                
      />
      <StyledMap 
          center={{ lat: 33.5563, lng: 126.79581 }}      // 지도의 중심 좌표
          // style={{ width: '800px', height: '600px' }} // 지도 크기
          level={level}                                  // 지도 확대 레벨
        >
          {/* <button onClick={() => setLevel(level + 1)}>-</button>
          <button onClick={() => setLevel(level - 1)}>+</button> */}
      </StyledMap>
    </KakaoMapContainer>
  );
};

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`; 

const StyledMap = styled(Map)`
  width: 100%;
  height: 100%;
`;

export default KakaoMap;