import {  Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter =Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata = {
  title: "FinTrack",
  description: "A finance tracker app to manage your expenses and income effectively.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}>
          {/*header*/}
          <Header/>
          <main className="min-h-screen">{children}</main>
          {/*footer*/}
        
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made with 💗 in 🇮🇳</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
