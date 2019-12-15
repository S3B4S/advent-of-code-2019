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
    fn: curry((list, pointer, aMode, bMode, addressMode) => {
      const a = resolveValue(list, aMode);
      const b = resolveValue(list, bMode);
      const [_, address] = addressMode;
      list[address] = a + b;
      return pointer + 4;
    })
  },
  '02': {
    // Multiply and store at address
    fn: curry((list, pointer, aMode, bMode, addressMode) => {
      const a = resolveValue(list, aMode);
      const b = resolveValue(list, bMode);
      const [_, address] = addressMode;
      list[address] = a * b;
      return pointer + 4;
    })
  },
  '03': {
    // Write user input to address
    fn: curry((list, pointer, addressMode) => {
      const [_, address] = addressMode;
      list[address] = USER_INPUT;
      return pointer + 2;
    })
  },
  '04': {
    // Read from address and outputs it
    fn: curry((list, pointer, addressMode) => {
      const [_, address] = addressMode;
      OUTPUT = list[address];
      return pointer + 2;
    })
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

const performOperation = (op, modes, { currentPointer }, list) => {
  const parameters = [1, 2, 3].map(x => {
    return list[currentPointer + x];
  })
  const parametersAndModes = zip(modes, parameters);
  return op(...parametersAndModes);
}

const parseInstruction = ({ instruction }) => {
  let chars = toString(instruction);
  // An instruction has in between 1-5 chars
  // missing chars are leading zeros and should be filled up to 5 chars
  while (chars.length !== 5) {
    chars = '0' + chars;
  }
  const [third, second, first, ...opcode] = chars;
  return [opcode.join(''), [first, second, third]]
}

const run = (list, input) => {  
  USER_INPUT = input;
  const memory = [...list];
  let state = {
    instruction: memory[0],
    currentPointer: 0,
  }

  while (state.instruction !== 99) {
    const [opcode, modes] = parseInstruction(state);
    const operation = OPERATIONS[opcode];
    const newPointer = performOperation(operation.fn(memory, state.currentPointer), modes, state, memory);
    state = {
      currentPointer: newPointer,
      instruction: OPERATIONS['READ'].fn(memory, newPointer),
    }
  }

  return OUTPUT;
}

export { run };