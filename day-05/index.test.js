import fs from 'fs';
import { compose, map, split, not, filter } from 'ramda';
import { run } from './index';

// Read in data and clean it
const isNotNaN = compose(not, isNaN);
const txt = fs.readFileSync('./day-05/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, split(',', txt)));

// console.log(inputData);

test('Pass the examples for part 1', () => {
  console.log(run([1002,4,3,4,33], 1));
  console.log(run([3,0,4,0,99], 1));
});

test('Pass the puzzle input for part 1', () => {
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
