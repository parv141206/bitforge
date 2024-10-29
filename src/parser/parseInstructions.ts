import { Registers, useRegisters } from "@/contexts/RegisterContext";
import { Flags, useFlagRegisters } from "@/contexts/FlagRegisterContext";
import { setFlagsFromAccumulator } from "./setFlagsFromAccumulator";

interface Operand {
  name: string;
  value: string;
}

interface ParsedInstruction {
  mnemonic: string;
  operands: Operand[];
}

export type { ParsedInstruction };

export function parseInstructions(
  parsedData: ParsedInstruction[],
  registers: Registers,
  setRegisters: React.Dispatch<React.SetStateAction<Registers>>,
  flags: Flags,
  setFlags: React.Dispatch<React.SetStateAction<Flags>>
) {
  let newRegisters = { ...registers };
  let newFlags = { ...flags };

  parsedData.forEach((instruction) => {
    const result = parseInstruction(instruction, newRegisters, newFlags);
    newRegisters = result.registers;
    newFlags = result.flags;
  });

  setRegisters(newRegisters);
  setFlags(newFlags);
}

function parseInstruction(
  instruction: ParsedInstruction,
  registers: Registers,
  flags: Flags
) {
  const mviMapping: Record<string, keyof Registers> = {
    "MVI A": "A",
    "MVI B": "B",
    "MVI C": "C",
    "MVI D": "D",
    "MVI E": "E",
    "MVI H": "H",
    "MVI L": "L",
  };

  if (mviMapping[instruction.mnemonic]) {
    const registerKey = mviMapping[instruction.mnemonic];
    registers[registerKey] = instruction.operands[0].value;
    return { registers, flags };
  }

  switch (instruction.mnemonic) {
    case "LXI B":
      registers.B = instruction.operands[0].value.substring(0, 2);
      registers.C = instruction.operands[0].value.substring(2, 4);
      break;

    case "LXI D":
      registers.D = instruction.operands[0].value.substring(0, 2);
      registers.E = instruction.operands[0].value.substring(2, 4);
      break;

    case "LXI H":
      registers.H = instruction.operands[0].value.substring(0, 2);
      registers.L = instruction.operands[0].value.substring(2, 4);
      break;

    case "LXI SP":
      registers.SP = instruction.operands[0].value;
      break;

    case "ADI": {
      const valueHex = instruction.operands[0].value;
      const newValue =
        (parseInt(registers.A, 16) + parseInt(valueHex, 16)) & 0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "ACI": {
      const valueHex = instruction.operands[0].value;
      const carry = flags.C ? 1 : 0;
      const newValue =
        (parseInt(registers.A, 16) + parseInt(valueHex, 16) + carry) & 0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "SUI": {
      const valueHex = instruction.operands[0].value;
      const newValue =
        (parseInt(registers.A, 16) - parseInt(valueHex, 16)) & 0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "SBI": {
      const valueHex = instruction.operands[0].value;
      const carry = flags.C ? 1 : 0;
      const newValue =
        (parseInt(registers.A, 16) - parseInt(valueHex, 16) - carry) & 0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "ANI": {
      const valueHex = instruction.operands[0].value;
      const newValue =
        parseInt(registers.A, 16) & parseInt(valueHex, 16) & 0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    default:
      console.warn(`Unhandled instruction mnemonic: ${instruction.mnemonic}`);
      break;
  }

  return { registers, flags };
}
