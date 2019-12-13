import { map, reduce, splitAt, uniq, min } from 'ramda';

/// Part 1
// Point :: { x, y } with x & y ints
// Line :: [Point, Point]

const DIRECTIONS = {
  U: ({x, y}) => ({ x, y: y + 1 }),
  R: ({x, y}) => ({ x: x + 1, y }),
  D: ({x, y}) => ({ x, y: y - 1 }),
  L: ({x, y}) => ({ x: x - 1, y }),
}

// xIntersection :: Line -> Point -> Bool
const xProjectsOnLine = (point, [point1, point2]) =>
  (point1.x <= point.x && point.x <= point2.x) ||
  (point2.x <= point.x && point.x <= point1.x);

// yIntersection :: Line -> Point -> Bool
const yProjectsOnLine = (point, [point1, point2]) =>
  (point1.y <= point.y && point.y <= point2.y) ||
  (point2.y <= point.y && point.y <= point1.y);

// mightIntersect :: Line -> Line -> Bool
const mightIntersect = (line1, line2) => {
  const [point1, point2] = line1;
  const [point3, point4] = line2;

  return (
    xProjectsOnLine(point1, line2) ||
    xProjectsOnLine(point2, line2) ||
    xProjectsOnLine(point3, line1) ||
    xProjectsOnLine(point4, line1)
  ) && (
    yProjectsOnLine(point1, line2) ||
    yProjectsOnLine(point2, line2) ||
    yProjectsOnLine(point3, line1) ||
    yProjectsOnLine(point4, line1)
  )
}

// manhattenDistance :: Point -> Int
const manhattenDistance = ({ x, y }) => Math.abs(x) + Math.abs(y);

// turningPoints :: [Instruction] -> [Point]
const turningPoints = instructions => {
  return reduce((acc, instruction) => {
    const [direction, amount] = splitAt(1, instruction);
    const op = DIRECTIONS[direction];

    let currentPoint = acc[acc.length - 1];
    for (let i = 0; i < amount; i++) {
      currentPoint = op(currentPoint);
    }
    acc.push(currentPoint);
    return acc;
  }, [{ x: 0, y: 0 }], instructions);
}

// direction :: Line -> Char
const direction = ([point1, point2]) => {
  let instruction;
  if (point1.x < point2.x) {
    instruction = 'R'
  } else if (point1.x > point2.x) {
    instruction = 'L'
  } else if (point1.y < point2.y) {
    instruction = 'U'
  } else {
    instruction = 'D'
  }
  return instruction;
}

// allPoints :: Line -> [Point]
const allPoints = line => {
  const directionLine = direction(line);
  const [startingPoint, endingPoint] = line;
  
  const allPoints = [startingPoint];
  let currentPoint = startingPoint;

  while (currentPoint.x !== endingPoint.x || currentPoint.y !== endingPoint.y) {
    const op = DIRECTIONS[directionLine];
    currentPoint = op(currentPoint);
    allPoints.push(currentPoint);
  }

  return allPoints;
}

// commonPoints :: Line -> Line -> [Point]
const commonPoints = (line1, line2) => {
  const pointsLine1 = allPoints(line1);
  const pointsLine2 = allPoints(line2);
  return pointsLine1.filter(point => pointsLine2.some(point2 => point.x === point2.x && point.y === point2.y));
}

// distanceClosestCommonPoint :: [Instruction] -> [Instruction] -> Int
const distanceClosestCommonPoint = (instructionsWire1, instructionsWire2) => {
  let turningPointsWire1 = turningPoints(instructionsWire1);
  let turningPointsWire2 = turningPoints(instructionsWire2);

  let allCommonPoints = [];
  for (let i = 0; i < turningPointsWire1.length - 1; i++) {
    const point1 = turningPointsWire1[i];
    const point2 = turningPointsWire1[i + 1];

    for (let j = 0; j < turningPointsWire2.length - 1; j ++) {
      const point3 = turningPointsWire2[j];
      const point4 = turningPointsWire2[j + 1];

      const line1 = [point1, point2];
      const line2 = [point3, point4];

      if (mightIntersect(line1, line2)) {
        allCommonPoints = [...allCommonPoints, ...commonPoints(line1, line2)];
      }
    }
  }

  allCommonPoints.shift(); // Remove { x: 0; y: 0 }
  const manhattenDistances = map(manhattenDistance, allCommonPoints);
  return reduce(min, Infinity, manhattenDistances);
}

/// Part 2

export { distanceClosestCommonPoint, mightIntersect }
