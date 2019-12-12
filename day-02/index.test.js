import fs from 'fs';
import { compose, map, split, not, filter } from 'ramda';
import { run, find19690720 } from './index';

// Read in data and clean it
const isNotNaN = compose(not, isNaN);
const txt = fs.readFileSync('./day-02/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, split(',', txt)));

test('Pass the examples for part 1', () => {
  expect(run([1,0,0,0,99])).toEqual([2,0,0,0,99]);
  expect(run([2,3,0,3,99])).toEqual([2,3,0,6,99]);
  expect(run([2,4,4,5,99,0])).toEqual([2,4,4,5,99,9801]);
  expect(run([1,1,1,4,99,5,6,0,99])).toEqual([30,1,1,4,2,5,6,0,99]);
});

test('Pass the puzzle input for part 1', () => {
  // Restore 1202 program alarm state
  inputData[1] = 12;
  inputData[2] = 2;

  expect(run(inputData)[0]).toEqual(5110675);
});

test('Pass the puzzle input for part 2', () => {
  const [noun, verb] = find19690720(inputData);
  expect(100 * noun + verb).toEqual(4847);
});
