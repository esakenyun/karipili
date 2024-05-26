import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800"], subsets: ["latin"] });

export const metadata = {
  title: "Karipili",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
