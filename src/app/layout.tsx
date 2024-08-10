import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import localfont from "next/font/local"

import { TRPCReactProvider } from "~/trpc/react";

const bluecashews = localfont({
  src: [{
    path:'../../public/fonts/Blue_Cashews.otf',
  }],
  variable: "--font-bluecashews",
})

const roman = localfont({
  src: [{
    path:'../../public/fonts/RomanSerif.ttf',
  }],
  variable: "--font-roman",
})

export const metadata: Metadata = {
  title: "Intellektuelle Schule 2024",
  description: "Intellektuelle Schule 2024 by HIMAFI ITB",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${bluecashews.variable} ${roman.variable} font-roman`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
