import React, { useEffect, useState } from 'react';
import { RouteCalculator, Point } from './RouteCalculator';

const RouteCalculatorScreen = () => {
  const [shortestPath, setShortestPath] = useState<{ length: number, path: Point[] } | null>(null);

  useEffect(() => {
    const startPoint: Point = { lat: 126.931930810779, lon: 37.4033257723772 };  // 출발지의 좌표 (위도, 경도)
    const endPoint: Point = { lat: 126.922643794145, lon: 37.4018568034268 };  // 도착지의 좌표 (위도, 경도)
    const waypoints: Point[] = [  // 경유지
      { lat: 126.950132021463, lon: 37.391001664011 },
      { lat: 126.9638080221341, lon: 37.39423950914369 },
      { lat: 125.9638080221341, lon: 36.39423950914369 },
      // 필요한 만큼 좌표를 추가
    ];

    const points = [startPoint, ...waypoints, endPoint];
    const result = RouteCalculator(points);
    setShortestPath(result);
  }, []);

  return (
    <div>
      <h1>테스트 페이지</h1>
      {shortestPath !== null ? (
        <div>
          <p>The shortest route length is: {shortestPath.length} km</p>
          <p>The shortest route is: {shortestPath.path.map(point => `(${point.lat}, ${point.lon})`).join(' -> ')}</p>
        </div>
      ) : (
        <p>Calculating...</p>
      )}
    </div>
  );
};

export default RouteCalculatorScreen;