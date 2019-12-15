import { add, multiply, toString, reverse, map, curry, zip, isNil } from 'ramda';

let USER_INPUT = 0;
let OUTPUT = 0;

const resolveValue = (list, [mode, parameter]) => {
  if (mode === PARAMETER_MODE.immediate) {
    return parameter;
  } else if (mode === PARAMETER_MODE.position) {
    return OPERATIONS['READ'].fn(list, parameter)
  }
}

const OPERATIONS = {
  '01': {
    // Add and store at address
    fn: curry((list, aMode, bMode, addressMode) => {
      const a = resolveValue(list, aMode);
      const b = resolveValue(list, bMode);
      const [_, address] = addressMode;
      list[address] = a + b;
    }),
    incrementPointerBy: 4,
  },
  '02': {
    // Multiply and store at address
    fn: curry((list, aMode, bMode, addressMode) => {
      const a = resolveValue(list, aMode);
      const b = resolveValue(list, bMode);
      const [_, address] = addressMode;
      list[address] = a * b;
    }),
    incrementPointerBy: 4,
  },
  '03': {
    // Write user input to address
    fn: curry((list, addressMode) => {
      const [_, address] = addressMode;
      list[address] = USER_INPUT;
    }),
    incrementPointerBy: 2,
  },
  '04': {
    // Read from address and outputs it
    fn: curry((list, addressMode) => {
      const [_, address] = addressMode;
      OUTPUT = list[address];
    }),
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

const performOperation = (op, modes, startPointer, list) => {
  const parameters = [1, 2, 3].map(x => {
    return list[startPointer + x];
  })
  const parametersAndModes = zip(modes, parameters);
  op(...parametersAndModes);
}

const parseInstruction = instruction => {
  let chars = toString(instruction);
  // Beyond this an instruction has in between 1-5 chars
  // missing chars are leading zeros
  while (chars.length !== 5) {
    chars = '0' + chars;
  }
  const [third, second, first, ...opcode] = chars;
  return [opcode.join(''), [first, second, third]]
}

const run = (list, input) => {  
  USER_INPUT = input;
  const memory = [...list];
  let instruction = memory[0];
  let currentPointer = 0;

  while (instruction !== 99) {
    const [opcode, modes] = parseInstruction(instruction);
    const operation = OPERATIONS[opcode];
    performOperation(operation.fn(memory), modes, currentPointer, memory);
    currentPointer += operation.incrementPointerBy;
    instruction = OPERATIONS['READ'].fn(memory, currentPointer);
  }

  return OUTPUT;
}

export { run };