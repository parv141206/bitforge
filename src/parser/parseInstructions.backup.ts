// /**
//  *
//  * Alright, so now I am writing parsers for this sim.
//  * This means I officially give up on social life and pledge myself to the code.
//  *
//  * It's pain
//  *
//  */

// import { Registers, useRegisters } from "@/contexts/RegisterContext";
// import { Flags, useFlagRegisters } from "@/contexts/FlagRegisterContext";
// import { setFlagsFromAccumulator } from "./setFlagsFromAccumulator";

// interface Operand {
//   name: string;
//   value: string;
// }

// interface ParsedInstruction {
//   mnemonic: string;
//   operands: Operand[];
// }

// export type { ParsedInstruction };

// export function parseInstructions(
//   parsedData: ParsedInstruction[],
//   registers: Registers,
//   setRegisters: React.Dispatch<React.SetStateAction<Registers>>,
//   flags: Flags,
//   setFlags: React.Dispatch<React.SetStateAction<Flags>>
// ) {
//   parsedData.forEach((instruction) => {
//     parseInstruction(instruction, registers, setRegisters, flags, setFlags);
//   });
// }

// function parseInstruction(
//   instruction: ParsedInstruction,
//   registers: Registers,
//   setRegisters: React.Dispatch<React.SetStateAction<Registers>>,
//   flags: Flags,
//   setFlags: React.Dispatch<React.SetStateAction<Flags>>
// ) {
//   const mviMapping: Record<string, keyof Registers> = {
//     "MVI A": "A",
//     "MVI B": "B",
//     "MVI C": "C",
//     "MVI D": "D",
//     "MVI E": "E",
//     "MVI H": "H",
//     "MVI L": "L",
//   };
//   if (mviMapping[instruction.mnemonic]) {
//     const registerKey = mviMapping[instruction.mnemonic];
//     setRegisters((prev) => ({
//       ...prev,
//       [registerKey]: instruction.operands[0].value,
//     }));
//     return;
//   }
//   switch (instruction.mnemonic) {
//     case "LXI B":
//       setRegisters((prev) => ({
//         ...prev,
//         B: instruction.operands[0].value.substring(0, 2),
//         C: instruction.operands[0].value.substring(2, 4),
//       }));
//       break;

//     case "LXI D":
//       setRegisters((prev) => ({
//         ...prev,
//         D: instruction.operands[0].value.substring(0, 2),
//         E: instruction.operands[0].value.substring(2, 4),
//       }));
//       break;

//     case "LXI H":
//       setRegisters((prev) => ({
//         ...prev,
//         H: instruction.operands[0].value.substring(0, 2),
//         L: instruction.operands[0].value.substring(2, 4),
//       }));
//       break;

//     case "LXI SP":
//       setRegisters((prev) => ({
//         ...prev,
//         SP: instruction.operands[0].value,
//       }));
//       break;

//     case "ADI": {
//       const valueHex = instruction.operands[0].value;

//       const newValue =
//         (parseInt(registers.A, 16) + parseInt(valueHex, 16)) & 0xff;

//       const updatedFlags = setFlagsFromAccumulator(
//         newValue.toString(16).padStart(2, "0")
//       );

//       setRegisters((prev) => ({
//         ...prev,
//         A: newValue.toString(16).padStart(2, "0"),
//       }));

//       setFlags(updatedFlags);

//       break;
//     }

//     case "ACI": {
//       const valueHex = instruction.operands[0].value;

//       const newValue =
//         (parseInt(registers.A, 16) +
//           parseInt(valueHex, 16) +
//           parseInt(flags.C ? "1" : "0", 10)) &
//         0xff;

//       const updatedFlags = setFlagsFromAccumulator(
//         newValue.toString(16).padStart(2, "0")
//       );

//       setRegisters((prev) => ({
//         ...prev,
//         A: newValue.toString(16).padStart(2, "0"),
//       }));

//       setFlags(updatedFlags);

//       break;
//     }
//     case "SUI": {
//       const valueHex = instruction.operands[0].value;

//       const newValue =
//         (parseInt(registers.A, 16) - parseInt(valueHex, 16)) & 0xff;

//       const updatedFlags = setFlagsFromAccumulator(
//         newValue.toString(16).padStart(2, "0")
//       );

//       setRegisters((prev) => ({
//         ...prev,
//         A: newValue.toString(16).padStart(2, "0"),
//       }));

//       setFlags(updatedFlags);

//       break;
//     }
//     case "SBI": {
//       const valueHex = instruction.operands[0].value;

//       const newValue =
//         (parseInt(registers.A, 16) -
//           parseInt(valueHex, 16) -
//           parseInt(flags.C ? "1" : "0", 10)) &
//         0xff;

//       const updatedFlags = setFlagsFromAccumulator(
//         newValue.toString(16).padStart(2, "0")
//       );

//       setRegisters((prev) => ({
//         ...prev,
//         A: newValue.toString(16).padStart(2, "0"),
//       }));

//       setFlags(updatedFlags);

//       break;
//     }
//     case "ANI": {
//       const valueHex = instruction.operands[0].value;

//       const newValue = (
//         parseInt(registers.A, 16) & parseInt(valueHex, 16)
//       ).toString(16);

//       setRegisters((prev) => ({
//         ...prev,
//         A: newValue.padStart(2, "0"),
//       }));

//       break;
//     }
//     default:
//       console.warn(`Unhandled instruction mnemonic: ${instruction.mnemonic}`);
//       break;
//   }
//   console.log("STATES:");
//   console.log(registers, flags);
// }
