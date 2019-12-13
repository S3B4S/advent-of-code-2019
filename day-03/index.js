import { } from 'ramda';

/// Part 1
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getTuple() { return [this.x, this.y]; }
}

class Line {
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  getTuple() { return [this.point1, this.point2]; }
}

// getSlope :: Line -> Int
const getSlope = line => {
  const [point1, point2] = line.getTuple();
  const [x1, y1] = point1.getTuple();
  const [x2, y2] = point2.getTuple();
  return (y2 - y1) / (x2 - x1);
}

const getYIntercept = (point, slope) => point.y - slope * point.x;

// doIntersect :: Line -> Line -> Bool
const doIntersect = (line1, line2) => {
  const slope1 = getSlope(line1);
  const yIntercept1 = getYIntercept(line1, slope1);
  const slope2 = getSlope(line2);
  const yIntercept2 = getYIntercept(line2, slope2);

  console.log('============');
  console.log(slope1);
  console.log(slope2);
  // If slope is equal, they don't intersect
  if (slope1 - slope2 === 0) return false;

  // Assume they intersect (thus, x1 === x2 && y1 === y2)
  const x = (yIntercept2 - yIntercept1) / (slope1 - slope2)
  const hypoY1 = slope1 * x + yIntercept1;
  const hypoY2 = slope2 * x + yIntercept2;
  console.log(x);
  console.log(hypoY1);
  console.log(hypoY2);

  return hypoY1 === hypoY2;
}

const intersectionPoint = () => {
  const intersectionPoints = [];

}

/// Part 2

export { getSlope, getYIntercept, intersectionPoint, doIntersect, Point, Line }
