import StoreProvider from "@/components/provider/StoreProvider";
import { montserrat } from "@/font";
import type { Metadata } from "next";
import Image from "next/image";
import Vector1 from "../public/img.png";
import Vector2 from "../public/img_1.png";
import "./globals.css";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased relative min-h-screen`}>
        <StoreProvider>
          <div className="overflow-scroll mb-20 min-h-screen">{children}</div>
          <div className="relative">
            <Image
              src={Vector1}
              alt="vector image 1"
              className="absolute bottom-0"
            />
            <Image
              src={Vector2}
              alt="vector image 2"
              className="absolute bottom-0"
            />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
