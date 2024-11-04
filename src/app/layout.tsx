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
        <FlagRegisterProvider>
          <RegisterProvider>
            <InstructionProvider>
              <body className={` antialiased dark `}>{children}</body>
            </InstructionProvider>
          </RegisterProvider>
        </FlagRegisterProvider>
      </MemoryProvider>
    </html>
  );
}
