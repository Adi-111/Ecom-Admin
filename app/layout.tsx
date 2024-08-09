import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModalProvider } from "@/provider/modal-provider";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import ToasterProvider from "@/provider/toast-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "credits : https://github.com/Adi-111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        
       
        
        
        
        
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider/>
            <ModalProvider/>
            {children}
          </ThemeProvider>
        </body>
   
      </html>
    </ClerkProvider>
  );
}
