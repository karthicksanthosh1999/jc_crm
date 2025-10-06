import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import Navbar from "@/components/navbar/layout";
import { Toaster } from "sonner";

const MainRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <Navbar>{children}</Navbar>
      <Toaster />
    </ThemeProvider>
  );
};

export default MainRootLayout;
