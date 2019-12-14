import fs from 'fs';
import { split, isEmpty, filter, not, compose } from 'ramda';
import { entry1 } from './index';

// Read in data and clean it
const txt = fs.readFileSync('./day-06/input.txt', 'utf8');
const cleanData = compose(
  filter(compose(not, isEmpty)),
  split('\n'),
)
const inputData = cleanData(txt);

test('Pass the examples for part 1', () => {
  expect(entry1(cleanData(
    "COM)B\n" +
    "B)C\n" +
    "C)D\n" +
    "D)E\n" +
    "E)F\n" +
    "B)G\n" +
    "G)H\n" +
    "D)I\n" +
    "E)J\n" +
    "J)K\n" +
    "K)L"))).toEqual(42);
});

test('Pass the puzzle input for part 1', () => {
  // expect(entry1(inputData)).toEqual(0)
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
