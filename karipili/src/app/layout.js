import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800"], subsets: ["latin"] });

export const metadata = {
  title: "Karipili",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <meta httpEquiv="Access-Control-Allow-Origin" content="*" />
      </head>
      <body className={poppins.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
