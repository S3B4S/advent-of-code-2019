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
  const copy = [...list];
  let opcode = copy[0];
  let currentIndex = 0;

  while (opcode !== 99) {
    performOperation(currentIndex, opcode, copy);
    currentIndex += 4;
    opcode = copy[currentIndex];
  }

  return copy;
}

// Restore 1202 program alarm state
inputData[1] = 12;
inputData[2] = 2;


// "Tests"
const deepEquality = (list1, list2) => {
  if (list1.length !== list2.length) return false;
  
  for (let i = 0; i < list1.length; i++) {
    if (list1[i] !== list2[i]) return false; 
  }

  return true;
}

console.log(deepEquality(run([1,0,0,0,99]), [2,0,0,0,99]))
console.log(deepEquality(run([2,3,0,3,99]), [2,3,0,6,99]))
console.log(deepEquality(run([2,4,4,5,99,0]), [2,4,4,5,99,9801]))
console.log(deepEquality(run([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99]))

console.log(run(inputData)[0]); // -> 5110675

/// Part 02
const find19690720 = list => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const copy = [...list];
      copy[1] = noun;
      copy[2] = verb;
      const updated = run(copy);
      if (updated[0] === 19690720) { return [noun, verb] }
    }
  }
  return [-1, -1];
} 

const [noun, verb] = find19690720(inputData);
console.log(100 * noun + verb); // -> 4847