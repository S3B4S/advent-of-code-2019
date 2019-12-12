// Inline destructing unfortunately didn't work for Node 13.3
import R from 'ramda';
const { add, multiply } = R;

/// Part 01
const OPCODES = {
  1: add,
  2: multiply,
}

const performOperation = (startingIndex, opcode, list) => {
  const op = OPCODES[opcode];
  // Addresses
  const firstAddress = list[startingIndex + 1];
  const secondAddress = list[startingIndex + 2];
  const outputAddress = list[startingIndex + 3];
  // Values located at given addresses
  const firstValue = list[firstAddress];
  const secondValue = list[secondAddress];

  const result = op(firstValue, secondValue);
  list[outputAddress] = result;
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
  // If not found
  return [-1, -1];
} 

export { run, find19690720 };