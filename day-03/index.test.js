import fs from 'fs';
import { map, filter, reduce, split } from 'ramda';
import { generatePoints, intersectionPoint } from './index';

// Read in data and clean it
const splitWires = split('\n');
const splitInstructions = split(',');

const txt = fs.readFileSync('./day-03/input.txt', 'utf8');
const inputData = map(splitInstructions, splitWires(txt));

test('generatePoints', () => {
  expect(generatePoints(['R1', 'D1', 'L1', 'U1'])).toEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }]);
  expect(generatePoints(['R5','D3','R8','U1','L0','D1','R2','U3','L2'])).toEqual([
    { x: 0, y: 0 },
    /* R5 */ { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 },
    /* D3 */ { x: 5, y: -1 }, { x: 5, y: -2 }, { x: 5, y: -3 },
    /* R8 */ { x: 6, y: -3 }, { x: 7, y: -3 }, { x: 8, y: -3 }, { x: 9, y: -3 }, { x: 10, y: -3 }, { x: 11, y: -3 }, { x: 12, y: -3 }, { x: 13, y: -3 },
    /* U1 */ { x: 13, y: -2 },
    /* L0 */
    /* D1 Duplicated coordinate removed */
    /* R2 */ { x: 14, y: -3 }, { x: 15, y: -3 },
    /* U3 */ { x: 15, y: -2 }, { x: 15, y: -1 }, { x: 15, y: 0 },
    /* L2 */ { x: 14, y: 0 }, { x: 13, y: 0 }
  ]);
});

test('Pass the examples for part 1', () => {
  expect(intersectionPoint(['R75','D30','R83','U83','L12','D49','R71','U7','L72'], ['U62','R66','U55','R34','D71','R55','D58','R83'])).toEqual(159);
  expect(intersectionPoint(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'], ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'])).toEqual(135);
});

test('Pass the puzzle input for part 1', () => {
  expect(intersectionPoint(inputData[0], inputData[1])).toEqual(0);
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
