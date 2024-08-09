import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import localfont from "next/font/local"

import { TRPCReactProvider } from "~/trpc/react";

const witcher = localfont({
  src: [{
    path:'../../public/fonts/Thewitcher-jnOj.ttf',
    weight: "700"
  }],
  variable: "--font-witcher",
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
    <html lang="en" className={`${GeistSans.variable} ${witcher.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
