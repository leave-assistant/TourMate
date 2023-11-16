import React, { useEffect, useState } from 'react';
import { RouteCalculator, Point } from './RouteCalculator';

const RouteCalculatorScreen = () => {
  const [shortestPath, setShortestPath] = useState<{ length: number, path: Point[] } | null>(null);

  useEffect(() => {
    const startPoint: Point = { lat: 37, lon: 127 };  // 출발지의 좌표 (위도, 경도)
    const endPoint: Point = { lat: 35, lon: 129 };  // 도착지의 좌표 (위도, 경도)
    const waypoints: Point[] = [  // 경유지
      { lat: 38, lon: 128 },
      { lat: 36, lon: 126 },
      // 필요한 만큼 좌표를 추가0
    ];

    const points = [startPoint, ...waypoints, endPoint];
    const result = RouteCalculator(points);
    setShortestPath(result);
  }, []);

  return (
    <div>
      <h1>Shortest Route</h1>
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