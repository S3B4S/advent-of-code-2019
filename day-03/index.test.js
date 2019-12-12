import fs from 'fs';
import { } from 'ramda';
import { intersectionPoint } from './index';

// Read in data and clean it
const txt = fs.readFileSync('./day-03/input.txt', 'utf8');
const inputData; // Create input data as appropriate

test('Pass the examples for part 1', () => {
  expect(intersectionPoint(['R75','D30','R83','U83','L12','D49','R71','U7','L72'], ['R75','D30','R83','U83','L12','D49','R71','U7','L72'])).toEqual(159);
  expect(intersectionPoint(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'], ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'])).toEqual(135);
});

test('Pass the puzzle input for part 1', () => {
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
