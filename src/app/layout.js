import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MUI Theme Creator",
  description: "Create mui based themes with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100%', width: '100%' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          height: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {children}
      </body>
    </html>
  );
}
