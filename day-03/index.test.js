import fs from 'fs';
import { map, split } from 'ramda';
import { mightIntersect, distanceClosestCommonPoint, leastStepsCommonPoint } from './index';

// Read in data and clean it
const splitWires = split('\n');
const splitInstructions = split(',');

const txt = fs.readFileSync('./day-03/input.txt', 'utf8');
const inputData = map(splitInstructions, splitWires(txt));

test('mightIntersect', () => {
  const line1 = [{ x: 1, y: 1 }, { x: 3, y: 3 }];
  const line2 = [{ x: 2, y: 1 }, { x: 2, y: 5 }];
  expect(mightIntersect(line1, line2)).toEqual(true);

  const line3 = [{ x: 2, y: 2 }, { x: 3, y: 3 }];
  const line4 = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
  expect(mightIntersect(line3, line4)).toEqual(false);
});

test('Pass the examples for part 1', () => {
  expect(distanceClosestCommonPoint(['R75','D30','R83','U83','L12','D49','R71','U7','L72'], ['U62','R66','U55','R34','D71','R55','D58','R83'])).toEqual(159);
  expect(distanceClosestCommonPoint(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'], ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'])).toEqual(135);
});

test('Pass the puzzle input for part 1', () => {
  expect(distanceClosestCommonPoint(inputData[0], inputData[1])).toEqual(2180);
});

test('Pass the examples for part 2', () => {
  expect(leastStepsCommonPoint(['R75','D30','R83','U83','L12','D49','R71','U7','L72'], ['U62','R66','U55','R34','D71','R55','D58','R83'])).toEqual(610);
  expect(leastStepsCommonPoint(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'], ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'])).toEqual(410);
});

test('Pass the puzzle input for part 2', () => {
  expect(leastStepsCommonPoint(inputData[0], inputData[1])).toEqual(112316);
});
