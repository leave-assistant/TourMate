
export type Point = {
  lat: number;
  lon: number;
};

function calculateDistance(point1: Point, point2: Point) {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = deg2rad(point2.lat - point1.lat);
  const dLon = deg2rad(point2.lon - point1.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 거리 (km)
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
const shortestRoute = (
  points: Point[],
  currentPoint: Point,
  visited: boolean[],
  currentLength: number,
  path: Point[]
): { length: number, path: Point[] } => {
  const n = points.length;
  let minLength = Infinity;
  let shortestPath: Point[] = [];

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      const distance = calculateDistance(currentPoint, points[i]);
      const newPath = [...path, points[i]];
      const result = shortestRoute(points, points[i], visited, currentLength + distance, newPath);
      if (result.length < minLength) {
        minLength = result.length;
        shortestPath = result.path;
      }
      visited[i] = false;
    }
  }

  return minLength === Infinity ? { length: currentLength, path } : { length: minLength, path: shortestPath };
};

export const RouteCalculator = (points: Point[]) => {
  const visited = new Array(points.length).fill(false);

  // 출발지를 제외한 나머지 지점들에 대해 방문 여부를 false로 설정
  for (let i = 1; i < points.length; i++) {
    visited[i] = false;
  }

  // 출발지는 방문했다고 표시
  visited[0] = true;

  let minLength = Infinity;
  let shortestPath: Point[] = [];

  for (let i = 1; i < points.length; i++) {
    visited[i] = true;
    const result = shortestRoute(points, points[i], visited, calculateDistance(points[0], points[i]), [points[0], points[i]]);
    if (result.length < minLength) {
      minLength = result.length;
      shortestPath = result.path;
    }
    visited[i] = false;
  }

  console.log("The shortest route length is: ", minLength);
  console.log("The shortest route is: ", shortestPath);

  return { length: minLength, path: shortestPath };
};