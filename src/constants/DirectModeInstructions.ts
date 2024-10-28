export const DirectModeInstructions = [
  {
    opcode: "32",
    mnemonic: "STA",
    description:
      "Store accumulator direct - Store content of accumulator at memory location {address}.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "3A",
    mnemonic: "LDA",
    description:
      "Load accumulator direct - Load content from memory location {address} to accumulator.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "22",
    mnemonic: "SHLD",
    description:
      "Store H-L pair direct - Store content of HL register pair at memory location {address} and {address}+1.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "2A",
    mnemonic: "LHLD",
    description:
      "Load H-L pair direct - Load content from memory location {address} and {address}+1 to HL register pair.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "C3",
    mnemonic: "JMP",
    description: "Jump unconditionally to memory location {address}.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "CD",
    mnemonic: "CALL",
    description: "Call subroutine at memory location {address}.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "C2",
    mnemonic: "JNZ",
    description: "Jump to memory location {address} if Zero flag is 0.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "CA",
    mnemonic: "JZ",
    description: "Jump to memory location {address} if Zero flag is 1.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "D2",
    mnemonic: "JNC",
    description: "Jump to memory location {address} if Carry flag is 0.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "DA",
    mnemonic: "JC",
    description: "Jump to memory location {address} if Carry flag is 1.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "E2",
    mnemonic: "JPO",
    description:
      "Jump to memory location {address} if Parity flag is 0 (Parity Odd).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "EA",
    mnemonic: "JPE",
    description:
      "Jump to memory location {address} if Parity flag is 1 (Parity Even).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "F2",
    mnemonic: "JP",
    description:
      "Jump to memory location {address} if Sign flag is 0 (Positive).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "FA",
    mnemonic: "JM",
    description: "Jump to memory location {address} if Sign flag is 1 (Minus).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "C4",
    mnemonic: "CNZ",
    description:
      "Call subroutine at memory location {address} if Zero flag is 0.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "CC",
    mnemonic: "CZ",
    description:
      "Call subroutine at memory location {address} if Zero flag is 1.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "D4",
    mnemonic: "CNC",
    description:
      "Call subroutine at memory location {address} if Carry flag is 0.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "DC",
    mnemonic: "CC",
    description:
      "Call subroutine at memory location {address} if Carry flag is 1.",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "E4",
    mnemonic: "CPO",
    description:
      "Call subroutine at memory location {address} if Parity flag is 0 (Parity Odd).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "EC",
    mnemonic: "CPE",
    description:
      "Call subroutine at memory location {address} if Parity flag is 1 (Parity Even).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "F4",
    mnemonic: "CP",
    description:
      "Call subroutine at memory location {address} if Sign flag is 0 (Positive).",
    bytes: 3,
    operands: ["address"],
  },
  {
    opcode: "FC",
    mnemonic: "CM",
    description:
      "Call subroutine at memory location {address} if Sign flag is 1 (Minus).",
    bytes: 3,
    operands: ["address"],
  },
];
