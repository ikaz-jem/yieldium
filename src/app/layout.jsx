import { Geist, Geist_Mono,Inter , Poppins } from "next/font/google";
import "./globals.css";



const inter = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});




export const metadata = {
  title: "Yieldium Finance",
  description: "Build A better Financial Future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}    antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
