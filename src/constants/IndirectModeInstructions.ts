export const IndirectModeInstructions = [
  {
    opcode: "46",
    mnemonic: "MOV B,M",
    description:
      "Move data from memory location pointed by HL register pair to register B.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "4E",
    mnemonic: "MOV C,M",
    description:
      "Move data from memory location pointed by HL register pair to register C.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "56",
    mnemonic: "MOV D,M",
    description:
      "Move data from memory location pointed by HL register pair to register D.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "5E",
    mnemonic: "MOV E,M",
    description:
      "Move data from memory location pointed by HL register pair to register E.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "66",
    mnemonic: "MOV H,M",
    description:
      "Move data from memory location pointed by HL register pair to register H.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "6E",
    mnemonic: "MOV L,M",
    description:
      "Move data from memory location pointed by HL register pair to register L.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "7E",
    mnemonic: "MOV A,M",
    description:
      "Move data from memory location pointed by HL register pair to accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "70",
    mnemonic: "MOV M,B",
    description:
      "Move data from register B to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "71",
    mnemonic: "MOV M,C",
    description:
      "Move data from register C to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "72",
    mnemonic: "MOV M,D",
    description:
      "Move data from register D to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "73",
    mnemonic: "MOV M,E",
    description:
      "Move data from register E to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "74",
    mnemonic: "MOV M,H",
    description:
      "Move data from register H to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "75",
    mnemonic: "MOV M,L",
    description:
      "Move data from register L to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "77",
    mnemonic: "MOV M,A",
    description:
      "Move data from accumulator A to memory location pointed by HL register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "86",
    mnemonic: "ADD M",
    description:
      "Add data from memory location pointed by HL register pair to accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "8E",
    mnemonic: "ADC M",
    description:
      "Add data from memory location pointed by HL register pair with carry to accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "96",
    mnemonic: "SUB M",
    description:
      "Subtract data at memory location pointed by HL register pair from accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "9E",
    mnemonic: "SBB M",
    description:
      "Subtract data at memory location pointed by HL register pair with borrow from accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "A6",
    mnemonic: "ANA M",
    description:
      "Logical AND data at memory location pointed by HL register pair with accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "AE",
    mnemonic: "XRA M",
    description:
      "Logical XOR data at memory location pointed by HL register pair with accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "B6",
    mnemonic: "ORA M",
    description:
      "Logical OR data at memory location pointed by HL register pair with accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "BE",
    mnemonic: "CMP M",
    description:
      "Compare data at memory location pointed by HL register pair with accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "0A",
    mnemonic: "LDAX B",
    description:
      "Load accumulator indirect - Load data from memory location pointed by BC register pair to accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "1A",
    mnemonic: "LDAX D",
    description:
      "Load accumulator indirect - Load data from memory location pointed by DE register pair to accumulator A.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "02",
    mnemonic: "STAX B",
    description:
      "Store accumulator indirect - Store data from accumulator A to memory location pointed by BC register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "12",
    mnemonic: "STAX D",
    description:
      "Store accumulator indirect - Store data from accumulator A to memory location pointed by DE register pair.",
    bytes: 1,
    operands: [],
  },
  {
    opcode: "E9",
    mnemonic: "PCHL",
    description:
      "Load program counter with contents of HL register pair (jump indirect through HL).",
    bytes: 1,
    operands: [],
  },
];
