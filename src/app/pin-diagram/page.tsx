"use client";
import React, { CSSProperties } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
export default function PinDiagram() {
  const numPins = 20;
  const pinDescription = "8085 Microprocessor";
  const { theme } = useTheme();
  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "dark bg-black text-white" : "bg-white text-black"
      }   flex items-center min-h-[screen] flex-col justify-center px-12 gap-5 mt-20`}
    >
      <Link href={"/sim"} className="text-3xl flex gap-3 text-start w-full">
        <FaArrowLeft className="mt-1" />
        <div className="title">Back to Sim</div>
      </Link>
      <div className="body text-xl text-start w-full">
        Here is the pin diagram for the 8085 microprocessor. To learn about the
        function of each pin, hover over the pin names displayed in the diagram.
        Each pin serves a unique purpose that contributes to the operational
        capabilities of the microprocessor.
      </div>
      <div className="grid grid-cols-5 grid-rows-20 gap-4 border-2 w-[70%] border-black rounded-lg p-4">
        {/* First Column: Pins 1 to 20 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div
            key={`pin1-${i}`}
            className="col-start-1 text-end px-5"
            style={{ gridRow: i + 1 }}
          >
            <PinFunctions pinNumber={i + 1} />
            {/* {i + 1} */}
          </div>
        ))}

        {/* Second Column: Numbers for Pins 1 to 20 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div
            key={`num1-${i}`}
            className="col-start-2 relative  border-s border-white px-3"
            style={{ gridRow: i + 1 }}
          >
            <div
              className="absolute top-1/2 transform  w-8 border-white "
              style={{
                borderStyle: "solid",
                borderWidth: "0 0 1px 0",
                transform: " translateX(-125%)",
              }}
            ></div>
            {i + 1}
          </div>
        ))}

        {/* Center Column: Description */}
        <div
          className={` col-start-3 row-start-10  h-full  flex items-center justify-center `}
        >
          {pinDescription}
        </div>
        {Array.from({ length: numPins }, (_, i) => (
          <div
            key={`num2-${i}`}
            // className="col-start-5"
            // style={{ gridRow: i + 1 }}
            className="col-start-4 relative border-e text-end border-white px-3"
            style={{ gridRow: i + 1 }}
          >
            <div
              className="absolute top-1/2 transform text-end  w-8 border-white "
              style={{
                borderStyle: "solid",
                borderWidth: "0 0 1px 0",
                right: "-20%",
                // transform: " translateX(125%)",
              }}
            ></div>
            {40 - i}
          </div>
        ))}
        {/* Fourth Column: Pins 21 to 40 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div
            key={`pin2-${i}`}
            className="col-start-5  px-5"
            style={{ gridRow: i + 1 }}
          >
            <PinFunctions pinNumber={40 - i} />
          </div>
        ))}

        {/* Fifth Column: Numbers for Pins 21 to 40 */}
      </div>
    </div>
  );
}
function PinFunctions({ pinNumber }: { pinNumber: number }) {
  switch (pinNumber) {
    case 1:
    case 2:
      return (
        <PinFunction
          className="hover:text-green-500  group group:"
          pin={pinNumber === 1 ? "X1" : "X2"}
          description="X1 and X2 are pins which are connected to clock which supplies it with constant pules to manage the frequency of the microprocessor."
        />
      );
    case 3:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="RESET OUT"
          description="This signal indicates that the microprocessor is being reset. The signal can be used to reset other devices."
        />
      );
    case 4:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="SID"
          description="The SID pin is used for taking serial input."
        />
      );
    case 5:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="SOD"
          description="The SOD pin is used for taking serial output."
        />
      );
    case 6:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="TRAP"
          description="TRAP is an interrupt pin. It is non maskable and vectored. Thus when an interrupt occurs via TRAP, it has to be acknowledged by the microprocessor. It has the highest priority among all interrupts."
        />
      );
    case 7:
    case 8:
    case 9:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin={
            pinNumber === 7
              ? "RST 7.5"
              : pinNumber === 8
              ? "RST 6.5"
              : "RST 5.5"
          }
          description="RST 7.5, RST 6.5 and RST 5.5 are maskable and vectored interrupt pins. They have lower priority than the TRAP interrupt and can be masked by the SIM instruction. When an interrupt occurs via any one of these pins, it has to be acknowledged by the microprocessor."
        />
      );
    case 10:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="INTR"
          description="The INTR pin is an interrupt request pin. It is maskable and non vectored (this means that an address of the routine to be performed has to be provided along with it) and can be disabled by the DI instruction. When activated, the microprocessor completes the current instruction execution and then acknowledges the interrupt."
        />
      );
    case 11:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="INTA"
          description=" It is an interrupt acknowledgement sent by the microprocessor after INTR is received."
        />
      );
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin={
            pinNumber === 12
              ? "AD0"
              : pinNumber === 13
              ? "AD1"
              : pinNumber === 14
              ? "AD2"
              : pinNumber === 15
              ? "AD3"
              : pinNumber === 16
              ? "AD4"
              : pinNumber === 17
              ? "AD5"
              : pinNumber === 18
              ? "AD6"
              : "AD7"
          }
          description="The pins labeled AD0 to AD7 are multiplexed address/data pins. This means that these pins can be used to transfer both address and data. These normally carry the lower 8 bits when transferring the address. The fact that these are used as address bus or data bus is controlled by the ALE pin (pin number 30)."
        />
      );
    case 20:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="Vss"
          description="Ground Reference"
        />
      );
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin={
            pinNumber === 21
              ? "A8"
              : pinNumber === 22
              ? "A9"
              : pinNumber === 23
              ? "A10"
              : pinNumber === 24
              ? "A11"
              : pinNumber === 25
              ? "A12"
              : pinNumber === 26
              ? "A13"
              : pinNumber === 27
              ? "A14"
              : "A15"
          }
          description="The pins labeled A8 to A15 are dedicated address pins. These pins are used to transfer the upper 8 bits of the address when accessing memory."
        />
      );
    case 29:
    case 33:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="S0"
          description="S1 and S2 are status signals. They distinguish the various types of operations such as halt, reading, instruction fetching or writing. Heres its IO Status table: "
        />
      );
    case 30:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="ALE"
          description="It is an Address Latch Enable signal. The ALE pin is used to manage weather AD0 to AD7 transfer address or data. When ALE is low (0), the pins transfer address while if ALE is high (1), data is transferred."
        />
      );
    case 31:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="WR'"
          description="It is a signal to control WRITE operation. When it goes low the data on the data bus is written into the selected memory or I/O location."
        />
      );
    case 32:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="RD'"
          description="It is a signal to control READ operation. When it is low the selected memory or input-output device is read."
        />
      );
    case 34:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="IO/M'"
          description="The IO/M' pin controls weather read/write operations are performed from memory, or IO devices. When it is low (0), IO is low and thus data is transferred from memory. And this when it is high (1), IO is high and thus data is transferred from IO devices."
        />
      );
    case 35:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="READY"
          description="It senses whether a peripheral is ready to transfer data or not. If READY is high(1) the peripheral is ready. If it is low(0) the microprocessor waits till it goes high. It is useful for interfacing low speed devices."
        />
      );
    case 36:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="RESET IN"
          description="When the signal on this pin is low(0), the program-counter is set to zero, the buses are tristated and the microprocessor unit is reset."
        />
      );
    case 37:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="CLK (OUT)"
          description="This signal can be used as the system clock for other devices."
        />
      );
    case 38:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="HLDA"
          description="It is a signal which indicates that the hold request has been received after the removal of a HOLD request, the HLDA goes low."
        />
      );
    case 39:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="HOLD"
          description="It indicates that another device is requesting the use of the address and data bus. Having received HOLD request the microprocessor relinquishes the use of the buses as soon as the current machine cycle is completed. Internal processing may continue. After the removal of the HOLD signal the processor regains the bus"
        />
      );
    case 40:
      return (
        <PinFunction
          className="hover:text-green-500 group group:"
          pin="Vcc"
          description="+5v power supply"
        />
      );
  }
}
function PinFunction({
  pin,
  description,
  ...props
}: {
  pin: string;
  description: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger className={`${props.className} cursor-pointer`}>
        {pin}
      </HoverCardTrigger>
      <HoverCardContent className="text-start w-1/2 bg-black">
        <div className="text-xl font-bold">{pin}</div>
        <hr className="my-1" />
        <ul className="list-disc list-inside">
          {description.split(/\.\s+/).map((item, index) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {pin === "S0" && <IOStatusTable />}
        {pin === "S1" && <IOStatusTable />}
      </HoverCardContent>
    </HoverCard>
  );
}

const IOStatusTable = () => {
  return (
    <table
      className={` min-w-full border-collapse my-1 border border-gray-300`}
    >
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">IO/M'</th>
          <th className="border border-gray-300 px-4 py-2">S1</th>
          <th className="border border-gray-300 px-4 py-2">S0</th>
          <th className="border border-gray-300 px-4 py-2">Data Bus Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Opcode fetch</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">Memory read</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Memory write</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">I/O read</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">I/O write</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">
            Interrupt acknowledge
          </td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">Halt</td>
        </tr>
      </tbody>
    </table>
  );
};
