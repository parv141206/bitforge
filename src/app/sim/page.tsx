"use client";
import InstructionDropdown from "@/components/InstructionDropdown";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Instruction, useInstructions } from "@/hooks/useInstruction";
import {
  parseInstruction,
  parseInstructions,
} from "@/parser/parseInstructions";
import { useRegisters } from "@/contexts/RegisterContext";
import { useFlagRegisters } from "@/contexts/FlagRegisterContext";
import { Memory, useMemory } from "@/contexts/MemoryContext";
import { TiDelete } from "react-icons/ti";
import { SiZcool } from "react-icons/si";
import gsap from "gsap";
import { FixedSizeList } from "react-window";
import { TableVirtuoso } from "react-virtuoso";
import { GiProcessor } from "react-icons/gi";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ThemeContext, useTheme } from "@/contexts/ThemeContext";
export default function Sim() {
  const {
    instructions,
    selectedInstructions,
    selectInstruction,
    updateOperandValue,
    deleteInstruction,
    operandsValues,
  } = useInstructions();
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [filteredInstructions, setFilteredInstructions] =
    React.useState(instructions);
  const { registers, setRegisters } = useRegisters();
  const { flags, setFlags } = useFlagRegisters();
  const { memory, setMemory } = useMemory();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    console.log("Selected Instructions:", selectedInstructions);
  }, [selectedInstructions]);

  // GSAP ANIMATIONS
  useEffect(() => {
    // Create a new timeline
    let tl = gsap.timeline();

    tl.fromTo(
      ".program",
      { opacity: 0, x: -1000 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power1.inOut" },
    );

    tl.fromTo(
      ".memory",
      { opacity: 0, y: -1000 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power1.inOut" },
      "<",
    );

    tl.fromTo(
      ".register",
      { opacity: 0, x: 1000 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power1.inOut" },
      "<",
    );

    tl.fromTo(
      ".nextInst",
      { opacity: 0, x: -1000 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power1.inOut" },
      "<",
    );

    tl.fromTo(
      ".exec",
      { opacity: 0, x: -1000 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power1.inOut" },
      "<",
    );

    tl.fromTo(
      ".currentInst",
      { opacity: 0, scale: 0.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power1.inOut" },
      "<",
    );

    tl.fromTo(
      ".flag",
      { opacity: 0, x: -1000 },
      { opacity: 1, x: 0, duration: 1, ease: "power1.inOut" },
    );

    tl.fromTo(
      ".about",
      { opacity: 0, x: 1000 },
      { opacity: 1, x: 0, duration: 1, ease: "power1.inOut" },
    );

    tl.fromTo(
      ".tbl",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power1.inOut" },
    );
  }, []);
  const resetRegisters = () => {
    localStorage.removeItem("registers");
    setRegisters({
      A: "00",
      B: "00",
      C: "00",
      D: "00",
      E: "00",
      H: "00",
      L: "00",
      SP: "0000",
      PC: "0000",
    });
  };
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
      }),
    );

    parseInstructions(
      parsedData,
      registers,
      setRegisters,
      flags,
      setFlags,
      memory,
      setMemory,
    );
  };
  const nextInstruction = () => {
    let newRegisters = { ...registers };
    let newFlags = { ...flags };
    const parsedData = selectedInstructions.map(
      ({ instruction }: { instruction: Instruction }) => ({
        mnemonic: instruction.mnemonic,
        operands: instruction.operands.map((operand) => ({
          name:
            operandsValues[instruction.mnemonic]?.[operand]?.expectedName ||
            operand,
          value: operandsValues[instruction.mnemonic]?.[operand]?.value || "",
        })),
      }),
    );
    const result = parseInstruction(
      parsedData[currentInstructionIndex],
      registers,
      flags,
      memory,
    );
    newRegisters = result.registers;
    newFlags = result.flags;

    if (result.memory) {
      setMemory(result.memory);
    }
    setCurrentInstructionIndex((prevIndex) => prevIndex + 1);
    setRegisters(newRegisters);
    setFlags(newFlags);
  };

  return (
    <div className={`${theme}`}>
      <div
        className={`grid grid-cols-8  grid-rows-8 h-screen gap-5 bg-stone-50 dark:bg-black dark:text-white px-5 py-5`}
      >
        <div className="program md:col-span-4 flex flex-col row-span-4 relative border border-stone-300  dark:border-white/20 rounded-xl p-3">
          <div className="text-slate-800 text-3xl w-full flex justify-between items-center  pb-3 dark:text-white">
            <div className="title dark:text-yellow-100">Program</div>
            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={toggleTheme}
                      className="dark:bg-black rounded-xl p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
                    >
                      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Change theme</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/pin-diagram"}>
                      <div className="dark:bg-black hover:bg-stone-200 rounded-xl p-2 hover:dark:bg-stone-700">
                        <GiProcessor />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pin Diagram</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/arch"}>
                      <div className="dark:bg-black hover:bg-stone-200 rounded-xl p-2 dark:hover:bg-stone-700">
                        <HiOutlineRectangleGroup />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Architecture</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <hr className="mb-3" />
          <InstructionDropdown
            instructions={instructions}
            selectedInstructions={selectedInstructions}
            selectInstruction={selectInstruction}
            updateOperandValue={updateOperandValue}
            deleteInstruction={deleteInstruction}
            operandsValues={operandsValues}
            registers={registers}
            setRegisters={setRegisters}
            flags={flags}
            setFlags={setFlags}
            memory={memory}
            setMemory={setMemory}
            handleAssemble={handleAssemble}
          />
        </div>
        <button
          disabled={
            currentInstructionIndex === selectedInstructions.length ||
            selectedInstructions.length === 0
          }
          onClick={nextInstruction}
          className="nextInst title disabled:bg-yellow-300 disabled:text-black col-span-2 col-start-1 row-start-5  rounded-xl text-lg dark:bg-white bg-yellow-300  hover:bg-black hover:text-white dark:hover:bg-orange-400 text-black"
        >
          Next Instruction
        </button>
        <button
          onClick={handleAssemble}
          className="exec title col-span-2 col-start-1 row-start-6  rounded-xl text-lg bg-orange-300 hover:bg-black hover:text-white  dark:hover:bg-yellow-300 dark:bg-white dark:hover:text-black text-black"
        >
          Execute All
        </button>
        <div className="currentInst col-span-2 row-span-2 col-start-3 row-start-5 border border-stone-300 dark:border-white/30 rounded-xl p-3">
          <h1 className="title text-3xl pb-3">Current Instruction</h1>
          <hr className="mb-3" />
          <p>
            {currentInstructionIndex < selectedInstructions.length
              ? selectedInstructions[currentInstructionIndex].instruction
                  .mnemonic
              : "No instruction selected"}
          </p>
        </div>
        <div className="col-span-2 memory flex flex-col row-span-6 col-start-5 row-start-1 border border-stone-300 dark:border-white/30 rounded-xl p-3 ">
          <h1 className="title text-3xl pb-3">Memory</h1>
          <MemoryTable memory={memory} />
        </div>
        <div className="register col-span-2 justify-between flex flex-col row-span-6 col-start-7 row-start-1 border border-stone-300 dark:border-white/30 rounded-xl p-3">
          <h1 className="title text-2xl pb-3 flex justify-between items-center">
            <div>Registers</div>
            <button
              onClick={() => {
                resetRegisters();
              }}
            >
              Reset
            </button>
          </h1>
          <div className="overflow-x-auto h-full">
            <table className="tbl min-w-full border h-full dark:border-gray-300 border-stone-300 text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border dark:border-white/30 text-black dark:bg-white/10 dark:text-white font-semibold text-center">
                    Name
                  </th>
                  <th className="px-4 py-2 border text-black dark:border-white/30 dark:bg-white/10 dark:text-white font-semibold text-center">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(registers)
                  .slice(0, -2)
                  .map(([registerName, registerValue], index) => (
                    <tr
                      key={index}
                      className={`${index === 0 ? "bg-slate-400/20" : ""} ${
                        index === 1 || index === 2 ? "bg-slate-400/15" : ""
                      } ${
                        index === 3 || index === 4 ? "bg-slate-400/10" : ""
                      } ${index === 5 || index === 6 ? "bg-slate-400/5" : ""}`}
                    >
                      <td className="px-4 py-2 border dark:border-white/30 text-black dark:text-white text-center">
                        {registerName}
                      </td>
                      <td className="px-4 py-2 border dark:border-white/30 text-black dark:text-white text-center">
                        {registerValue}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flag col-span-5 row-span-2 items-center row-start-7 border border-stone-300 dark:border-white/30 rounded-xl p-3 flex justify-stretch  ">
          <h1
            className="title text-2xl px-2 py-3 text-center rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            Flag Register
          </h1>
          <div className="w-full">
            <table
              className="tbl min-w-full border border-white/30 dark:text-white text-black"
              style={{ borderRadius: "2rem" }}
            >
              <thead>
                <tr>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 border dark:border-white/30 dark:bg-slate-100/10 dark:text-white text-black border-stone-300 bg-emerald-100 text-center"
                    >
                      D{7 - index}
                    </th>
                  ))}
                </tr>
                <tr>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <td
                      key={index}
                      className="px-2 py-1 border dark:border-white/30 dark:bg-slate-100/5 dark:text-white text-black border-stone-300 bg-emerald-50 text-center"
                    >
                      {7 - index === 7
                        ? "S"
                        : 7 - index === 6
                          ? "Z"
                          : 7 - index === 4
                            ? "AC"
                            : 7 - index === 2
                              ? "P"
                              : 7 - index === 0
                                ? "C"
                                : "X"}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from([
                    flags.S ? "1" : "0",
                    flags.Z ? "1" : "0",
                    "X",
                    flags.AC ? "1" : "0",
                    "X",
                    flags.P ? "1" : "0",
                    "X",
                    flags.C ? "1" : "0",
                  ]).map((value, index) => (
                    <td
                      key={index}
                      className="px-2 py-1 border dark:border-white/30 border-slate-300 text-center "
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="about col-span-3 flex flex-row row-span-2 col-start-6 row-start-7 border dark:border-white/30 dark:bg-white/5 bg-stone-100 rounded-xl p-3 gap-3 items-center">
          <h1
            className="title text-2xl text-center pb-3 rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            About Us
          </h1>
          <hr className="mb-3" />
          <div className="flex flex-col">
            <p>Made with ♥ by 2 students of VPMP</p>
            <p className="flex items-center gap-3">
              <SiZcool className="text-xl" /> Parv Shah CE2 22/99
            </p>
            <p className="flex items-center gap-3">
              <SiZcool className="text-xl" /> Rudra Mehta CE2 22/174
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const MemoryTable = ({ memory }: { memory: Memory }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMemory = useMemo(() => {
    return Object.entries(memory).filter(([key]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [memory, searchTerm]);

  return (
    <div className="flex flex-col w-full h-full">
      <input
        type="text"
        placeholder="Search Memory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-1 border border-gray-300 rounded mb-2"
      />
      <div className="overflow-y-auto overflow-x-hidden  w-full flex-grow">
        <TableVirtuoso
          width="100%"
          style={{ width: "100%", overflowX: "hidden" }}
          totalCount={filteredMemory.length}
          fixedHeaderContent={() => (
            <tr className="w-full relative z-10 scale-110 bg-white dark:bg-black dark:text-white">
              <th className="px-4 py-2 border border-white/30  bg-white/10 text-black dark:bg-black dark:text-white font-semibold text-center">
                Address
              </th>
              <th className="px-4 py-2 border border-white/30 bg-white/10 text-black dark:bg-black dark:text-white font-semibold text-center">
                Value
              </th>
            </tr>
          )}
          itemContent={(index) => {
            const [memoryName, memoryValue] = filteredMemory[index];
            return (
              <>
                <td className="px-4 py-2 w-2/3 text-center">{memoryName}</td>
                <td className="px-4 py-2 w-full text-center">{memoryValue}</td>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};
