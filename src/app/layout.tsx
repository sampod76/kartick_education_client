
"use client";
import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Providers from "@/lib/Providers";
import { Noto_Sans } from "next/font/google";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GlobalContextApi from "@/components/ContextApi/GlobalContextApi";

// import { Head } from "next/document";
// import { CookiesProvider } from "react-cookie";
const inter = Noto_Sans({ subsets: ["latin"], weight: ["400"] });

// import '../app/globals.css';
// export const metadata: Metadata = {
//   title: "Education Services",
//   description: "Generated by create next app",
// };
{
  /* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContextApi>
    <DndProvider backend={HTML5Backend}>
      {/* <MyErrorBoundary> */}
      {/* <CookiesProvider defaultSetOptions={{ path: "/" }}> */}
      <Providers>
        <html lang="en">
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />

          <body
            // className="container mx-auto "
            className={` max-w-[1990px] mx-auto `}
            // style={{maxWidth: '1990px',margin:"auto"}}
          >
            <Providers>{children}</Providers>
          </body>
        </html>
      </Providers>
      {/* </CookiesProvider> */}
      {/* </MyErrorBoundary> */}
    </DndProvider>
    </GlobalContextApi>
  );
}
