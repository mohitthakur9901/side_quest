"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  return (
   
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {pathname.startsWith("/api/auth") ? null : <Header />}
        {children}
        <Toaster />
        {pathname.startsWith("/api/auth") ? null : <Footer />}
      </NextThemesProvider>
    
  );
}