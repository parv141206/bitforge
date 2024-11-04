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
  setFlags: React.Dispatch<React.SetStateAction<Flags>>,
  memory: Record<string, string>,
  setMemory: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  let newRegisters = { ...registers };
  let newFlags = { ...flags };

  parsedData.forEach((instruction) => {
    const result = parseInstruction(
      instruction,
      newRegisters,
      newFlags,
      memory
    );
    newRegisters = result.registers;
    newFlags = result.flags;

    if (result.memory) {
      setMemory(result.memory);
    }
  });

  setRegisters(newRegisters);
  setFlags(newFlags);
}

export function parseInstruction(
  instruction: ParsedInstruction,
  registers: Registers,
  flags: Flags,
  memory: Record<string, string>
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
    registers[registerKey] = instruction.operands[0].value
      .replace("h", "")
      .padStart(2, "0");
    return { registers, flags };
  }

  const movRegex = /^MOV\s+([A-L]|M)\s*,\s*([A-L]|M)$/i;
  const match = instruction.mnemonic.match(movRegex);

  if (match) {
    const destRegister = match[1];
    const srcOperand = match[2];

    if (srcOperand === "M") {
      console.log("BOSS ITS THIS ONE");
      registers[destRegister as keyof Registers] =
        memory[registers.H + registers.L] || "00";
    } else if (destRegister === "M") {
      console.log("ALRIGHT");
      console.log([destRegister as keyof Registers]);
      memory[registers.H + registers.L] =
        registers[srcOperand as keyof Registers];

      return { registers, flags, memory };
    } else {
      registers[destRegister as keyof Registers] =
        registers[srcOperand as keyof Registers];
    }

    return { registers, flags };
  }

  const addRegex = /^ADD\s+([A-L]|M)$/i;
  const addMatch = instruction.mnemonic.match(addRegex);
  let newValue: number | undefined;

  if (addMatch) {
    const srcOperand = addMatch[1];

    if (srcOperand === "M") {
      newValue =
        (parseInt(registers.A, 16) +
          parseInt(memory[registers.H + registers.L] || "00", 16)) &
        0xff;
    } else {
      newValue =
        (parseInt(registers.A, 16) +
          parseInt(registers[srcOperand as keyof Registers], 16)) &
        0xff;
    }

    const updatedFlags = setFlagsFromAccumulator(
      newValue.toString(16).padStart(2, "0")
    );
    registers.A = newValue.toString(16).padStart(2, "0");
    return { registers, flags: updatedFlags };
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
      newValue =
        (parseInt(registers.A, 16) + parseInt(valueHex.replace("h", ""), 16)) &
        0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "SUI": {
      const valueHex = instruction.operands[0].value;
      newValue =
        (parseInt(registers.A, 16) - parseInt(valueHex.replace("h", ""), 16)) &
        0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "SBI": {
      const valueHex = instruction.operands[0].value;
      const carry = flags.C ? 1 : 0;
      newValue =
        (parseInt(registers.A, 16) -
          parseInt(valueHex.replace("h", ""), 16) -
          carry) &
        0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "ANI": {
      const valueHex = instruction.operands[0].value;
      newValue =
        parseInt(registers.A, 16) & parseInt(valueHex.replace("h", ""), 16);
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "XRI": {
      const valueHex = instruction.operands[0].value;
      newValue =
        parseInt(registers.A, 16) ^
        (parseInt(valueHex.replace("h", ""), 16) & 0xff);
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "ORI": {
      const valueHex = instruction.operands[0].value;
      newValue =
        parseInt(registers.A, 16) |
        (parseInt(valueHex.replace("h", ""), 16) & 0xff);
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    case "CPI": {
      const valueHex = instruction.operands[0].value;
      newValue =
        (parseInt(registers.A, 16) - parseInt(valueHex.replace("h", ""), 16)) &
        0xff;
      registers.A = newValue.toString(16).padStart(2, "0");
      flags = setFlagsFromAccumulator(registers.A);
      break;
    }

    // DIRECT ADDRESSING MODE INSTRUCTIONS

    case "STA": {
      const addressHex = instruction.operands[0].value;
      const address = addressHex.replace("h", "");

      if (memory.hasOwnProperty(address)) {
        memory[address] = registers.A;
        console.log(
          `Stored value ${registers.A} | ${parseInt(
            registers.A,
            16
          )} at address ${address}`
        );
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }
    case "LDA": {
      const addressHex = instruction.operands[0].value;
      const address = addressHex.replace("h", "");
      if (memory.hasOwnProperty(address)) {
        registers.A = memory[address];
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }
    case "SHLD": {
      const addressHex = instruction.operands[0].value;
      const address = addressHex.replace("h", "");
      if (memory.hasOwnProperty(address)) {
        memory[address] = registers.H;
        memory[address + 1] = registers.L;
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }
    case "LHLD": {
      const addressHex = instruction.operands[0].value;
      const address = addressHex.replace("h", "");
      if (memory.hasOwnProperty(address)) {
        registers.H = memory[address];
        registers.L = memory[address + 1];
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    // JUMP AND CALL ARE PENDING

    // INDIRECT ADDRESSING MODE INSTRUCTIONS
    // ALL MOV handled above bruv
    case "ADD M": {
      const value = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(value)) {
        const newValue = (
          parseInt(registers.A, 16) + parseInt(memory[value], 16)
        ).toString(16);
        registers.A = newValue.padStart(2, "0");
      } else {
        console.warn(`Memory access out of bounds at address ${value}`);
      }
      break;
    }

    case "ADC M": {
      const value = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(value)) {
        const newValue = (
          parseInt(registers.A, 16) +
          parseInt(memory[value], 16) +
          (flags.C ? 1 : 0)
        ).toString(16);
        registers.A = newValue.padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${value}`);
      }
      break;
    }
    case "SUB M": {
      const value = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(value)) {
        const newValue = (
          parseInt(registers.A, 16) - parseInt(memory[value], 16)
        ).toString(16);
        registers.A = newValue.padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${value}`);
      }
      break;
    }

    case "SBB M": {
      const value = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(value)) {
        const newValue = (
          parseInt(registers.A, 16) -
          parseInt(memory[value], 16) -
          (flags.C ? 1 : 0)
        )
          .toString(16)
          .padStart(2, "0");
        registers.A = newValue;
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${value}`);
      }
      break;
    }
    case "ANA M": {
      const address = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(address)) {
        const newValue = (
          parseInt(registers.A, 16) & parseInt(memory[address], 16)
        ).toString(16);
        registers.A = newValue.padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    case "XRA M": {
      const address = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(address)) {
        const newValue = (
          parseInt(registers.A, 16) ^ parseInt(memory[address], 16)
        ).toString(16);
        registers.A = newValue.padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    case "ORA M": {
      const address = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(address)) {
        const newValue = (
          parseInt(registers.A, 16) | parseInt(memory[address], 16)
        ).toString(16);
        registers.A = newValue.padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
    }
    case "CMP M": {
      const address = parseInt(registers.H + registers.L, 16);
      if (memory.hasOwnProperty(address)) {
        flags = setFlagsFromAccumulator(registers.A);
        const comparisonValue = parseInt(memory[address], 16);
        const result = parseInt(registers.A, 16) - comparisonValue;
        flags.C = result < 0;
        flags.S = (result & 0x80) === 0x80;
        flags.Z = result === 0;
        flags.P = (result & 0x01) === 0;
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    case "LDAX B": {
      const address = parseInt(registers.B + registers.C, 16);
      if (memory.hasOwnProperty(address)) {
        registers.A = memory[address].toString().padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    case "LDAX D": {
      const address = parseInt(registers.D + registers.E, 16);
      if (memory.hasOwnProperty(address)) {
        registers.A = memory[address].toString().padStart(2, "0");
        flags = setFlagsFromAccumulator(registers.A);
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }
    case "STAX B": {
      const address = parseInt(registers.B + registers.C, 16);
      if (address >= 0 && address < 65536) {
        memory[address] = registers.A;
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    case "STAX D": {
      const address = parseInt(registers.D + registers.E, 16);
      if (address >= 0 && address < 65536) {
        memory[address] = registers.A;
      } else {
        console.warn(`Memory access out of bounds at address ${address}`);
      }
      break;
    }

    // IMPLIED ADDRESSING MODE INSTRUCTIONS :
    case "RLC": {
      const msb = (parseInt(registers.A, 16) & 0x80) >> 7;
      registers.A = ((parseInt(registers.A, 16) << 1) | msb)
        .toString(16)
        .padStart(2, "0");
      flags.C = msb === 1;
      break;
    }

    case "RRC": {
      const lsb = parseInt(registers.A, 16) & 0x01;
      registers.A = ((parseInt(registers.A, 16) >> 1) | (lsb << 7))
        .toString(16)
        .padStart(2, "0");
      flags.C = lsb === 1;
      break;
    }

    case "RAL": {
      const carry = flags.C ? 1 : 0;
      const msb = (parseInt(registers.A, 16) & 0x80) >> 7;
      registers.A = ((parseInt(registers.A, 16) << 1) | carry)
        .toString(16)
        .padStart(2, "0");
      flags.C = msb === 1;
      break;
    }

    case "RAR": {
      const carry = flags.C ? 0x80 : 0;
      const lsb = parseInt(registers.A, 16) & 0x01;
      registers.A = ((parseInt(registers.A, 16) >> 1) | carry)
        .toString(16)
        .padStart(2, "0");
      flags.C = lsb === 1;
      break;
    }

    case "CMA": {
      registers.A = (~parseInt(registers.A, 16)).toString(16).padStart(2, "0");
      break;
    }

    case "STC": {
      flags.C = true;
      break;
    }

    case "CMC": {
      flags.C = !flags.C;
      break;
    }

    case "DAA": {
      let a = parseInt(registers.A, 16);
      if ((a & 0x0f) > 9 || flags.AC) {
        a += 6;
        flags.AC = true;
      } else {
        flags.AC = false;
      }
      if (a >> 4 > 9 || flags.C) {
        a += 0x60;
        flags.C = true;
      } else {
        flags.C = false;
      }
      registers.A = (a & 0xff).toString(16).padStart(2, "0");
      break;
    }

    case "HLT": {
      break;
    }

    case "NOP": {
      // Do nothing :)
      break;
    }

    case "SPHL": {
      registers.SP = registers.H + registers.L;
      break;
    }

    case "XTHL": {
      const tempL = registers.L;
      const tempH = registers.H;
      registers.L = memory[registers.SP];
      registers.H = memory[(parseInt(registers.SP, 16) + 1).toString(16)];
      memory[registers.SP] = tempL;
      memory[(parseInt(registers.SP, 16) + 1).toString(16)] = tempH;
      break;
    }

    case "XCHG": {
      const tempD = registers.D;
      const tempE = registers.E;
      registers.D = registers.H;
      registers.E = registers.L;
      registers.H = tempD;
      registers.L = tempE;
      break;
    }

    default:
      console.warn(`Unhandled instruction mnemonic: ${instruction.mnemonic}`);
      break;
  }

  return { registers, flags, memory };
}
