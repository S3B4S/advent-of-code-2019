import { toString, map, curry, zip, compose, flip } from 'ramda';

let INPUT = [];
let OUTPUT = 0;

class OPERATION_PARAMETER {
  constructor(value, mode) {
    this.value = value;
    this.mode = mode;
  }

  resolveValue(memory) {
    if (this.mode === PARAMETER_MODE.immediate) {
      return this.value;
    } else if (this.mode === PARAMETER_MODE.position) {
      return OPERATIONS['READ'](memory, this.value)
    }
  }
}

const OperationParameter = ([value, mode]) => new OPERATION_PARAMETER(value, mode);

const PARAMETER_MODE = {
  position: '0', // parameter interpreted as position where to retrieve value
  immediate: '1', // parameter is the value itself
}

const OPERATIONS = {
  // Add and store at address
  '01': curry((memory, pointer, opA, opB, opAdress) => {
    const a = opA.resolveValue(memory);
    const b = opB.resolveValue(memory);
    const address = opAdress.value;
    memory[address] = a + b;
    return pointer + 4;
  }),

  // Multiply and store at address
  '02': curry((memory, pointer, opA, opB, opAdress) => {
    const a = opA.resolveValue(memory);
    const b = opB.resolveValue(memory);
    const address = opAdress.value;
    memory[address] = a * b;
    return pointer + 4;
  }),

  // Write user input to address
  '03': curry((memory, pointer, opAdress) => {
    const address = opAdress.value;
    memory[address] = INPUT.pop();
    return pointer + 2;
  }),

  // Read from address and outputs it
  '04': curry((memory, pointer, opAdress) => {
    const address = opAdress.value;
    OUTPUT = memory[address];
    return pointer + 2;
  }),

  // If first parameter is non-zero, set the instruction pointer to second parameter
  '05': curry((memory, pointer, opNumber, opPointer) => {
    const number = opNumber.resolveValue(memory);
    const newPointer = opPointer.resolveValue(memory);
    return number !== 0 ? newPointer : pointer + 3;
  }),

  // If first parameter is zero, set the instruction pointer to second parameter
  '06': curry((memory, pointer, opNumber, opPointer) => {
    const number = opNumber.resolveValue(memory);
    const newPointer = opPointer.resolveValue(memory);
    return number === 0 ? newPointer : pointer + 3;
  }),

  // If first parameter less than second parameter, store 1 in position given by third parameter, else 0.
  '07': curry((memory, pointer, opA, opB, opAdress) => {
    const a = opA.resolveValue(memory);
    const b = opB.resolveValue(memory);
    const address = opAdress.value;
    memory[address] = a < b ? 1 : 0;
    return pointer + 4;
  }),

  // If first parameter equal to second parameter, store 1 in position given by third parameter, else 0.
  '08': curry((memory, pointer, opA, opB, opAdress) => {
    const a = opA.resolveValue(memory);
    const b = opB.resolveValue(memory);
    const address = opAdress.value;
    memory[address] = a === b ? 1 : 0;
    return pointer + 4;
  }),

  // Return position at address
  'READ': curry((memory, address) => memory[address]),
}

const performOperation = (op, modes, { currentPointer }, memory) => {
  const operationParameters = compose(
    map(OperationParameter),
    flip(zip)(modes),
    map(x => memory[currentPointer + x])
  )([1, 2, 3])
  return op(...operationParameters);
}

const parseInstruction = ({ instruction }) => {
  let chars = toString(instruction);
  // An instruction has in between 5 chars
  // missing chars are leading zeros and should be filled up to 5 chars
  while (chars.length !== 5) {
    chars = '0' + chars;
  }
  const [third, second, first, ...opcode] = chars;
  return [opcode.join(''), [first, second, third]]
}

/**
 * Main entry to run the Intcode program.
 * @param {[Int]} freshMemory Memory supplied to the program to be modified, a copy is made so the original isn't mutated.
 * @param {[Int]} input This is treated as a queue, so first input to be called should be placed last.
 */
const run = (freshMemory, input) => {
  INPUT = input;
  const memory = [...freshMemory];
  let state = {
    instruction: memory[0],
    currentPointer: 0,
  }

  while (state.instruction !== 99) {
    const [opcode, modes] = parseInstruction(state);
    const newPointer = performOperation(OPERATIONS[opcode](memory, state.currentPointer), modes, state, memory);
    state = {
      currentPointer: newPointer,
      instruction: OPERATIONS['READ'](memory, newPointer),
    }
  }

  return OUTPUT;
}

const add = input => { INPUT.unshift(input) };

export default { run, add };