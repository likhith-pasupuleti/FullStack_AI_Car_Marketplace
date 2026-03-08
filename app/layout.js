import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vehiql",
  description: "Find your dream car!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased flex flex-col min-h-screen`}
        >
          <Header />
          <Toaster richColors />

          {/* Main grows to fill remaining space */}
          <main className="flex-1">{children}</main>

          <footer className="bg-blue-50 py-4">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="font-bold">Made with Love by Likhith</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
