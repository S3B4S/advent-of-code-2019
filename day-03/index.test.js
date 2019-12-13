import fs from 'fs';
import { map, filter, reduce, split } from 'ramda';
import { getSlope, getYIntercept, intersectionPoint, Point, Line, doIntersect } from './index';

// Read in data and clean it
const splitWires = split('\n');
const splitInstructions = split(',');

const txt = fs.readFileSync('./day-03/input.txt', 'utf8');
const inputData = map(splitInstructions, splitWires(txt));

test('Slope', () => {
  const point1 = new Point(1, 1);
  const point2 = new Point(3, 3);
  const line1 = new Line(point1, point2);
  expect(getSlope(line1)).toEqual(1);
  // expect(getSlope([[1, 3], [5, 9]])).toEqual(1.5);
  // expect(getSlope([[10, 10], [15, 5]])).toEqual(-1);
});

test('Y-intercept', () => {
  const point1 = new Point(1, 1);
  const slope = 1;
  expect(getYIntercept(point1, slope)).toEqual(0);
  // expect(getYIntercept([[1, 3], [5, 9]])).toEqual(1.5);
  // expect(getYIntercept([[10, 10], [15, 5]])).toEqual(20);
});

test('doIntersect', () => {
  const point1 = new Point(2, 0);
  const point2 = new Point(2, 8);
  const line1 = new Line(point1, point2);
  const point3 = new Point(1, 1);
  const point4 = new Point(4, 1);
  const line2 = new Point(point3, point4);
  expect(doIntersect(line1, line2)).toEqual(true);
})

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
