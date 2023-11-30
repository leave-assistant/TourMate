import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearch } from "./SearchContext";

// Kakao Maps API를 전역으로 선언
declare const window: typeof globalThis & {
  kakao: any;
};


// WriteMapPage 컴포넌트 정의
export default function WriteMapPage(props: any) {
  const { searchValue } = useSearch();
  const { searchResult, setSearchResult } = useSearch();

  // AI 코스 추가 객체 및 함수
  const { coordinates, setCoordinates } = useSearch();
  console.log("좌표 ghkghkghk", coordinates)
  const handlePlaceNameClick = (place_name: string, x: number, y: number) => {
    setCoordinates(prevCoordinates => [...prevCoordinates, { place_name, x, y }]);
    alert(`${place_name}(이)가 코스가 추가되었습니다.`);
  };

  // 컴포넌트가 마운트될 때 실행되는 useEffect
  useEffect(() => {
    // Kakao Maps API 스크립트 동적으로 생성 및 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao Maps API 로드 후 실행될 함수
      window.kakao.maps.load(function () {

        // 지도 초기화
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(38.2313466, 128.2139293),
          level: 1,
        };
        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);

        // 마커 초기화
        const markerPosition = new window.kakao.maps.LatLng(
          38.2313466,
          128.2139293
        );

        // 마커 생성후 지도에 표시하는 함수
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 지도 위에 마커를 표출합니다
        marker.setMap(map);

        // Places 서비스 초기화
        const ps = new window.kakao.maps.services.Places();

        // 인포윈도우 초기화
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 검색어로 장소 검색하는 함수
        function searchPlaces(keyword: string) {
          ps.keywordSearch(keyword, placesSearchCB);
        }

        // 검색 결과 처리 콜백 함수
        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlacesContext(data);

            // 검색된 장소의 경계로 지도 이동
            const bounds = new window.kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }

            map.setBounds(bounds);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        // 검색된 장소를 지도에 표시하는 함수
        function displayMarker(place: any) {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          window.kakao.maps.event.addListener(marker, "click", function (mouseEvent: any) {
            infowindow.setContent(`
              <span>
                ${place.place_name}
              </span>
              <button id="addCourseButton">장소 추가</button>
            `);
        
            infowindow.open(map, marker);
            const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
            map.panTo(moveLatLon);
        
            // 버튼에 onClick 이벤트 핸들러 추가 (AI 코스 추가)
            const addCourseButton = document.getElementById("addCourseButton");
            if (addCourseButton) {
              addCourseButton.addEventListener("click", function () {
                handlePlaceNameClick(place.place_name, place.x, place.y);
              });
            }
          });
        }

        // 검색된 장소 목록을 Context로 넘기는 함수
        function displayPlacesContext(places: any) {
          console.log("검색결과 : ", places);
          setSearchResult(places);
        }

        searchPlaces(searchValue);
      });
    };

    console.log("Search value changed:", searchValue);
  }, [searchValue]);

  // 목적지 검색 결과 값 콘솔 출력
  useEffect(() => {
    console.log("값 출력 : ", searchResult);
  }, [searchResult]);

  return (
    <MapSection className="map_wrap">
      <div id="map"></div>
    </MapSection>
  );
}

const MapSection = styled.div`
  display: flex;
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    border-radius: 20px;
  }
`;
