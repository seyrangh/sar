// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SarMentor - Powered by SeyranAI | Your Greatest Companion",
  description:
    "World-class medical learning platform with AI-powered explanations and smart summarization. Your greatest companion for first-year university med school success.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="h-full bg-white dark:bg-gray-900 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
