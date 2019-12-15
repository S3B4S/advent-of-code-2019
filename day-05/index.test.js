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

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
