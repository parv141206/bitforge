import { Instruction, useInstructions } from "@/hooks/useInstruction";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { parseInstructions } from "@/parser/parseInstructions";
import { useRegisters } from "@/contexts/RegisterContext";
import { useFlagRegisters } from "@/contexts/FlagRegisterContext";

const InstructionDropdown = () => {
  const {
    instructions,
    selectedInstructions,
    selectInstruction,
    updateOperandValue,
    deleteInstruction,
    generateDescription,
    operandsValues,
  } = useInstructions();
  const { registers, setRegisters } = useRegisters();
  const { flags, setFlags } = useFlagRegisters();

  useEffect(() => {
    console.log("Selected Instructions:", selectedInstructions);
  }, [selectedInstructions]);

  const handleAssemble = () => {
    const parsedData = selectedInstructions.map(
      ({ instruction }: { instruction: Instruction }) => ({
        mnemonic: instruction.mnemonic,
        operands: instruction.operands.map((operand) => ({
          name:
            operandsValues[instruction.mnemonic]?.[operand]?.expectedName ||
            operand,
          value: operandsValues[instruction.mnemonic]?.[operand]?.value || "",
        })),
      })
    );

    console.log("Parsed Data:", parsedData);

    parseInstructions(parsedData, registers, setRegisters, flags, setFlags);
    console.log("Registers after parseInstructions:", registers);
    console.log("Flags after parseInstructions:", flags);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Select an instruction</DropdownMenuTrigger>
        <DropdownMenuContent className="h-96 overflow-y-scroll">
          <DropdownMenuLabel>Instructions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {instructions.map((instruction: Instruction) => (
            <DropdownMenuItem
              key={instruction.opcode}
              onClick={() => selectInstruction(instruction.mnemonic)}
            >
              {instruction.mnemonic}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedInstructions.length > 0 && (
        <div>
          <h3>Operands:</h3>
          {selectedInstructions.map(
            ({ instruction }: { instruction: Instruction }) => (
              <div key={instruction.opcode} className="flex gap-3">
                <h4>{instruction.mnemonic}</h4>
                <ul>
                  {instruction.operands.map((operand: string) => (
                    <li key={operand}>
                      <input
                        placeholder={
                          operandsValues[instruction.mnemonic]?.[operand]
                            ?.expectedName || operand
                        }
                        type="text"
                        onChange={(e) =>
                          updateOperandValue(
                            instruction.mnemonic,
                            operand,
                            e.target.value
                          )
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      )}

      <hr />

      <h3>Added Instructions:</h3>
      <ul>
        {selectedInstructions.map(
          ({
            instruction,
            sequenceNumber,
          }: {
            instruction: Instruction;
            sequenceNumber: number;
          }) => (
            <li key={sequenceNumber}>
              {sequenceNumber}. {instruction.mnemonic} - Operands:{" "}
              {instruction.operands.map((operand) => (
                <span key={operand}>
                  {
                    operandsValues[instruction.mnemonic]?.[operand]
                      ?.expectedName
                  }
                  :
                  {operandsValues[instruction.mnemonic]?.[operand]?.value || ""}{" "}
                </span>
              ))}
              <button
                onClick={() => deleteInstruction(sequenceNumber)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>

      <h3>Description:</h3>
      <p>{generateDescription().join(", ")}</p>

      <button
        onClick={handleAssemble}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Assemble
      </button>
    </div>
  );
};

export default InstructionDropdown;
