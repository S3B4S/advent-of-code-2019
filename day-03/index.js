import { reduce, splitAt, uniqBy } from 'ramda';

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
  }, [{ x: 0, y: 0 }], instructions)
  console.log(points);
  return uniqBy(({ x, y }) => ({ x, y }), points);
}

const intersectionPoint = (instructionsLine1, instructionsLine2) => {
  const intersectionPoints = [];
}

/// Part 2

export { generatePoints }
