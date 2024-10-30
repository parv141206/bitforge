import { DirectModeInstructions } from "@/constants/DirectModeInstructions";
import { ImmediateModeInstructions } from "@/constants/ImmediateModeInstructions";
import { ImpliedModeInstructions } from "@/constants/ImpliedModeInstructions";
import { IndirectModeInstructions } from "@/constants/IndirectModeInstructions";
import { RegisterModeInstructions } from "@/constants/RegisterModeInstructions";
import React, { createContext, useContext, useState } from "react";

export interface Instruction {
  opcode: string;
  mnemonic: string;
  description: string;
  bytes: number;
  operands: string[];
}

const InstructionContext = createContext<any>(null);

export const InstructionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [instructions] = useState<Instruction[]>([
    ...ImmediateModeInstructions,
    ...DirectModeInstructions,
    ...RegisterModeInstructions,
    ...IndirectModeInstructions,
    ...ImpliedModeInstructions,
  ]);

  const [selectedInstructions, setSelectedInstructions] = useState<
    { instruction: Instruction; sequenceNumber: number }[]
  >([]);

  const [operandsValues, setOperandsValues] = useState<{
    [key: string]: { [key: string]: { expectedName: string; value: string } };
  }>({});

  const selectInstruction = (mnemonic: string) => {
    const instruction = instructions.find((inst) => inst.mnemonic === mnemonic);
    if (instruction) {
      setSelectedInstructions((prev) => [
        ...prev,
        { instruction, sequenceNumber: prev.length + 1 },
      ]);

      setOperandsValues((prev) => ({
        ...prev,
        [mnemonic]: Object.fromEntries(
          instruction.operands.map((operand) => [
            operand,
            { expectedName: operand, value: "" },
          ])
        ),
      }));
    }
  };

  const updateOperandValue = (
    mnemonic: string,
    operand: string,
    value: string
  ) => {
    setOperandsValues((prev) => ({
      ...prev,
      [mnemonic]: {
        ...prev[mnemonic],
        [operand]: {
          ...prev[mnemonic][operand],
          value,
        },
      },
    }));
  };

  const deleteInstruction = (sequenceNumber: number) => {
    sequenceNumber++;
    setSelectedInstructions((prev) =>
      prev.filter((inst) => inst.sequenceNumber !== sequenceNumber)
    );
  };

  const generateDescription = () => {
    return selectedInstructions.map(({ instruction }) => {
      let description = instruction.description;
      for (const operand of instruction.operands) {
        description = description.replace(
          `{${operand}}`,
          operandsValues[instruction.mnemonic]?.[operand]?.value || ""
        );
      }
      return description;
    });
  };

  return (
    <InstructionContext.Provider
      value={{
        instructions,
        selectedInstructions,
        selectInstruction,
        updateOperandValue,
        deleteInstruction,
        generateDescription,
        operandsValues,
      }}
    >
      {children}
    </InstructionContext.Provider>
  );
};

export const useInstructions = () => useContext(InstructionContext);
