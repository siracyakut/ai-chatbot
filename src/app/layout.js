import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Siro39 AI Chat Bot",
  description: "AI Chat Bot created for ISU by Sirac Yakut",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
