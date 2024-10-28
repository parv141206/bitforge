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
import { parseInstructions } from "@/parser/parseInstructions"; // Ensure this path is correct

const InstructionDropdown = () => {
  const {
    instructions,
    selectedInstructions,
    selectInstruction,
    updateOperandValue,
    deleteInstruction,
    generateDescription,
    operandsValues, // This now contains expected names and values
  } = useInstructions();

  useEffect(() => {
    console.log(selectedInstructions);
  }, [selectedInstructions]);

  // Function to handle assembling and parsing instructions
  const handleAssemble = () => {
    const parsedData = selectedInstructions.map(
      ({ instruction }: { instruction: Instruction }) => ({
        mnemonic: instruction.mnemonic,
        operands: instruction.operands.map((operand) => ({
          name:
            operandsValues[instruction.mnemonic]?.[operand]?.expectedName ||
            operand, // Use expected name
          value: operandsValues[instruction.mnemonic]?.[operand]?.value || "", // Get user-entered value
        })),
      })
    );

    console.log(parsedData); // Log parsed data to verify correctness
    parseInstructions(parsedData); // Call your parsing function here with parsedData
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
                            e.target.value // Update operand value as user types
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
                </span> // Display expected name and actual user-entered value here
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

      {/* Assemble button to trigger parsing */}
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
