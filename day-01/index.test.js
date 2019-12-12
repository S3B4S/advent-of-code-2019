import fs from 'fs';
import { split, compose, not, map, filter } from 'ramda';
import { totalFuel, totalFuelRec } from './index';

// Read in data and clean it
const splitTxtFile = split('\r\n');
const isNotNaN = compose(not, isNaN);

const txt = fs.readFileSync('./day-01/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, splitTxtFile(txt)));

test('Pass the puzzle input for part 1', () => {
  expect(totalFuel(inputData)).toEqual(3391707);
});

test('Pass the puzzle input for part 2', () => {
  expect(totalFuelRec(inputData)).toEqual(5084676);
});
