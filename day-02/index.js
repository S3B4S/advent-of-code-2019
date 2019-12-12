// Inline destructing unfortunately didn't work for Node 13.3
import R from 'ramda';
const { split, compose, not, map, filter, add, multiply } = R;
import fs from 'fs';

// Read in data and clean it
const isNotNaN = compose(not, isNaN);

const txt = fs.readFileSync('./day-02/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, split(',', txt)));

/// Part 01
const OPCODES = {
  1: add,
  2: multiply,
}

const performOperation = (startingIndex, opcode, list) => {
  const op = OPCODES[opcode];
  const firstReference = list[startingIndex + 1];
  const secondReference = list[startingIndex + 2];
  const firstValue = list[firstReference];
  const secondValue = list[secondReference];
  const outputReference = list[startingIndex + 3];

  const result = op(firstValue, secondValue);
  list[outputReference] = result;
}

const run = list => {
  let opcode = list[0];
  let currentIndex = 0;

  while (opcode != 99) {
    performOperation(currentIndex, opcode, list);
    currentIndex += 4;
    opcode = list[currentIndex];
  }

  return list;
}

// Restore 1202 program alarm state
inputData[1] = 12;
inputData[2] = 2;

console.log(run(inputData)[0]); // -> 5110675