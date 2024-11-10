"use client";
import { InstructionProvider } from "@/hooks/useInstruction";
import "./globals.css";
import { MemoryProvider } from "@/contexts/MemoryContext";
import { RegisterProvider } from "@/contexts/RegisterContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FlagRegisterProvider } from "@/contexts/FlagRegisterContext";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>CircuitSim</title>
        <meta
          name="description"
          content="Circuit Sim is an interactive 8085 microprocessor simulator that allows users to simulate and visualize assembly language programming."
        />
        <meta
          name="keywords"
          content="8085 simulator, circuit simulation, microprocessor, assembly language, educational tool"
        />
        <meta name="author" content="Your Name or Company Name" />
        <meta property="og:title" content="Circuit Sim - 8085 Simulator" />
        <meta
          property="og:description"
          content="An interactive simulator for the 8085 microprocessor."
        />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        {/* Replace with your website URL */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <MemoryProvider>
        <FlagRegisterProvider>
          <RegisterProvider>
            <InstructionProvider>
              <ThemeProvider>
                <body>{children}</body>
              </ThemeProvider>
            </InstructionProvider>
          </RegisterProvider>
        </FlagRegisterProvider>
      </MemoryProvider>
    </html>
  );
}
