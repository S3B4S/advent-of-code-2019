import fs from 'fs';
import { compose, map, split, not, filter } from 'ramda';
import { run } from './index';

// Read in data and clean it
const isNotNaN = compose(not, isNaN);
const txt = fs.readFileSync('./day-05/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, split(',', txt)));

test('Pass the puzzle input for part 1', () => {
  expect(run(inputData, 1)).toEqual(15314507);
});

// Check if input is equal to 8, 1 if it is, else 0.
test('Check if input is equal to 8', () => {
  expect(run([3,9,8,9,10,9,4,9,99,-1,8], 8)).toEqual(1);
  expect(run([3,9,8,9,10,9,4,9,99,-1,8], 9)).toEqual(0);
});

test('Check if input is less than 8', () => {
  // Check if input is less than 8, 1 if it is, else 0.
  expect(run([3,9,7,9,10,9,4,9,99,-1,8], 6)).toEqual(1);
  expect(run([3,9,7,9,10,9,4,9,99,-1,8], 7)).toEqual(1);
  expect(run([3,9,7,9,10,9,4,9,99,-1,8], 9)).toEqual(0);
});

test('Pass the puzzle input for part 2', () => {
  expect(run(inputData, 5)).toEqual(652726);
});
