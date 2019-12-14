import fs from 'fs';
import { split } from 'ramda';
import { meetsCriteria, amountPasswordsValid } from './index';

const inputData = '367479-893698';

test('Pass the examples for part 1', () => {
  expect(meetsCriteria('111111')).toEqual(true);
  expect(meetsCriteria('223450')).toEqual(false);
  expect(meetsCriteria('123789')).toEqual(false); 
});

test('Pass the puzzle input for part 1', () => {
  expect(amountPasswordsValid(inputData)).toEqual(495);
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
