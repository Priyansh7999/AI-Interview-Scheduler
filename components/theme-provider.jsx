"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * This is a minimal wrapper around next-themes ThemeProvider.
 * It must be a client component ("use client").
 */
export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="system">
      {children}
    </NextThemeProvider>
  );
}
