import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { SearchOutlined, CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { useSearch } from "./SearchContext";

// Kakao Maps API를 전역으로 선언
declare const window: typeof globalThis & {
  kakao: any;
};

interface WriteMapPageProps {
  setAddress: (place: any) => void;
}

// WriteMapPage 컴포넌트 정의
export default function WriteMapPage(props: any) {
  const { searchValue } = useSearch();

  // 컴포넌트가 마운트될 때 실행되는 useEffect
  useEffect(() => {
    // Kakao Maps API 스크립트 동적으로 생성 및 로드
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=6df8d48eb03e1c3748f717217e7314c1&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao Maps API 로드 후 실행될 함수
      window.kakao.maps.load(function () {

        // 마커를 담을 배열
        let markers: any[] = [];

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

        // 검색 버튼 클릭 이벤트
        // const searchForm = document.getElementById("submit_btn");
        // searchForm?.addEventListener("click", function (e) {
        //   e.preventDefault();
        //   searchPlaces();
        // });

        // 검색어로 장소 검색하는 함수
        function searchPlaces(keyword: string) {
          // const keyword = (
          //   document.getElementById("keyword") as HTMLInputElement
          // ).value;

          // if (!keyword.replace(/^\s+|\s+$/g, "")) {
          //   alert("키워드를 입력해주세요!");
          //   return false;
          // }

          ps.keywordSearch(keyword, placesSearchCB);
        }
        
        // 검색 결과 처리 콜백 함수
        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);

            displayPagination(pagination);

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
          window.kakao.maps.event.addListener(
            marker,
            "click",
            function (mouseEvent: any) {
              props.setAddress(place);
              infowindow.setContent(`
              <span>
              ${place.place_name}
              </span>
              `);
              infowindow.open(map, marker);
              const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
              map.panTo(moveLatLon);
            }
          );
        }

        // 검색된 장소 목록을 화면에 표시하는 함수
        function displayPlaces(places: any) {
          console.log("검색결과 : ", places);
          const listEl = document.getElementById("placesList");
          const menuEl = document.getElementById("menu_wrap");
          const fragment = document.createDocumentFragment();
          removeAllChildNods(listEl);
          removeMarker();
          for (let i = 0; i < places.length; i++) {
            const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x
            );
            const marker = addMarker(placePosition, i);
            const itemEl = getListItem(i, places[i]);
            fragment.appendChild(itemEl);
          }
          listEl?.appendChild(fragment);
          if (menuEl) {
            menuEl.scrollTop = 0;
          }
        }

        // 검색된 장소 목록에서 각 항목을 생성하는 함수
        function getListItem(index: any, places: any) {
          const el = document.createElement("li");

          let itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.place_name +
            "</h5>";

          if (places.road_address_name) {
            itemStr +=
              "    <span>" +
              places.road_address_name +
              "</span>" +
              '   <span class="jibun gray">' +
              `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
              places.address_name +
              "</span>";
          } else {
            itemStr += "    <span>" + places.address_name + "</span>";
          }

          itemStr +=
            '  <span class="tel">' + places.phone + "</span>" + "</div>";

          el.innerHTML = itemStr;
          el.className = "item";

          return el;
        }

        // 마커를 지도에 추가하고 markers 배열에 저장하는 함수
        function addMarker(position: any, idx: any) {
          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
          const imageSize = new window.kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );

          const marker = new window.kakao.maps.Marker({
            position,
            image: markerImage,
          });

          marker.setMap(map);
          markers.push(marker);

          return marker;
        }

        // markers 배열에 저장된 마커를 지도에서 제거하는 함수
        function removeMarker() {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }

        // 페이지네이션을 표시하는 함수
        function displayPagination(pagination: any) {
          const paginationEl = document.getElementById("pagination");
          if (paginationEl) {
            const fragment = document.createDocumentFragment();
            while (paginationEl.hasChildNodes()) {
              const lastChild = paginationEl.lastChild;
              if (lastChild) {
                paginationEl.removeChild(lastChild);
              }
            }

            for (let i = 1; i <= pagination.last; i++) {
              const el = document.createElement("a");
              el.href = "#";
              el.innerHTML = String(i);

              if (i === pagination.current) {
                el.className = "on";
              } else {
                el.onclick = (function (i) {
                  return function () {
                    pagination.gotoPage(i);
                  };
                })(i);
              }

              fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
          }
        }

        // 인포윈도우에 정보를 표시하는 함수
        function displayInfowindow(marker: any, title: any) {
          const content =
            '<div style="padding:5px;z-index:1;">' + title + "</div>";

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }

        // HTML 엘리먼트의 자식 노드를 모두 제거하는 함
        function removeAllChildNods(el: any) {
          while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
          }
        }

        searchPlaces(searchValue);
      });
    };
    console.log("Search value changed:", searchValue);
  }, [searchValue]);

  // 검색어 및 상태 관리
  // const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  // 검색어 입력 시 상태 업데이트
  // const onchangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event?.target.value);
  // };

  // 검색 바 토글 버튼 클릭시 상태 업데이트
  const onClickSearchBarOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MapSection className="map_wrap" isOpen={isOpen}>
      <div id="map"></div>

      <div id="menuDiv">
        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              <div id="map_title">
                <div>단짠맛집</div>
              </div>

              <div id="form">
                {/* <input
                  type="text"
                  value={search}
                  id="keyword"
                  onChange={onchangeSearch}
                />
                <button id="submit_btn" type="submit">
                  <SearchIcon />
                </button> */}
              </div>
            </div>
          </div>

          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
        <div id="btnDiv">
        </div>
      </div>
    </MapSection>
  );
}

const MapSection = styled.div<{ isOpen: boolean }>`
  display: flex;
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    border-radius: 20px;
  }
  #menuDiv {
    display: flex;
    position: relative;
    z-index: 2;
    font-size: 12px;
  }

  #menu_wrap {
    position: relative;
    width: 400px;
    height: 600px;
    border-radius: 20px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.7);
    display: ${(props) => (props.isOpen ? "" : "none")};
  }

  #map_title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
  }

  #form {
    display: flex;
    justify-content: space between;
    padding: 0px 15px 10px 15px;
  }

  #keyword {
    width: 100%;
    border: none;
    outline: none;
  }

  #submit_btn {
    background-color: #ff6e30;
    border: none;
    outline: none;
  }

  #placesList h5 {
    color: #ff6e30;
  }

  #placesList li {
    list-style: square;
  }
  #placesList .item {
    border-bottom: 1px solid #888;
    overflow: hidden;
    cursor: pointer;
  }

  #placesList .item .info {
    padding: 10px 0 10px 5px;
  }

  #placesList .item span {
    display: block;
    margin-top: 4px;
  }
  #placesList .info .gray {
    color: #8a8a8a;
  }

  #placesList .info .tel {
    color: #009900;
  }

  #btnDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #pagination {
    margin: 10px auto;
    text-align: center;
  }
  #pagination a {
    display: inline-block;
    margin-right: 10px;
    color: #7b7b7b;
  }
  #pagination .on {
    font-weight: bold;
    cursor: default;
    color: #ff6e30;
  }

  #btnOn {
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #searchBtn {
    width: 20px;
    padding: 0px;
    height: 70px;
    background-color: #ffa230;
    border: none;
    outline: none;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  color: #fff;
  cursor: pointer;
`;

const LeftDisplayButton = styled(CaretLeftFilled)`
  color: #fff;
  cursor: pointer;
`;

const RightDisplayButton = styled(CaretRightFilled)`
  color: #fff;
  cursor: pointer;
`;
