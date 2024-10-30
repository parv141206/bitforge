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
import { Registers, useRegisters } from "@/contexts/RegisterContext";
import { Flags, useFlagRegisters } from "@/contexts/FlagRegisterContext";
import { useMemory } from "@/contexts/MemoryContext";
import { TiDelete } from "react-icons/ti";

const InstructionDropdown = ({
  instructions,
  selectedInstructions,
  selectInstruction,
  updateOperandValue,
  deleteInstruction,
  operandsValues,
  registers,
  setRegisters,
  flags,
  setFlags,
  memory,
  setMemory,
  handleAssemble,
  ...rest
}: {
  instructions: Instruction[];
  selectedInstructions: { instruction: Instruction; sequenceNumber: number }[];
  selectInstruction: (mnemonic: string) => void;
  updateOperandValue: (
    mnemonic: string,
    operand: string,
    value: string
  ) => void;
  deleteInstruction: (sequenceNumber: number) => void;
  operandsValues: {
    [key: string]: { [key: string]: { expectedName: string; value: string } };
  };
  registers: Registers;
  setRegisters: React.Dispatch<React.SetStateAction<Registers>>;
  flags: Flags;
  setFlags: React.Dispatch<React.SetStateAction<Flags>>;
  memory: Record<string, string>;
  setMemory: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleAssemble: () => void;
}) => {
  const [filteredInstructions, setFilteredInstructions] =
    React.useState(instructions);

  useEffect(() => {
    console.log("Selected Instructions:", selectedInstructions);
  }, [selectedInstructions]);

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 text-sm bg-black border border-white/15 rounded hover:bg-white hover:text-black">
          Add Instruction
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-80 overflow-y-scroll">
          <DropdownMenuLabel>Select Instruction</DropdownMenuLabel>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search Instructions..."
              onChange={(e) => {
                const searchText = e.target.value.toLowerCase();
                const filteredInstructions = instructions.filter(
                  (instruction: Instruction) =>
                    instruction.mnemonic.toLowerCase().includes(searchText)
                );
                setFilteredInstructions(filteredInstructions);
              }}
              className="w-full p-1 border border-gray-300 rounded"
            />
          </div>
          <DropdownMenuSeparator />
          {filteredInstructions.map(
            (instruction: Instruction, index: number) => (
              <DropdownMenuItem
                key={index}
                onClick={() => selectInstruction(instruction.mnemonic)}
              >
                {instruction.mnemonic}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedInstructions.length > 0 && (
        <div className="p-3 overflow-y-scroll h-">
          {selectedInstructions.map(
            ({ instruction }: { instruction: Instruction }, index: number) => (
              <div
                key={`${instruction.mnemonic}-${index}`}
                className="flex gap-3 items-center justify-start"
              >
                <div className="border-s-2 border-blue-300 px-3">
                  {" "}
                  {index + 1}
                </div>
                <h4>{instruction.mnemonic}</h4>
                <ul className="flex flex-col">
                  {instruction.operands.map((operand: string, opIndex) => (
                    <li key={opIndex} className="flex items-center gap-2">
                      <input
                        placeholder={
                          (
                            operandsValues[instruction.mnemonic]?.[operand]
                              ?.expectedName || operand
                          )
                            .toString()
                            .charAt(0)
                            .toUpperCase() +
                          (
                            operandsValues[instruction.mnemonic]?.[operand]
                              ?.expectedName || operand
                          )
                            .toString()
                            .slice(1) +
                          " (Hex)"
                        }
                        type="text"
                        className="border w-32 border-gray-300 rounded px-2 py-1 text-white"
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
                <button
                  onClick={() => deleteInstruction(index)}
                  className="text-red-500 text-xl hover:text-red-700"
                >
                  <TiDelete />
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* <button
        onClick={handleAssemble}
        className="bg-black text-sm text-white py-2 px-4 rounded border border-white/15 hover:bg-white hover:text-black"
      >
        Assemble
      </button> */}
    </div>
  );
};

export default InstructionDropdown;
