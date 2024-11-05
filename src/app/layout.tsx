"use client";
import { InstructionProvider } from "@/hooks/useInstruction";
import "./globals.css";
import { MemoryProvider } from "@/contexts/MemoryContext";
import { RegisterProvider } from "@/contexts/RegisterContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
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
              <ThemeProvider>
                <body >{children}</body>
              </ThemeProvider>
            </InstructionProvider>
          </RegisterProvider>
        </FlagRegisterProvider>
      </MemoryProvider>
    </html>
  );
}
