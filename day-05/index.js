import { add, multiply, toString, reverse, map, curry } from 'ramda';

const mapWithIndex = curry((fn, list) => list.map(fn));

let USER_INPUT = 0;
let OUTPUT = 0;

// [function, incrementPointerBy]
const OPERATIONS = {
  '01': {
    // Add and store at address
    fn: curry((list, a, b, address) => { list[address] = a + b }),
    incrementPointerBy: 4,
  },
  '02': {
    // Multiply and store at address
    fn: curry((list, a, b, address) => { list[address] = a * b }),
    incrementPointerBy: 4,
  },
  '03': {
    // Write input to address
    fn: curry((list, address) => { list[address] = USER_INPUT }),
    incrementPointerBy: 2,
  },
  '04': {
    // Read from address and outputs it
    fn: curry((list, address) => { OUTPUT = list[address] }),
    incrementPointerBy: 2,
  },
  'READ': {
    // Return position at address
    fn: curry((list, address) => list[address]),
  }
}

const PARAMETER_MODE = {
  position: '0', // parameter interpreted as position where to retrieve value
  immediate: '1', // parameter is the value itself
}

const performOperation = ([opcode, ...modes], startPointer, list) => {
  const op = OPERATIONS[opcode].fn(list);
  
  const values = mapWithIndex((mode, i) => {
    const currentPointer = startPointer + 1 + i;
    const parameter = list[currentPointer];
    if (mode === PARAMETER_MODE.immediate || i === 2 || opcode === '03' || opcode === '04') {
      return parameter
    } else if (mode === PARAMETER_MODE.position) {
      return OPERATIONS['READ'].fn(list)(parameter)
    }
  }, modes);

  op(...values);
}

const parseInstruction = opcode => {
  const chars = toString(opcode);
  if (chars.length === 1) return ['0' + chars, '0'];

  // Beyond this an instruction has in between 2-5 chars
  // missing chars are leading zeros
  const [instructionChar1, instructionChar2, firstMode, secondMode, thirdMode] = reverse(chars);
  const temp = [instructionChar2 + instructionChar1, firstMode, secondMode, thirdMode];
  return map(char => !char ? '0' : char, temp);
}

const run = (list, input) => {  
  USER_INPUT = input;
  const copy = [...list];
  let instruction = copy[0];
  let currentIndex = 0;

  while (instruction !== 99) {
    const instructions = parseInstruction(instruction)
    performOperation(instructions, currentIndex, copy);
    currentIndex += OPERATIONS[instructions[0]].incrementPointerBy;
    instruction = OPERATIONS['READ'].fn(copy, currentIndex);
  }

  return copy;
}

export { run };