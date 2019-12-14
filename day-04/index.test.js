import fs from 'fs';
import { split } from 'ramda';
import { meetsCriteria1, amountPasswordsValid } from './index';

const inputData = '367479-893698';

test('Pass the examples for part 1', () => {
  expect(meetsCriteria1('111111')).toEqual(true);
  expect(meetsCriteria1('223450')).toEqual(false);
  expect(meetsCriteria1('123789')).toEqual(false); 
});

test('Pass the puzzle input for part 1', () => {
  // expect(amountPasswordsValid(inputData)).toEqual(495);
});

test('Pass the examples for part 2', () => {
  // expect(meetsCriteria1('112233')).toEqual(true);
  // expect(meetsCriteria1('123444')).toEqual(false);
  // expect(meetsCriteria1('111122')).toEqual(true); 
});

test('Pass the puzzle input for part 2', () => {
});
