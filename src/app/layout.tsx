"use client";
import { InstructionProvider } from "@/hooks/useInstruction";
import "./globals.css";
import { MemoryProvider } from "@/contexts/MemoryContext";
import { RegisterProvider } from "@/contexts/RegisterContext";
import { FlagRegisterProvider } from "@/contexts/FlagRegisterContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MemoryProvider>
        <RegisterProvider>
          <FlagRegisterProvider>
            <InstructionProvider>
              <body className={` antialiased`}>{children}</body>
            </InstructionProvider>
          </FlagRegisterProvider>
        </RegisterProvider>
      </MemoryProvider>
    </html>
  );
}
