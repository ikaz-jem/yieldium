
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster, toast } from 'sonner'


const inter = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});




export const metadata = {
  title: "Yieldium Finance",
  description: "Build A better Financial Future",
   icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}    antialiased`}
      >
        <Toaster position="top-center" toastOptions={{

          style: {
            background: 'var(--toast-background)',
            color: 'var(--title)',
            border: '1px solid var(--toast-border)'
          },
        }} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
