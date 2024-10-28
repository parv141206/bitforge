/**
 *
 * Alright, so now I am writing parsers for this sim.
 * This means I officially give up on social life and pledge myself to the code.
 *
 * It's pain
 *
 */

import { useRegisters } from "@/contexts/RegisterContext";
import { useFlagRegisters } from "@/contexts/FlagRegisterContext";

interface Operand {
  name: string;
  value: string;
}

interface ParsedInstruction {
  mnemonic: string;
  operands: Operand[];
}

export type { ParsedInstruction };

export function parseInstructions(parsedData: ParsedInstruction[]) {
  parsedData.forEach((instruction) => {
    parseInstruction(instruction);
  });
}

function parseInstruction(instruction: ParsedInstruction) {
  const { registers, setRegisters } = useRegisters();
  const { flags, setFlags } = useFlagRegisters();

  switch (instruction.mnemonic) {
    case "MVI A":
      setRegisters((prev) => ({
        ...prev,
        A: instruction.operands[0].value,
      }));
      break;

    case "MVI B":
      setRegisters((prev) => ({
        ...prev,
        B: instruction.operands[0].value,
      }));
      break;

    case "MVI C":
      setRegisters((prev) => ({
        ...prev,
        C: instruction.operands[0].value,
      }));
      break;

    case "MVI D":
      setRegisters((prev) => ({
        ...prev,
        D: instruction.operands[0].value,
      }));
      break;

    case "MVI E":
      setRegisters((prev) => ({
        ...prev,
        E: instruction.operands[0].value,
      }));
      break;

    case "MVI H":
      setRegisters((prev) => ({
        ...prev,
        H: instruction.operands[0].value,
      }));
      break;

    case "MVI L":
      setRegisters((prev) => ({
        ...prev,
        L: instruction.operands[0].value,
      }));
      break;

    case "LXI B":
      setRegisters((prev) => ({
        ...prev,
        B: instruction.operands[0].value.substring(0, 2),
        C: instruction.operands[0].value.substring(2, 4),
      }));
      break;

    case "LXI D":
      setRegisters((prev) => ({
        ...prev,
        D: instruction.operands[0].value.substring(0, 2),
        E: instruction.operands[0].value.substring(2, 4),
      }));
      break;

    case "LXI H":
      setRegisters((prev) => ({
        ...prev,
        H: instruction.operands[0].value.substring(0, 2),
        L: instruction.operands[0].value.substring(2, 4),
      }));
      break;

    case "LXI SP":
      setRegisters((prev) => ({
        ...prev,
        SP: instruction.operands[0].value,
      }));
      break;

    case "ADI": {
      const valueHex = instruction.operands[0].value;

      const newValue =
        (parseInt(registers.A, 16) + parseInt(valueHex, 16)) & 0xff;

      const updatedFlags = setFlagsFromAccumulator(
        newValue.toString(16).padStart(2, "0")
      );

      setRegisters((prev) => ({
        ...prev,
        A: newValue.toString(16).padStart(2, "0"),
      }));

      setFlags(updatedFlags);

      break;
    }

    case "ACI": {
      const valueHex = instruction.operands[0].value;

      const newValue =
        (parseInt(registers.A, 16) +
          parseInt(valueHex, 16) +
          parseInt(flags.C ? "1" : "0", 10)) &
        0xff;

      const updatedFlags = setFlagsFromAccumulator(
        newValue.toString(16).padStart(2, "0")
      );

      setRegisters((prev) => ({
        ...prev,
        A: newValue.toString(16).padStart(2, "0"),
      }));

      setFlags(updatedFlags);

      break;
    }

    default:
      console.warn(`Unhandled instruction mnemonic: ${instruction.mnemonic}`);
      break;
  }
  console.log("STATES:");
  console.log(registers, flags);
}
