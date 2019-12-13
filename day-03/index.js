import { map, reduce, splitAt, uniq, min } from 'ramda';

/// Part 1
// Point :: { x, y } with x & y ints

const DIRECTIONS = {
  U: ({x, y}) => ({ x, y: y + 1 }),
  R: ({x, y}) => ({ x: x + 1, y }),
  D: ({x, y}) => ({ x, y: y - 1 }),
  L: ({x, y}) => ({ x: x - 1, y }),
}

// generatePoints :: [instructions] -> [Point]
const generatePoints = instructions => {
  const points = reduce((acc, instruction) => {
    const [direction, amount] = splitAt(1, instruction);
    const op = DIRECTIONS[direction];
    
    let lastPoint = acc[acc.length - 1];
    for (let i = 0; i < amount; i++) {
      const newPoint = op(lastPoint);
      acc.push(newPoint);
      lastPoint = newPoint;
    }
    return acc
  }, [{ x: 0, y: 0 }], instructions);
  
  return uniq(points);
}

const manhattenDistance = ({ x, y }) => Math.abs(x) + Math.abs(y);

const intersectionPoint = (instructionsWire1, instructionsWire2) => {
  const points1 = generatePoints(instructionsWire1);
  const points2 = generatePoints(instructionsWire2);

  const sharedPoints = points1.filter((point => points2.some(({ x, y }) => x === point.x && y === point.y )));
  sharedPoints.shift(); // Remove { x: 0, y: 0 }
  const manhattenDistances = map(manhattenDistance, sharedPoints);
  return reduce(min, Infinity, manhattenDistances);
}

/// Part 2

export { generatePoints, intersectionPoint }
