// app/(protected)/layout.tsx
import { ReactNode } from "react";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Toaster } from "sonner";

export default async function MainRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
