// import React, { useState, useRef } from "react";
// import { Map } from "react-kakao-maps-sdk";
// import Script from "next/script";
// import styled from "styled-components";

// const KakaoMap = () => {
//   const [level, setLevel] = useState<number>(3);
//   const mapRef = useRef<any>(null);

//   const zoomIn = () => {
//     if (mapRef.current) {
//       const currentLevel = mapRef.current.getLevel();
//       mapRef.current.setLevel(currentLevel - 1);
//     }
//   };

//   const zoomOut = () => {
//     if (mapRef.current) {
//       const currentLevel = mapRef.current.getLevel();
//       mapRef.current.setLevel(currentLevel + 1);
//     }
//   };

//   return (
//     <KakaoMapContainer>
//       <Script
//         src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6df8d48eb03e1c3748f717217e7314c1&autoload=false"
//         strategy="beforeInteractive"
//       />
//       <StyledMap
//         ref={mapRef}
//         center={{ lat: 33.5563, lng: 126.79581 }}
//         level={level}
//       ></StyledMap>
//       <ZoomControls>
//         <ZoomButton onClick={zoomIn}>+</ZoomButton>
//         <ZoomButton onClick={zoomOut}>-</ZoomButton>
//       </ZoomControls>
//     </KakaoMapContainer>
//   );
// };

// const KakaoMapContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
// `;

// const StyledMap = styled(Map)`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 0;
// `;

// const ZoomControls = styled.div`
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   display: flex;
//   flex-direction: column;
//   z-index: 1;
// `;

// const ZoomButton = styled.button`
//   width: 50px;
//   height: 50px;
//   font-size: 24px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid #000;
//   border-radius: 8px;
//   margin: px 0;
//   background: #fff;
//   cursor: pointer;
// `;

// export default KakaoMap;
