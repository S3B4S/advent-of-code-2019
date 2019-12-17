import fs from 'fs';
import { filter, split, map } from 'ramda';
import { combinationsOfSequence, mapTree, findMaxThrusterSignal } from './index';
import { isNotEmpty, isNotNaN } from '../utils';
import program from './intcode';

// Read in data and clean it
const txt = fs.readFileSync('./day-07/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, split(',', txt)));

test('Amount of unique combinations is 120 for 5 characters', () => {
  // First place has five options, when one has been picked, the second place only has four options etc.
  // this results in the amount of combinations being 5 * 4 * 3 * 2 * 1 = 120
  const tree = combinationsOfSequence(['1', '2', '3', '4', '5']);
  const res = mapTree(x => x.children.length === 0 ? x.value : [], tree);
  const amountCombinations = filter(isNotEmpty, res).length
  expect(amountCombinations).toEqual(120);
});

test('Sequence of amplifiers', () => {
  const memory = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
  const output1 = program.run(memory, [0, 4]);
  expect(output1).toEqual(4);
  const output2 = program.run(memory, [4, 3]);
  expect(output2).toEqual(43);
  const output3 = program.run(memory, [43, 2]);
  expect(output3).toEqual(432);
  const output4 = program.run(memory, [432, 1]);
  expect(output4).toEqual(4321);
  const output5 = program.run(memory, [4321, 0]);
  expect(output5).toEqual(43210);
});

test('Pass the examples for part 1', () => {
  expect(findMaxThrusterSignal([3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0])(['0', '1', '2', '3', '4'])).toEqual(43210);
  expect(findMaxThrusterSignal([3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0])(['0', '1', '2', '3', '4'])).toEqual(54321);
  expect(findMaxThrusterSignal([3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0])(['0', '1', '2', '3', '4'])).toEqual(65210);
});

test('Pass the puzzle input for part 1', () => {
  expect(findMaxThrusterSignal(inputData)(['0', '1', '2', '3', '4'])).toEqual(366376);
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
