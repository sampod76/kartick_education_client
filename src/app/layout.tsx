'use client';
import './globals.css';

// import { Inter } from "next/font/google";
import Providers from '@/lib/Providers';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Noto_Sans } from 'next/font/google';

import GlobalContextApi from '@/components/ContextApi/GlobalContextApi';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import { Head } from "next/document";
// import { CookiesProvider } from "react-cookie";
const inter = Noto_Sans({ subsets: ['latin'], weight: ['400'] });

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
  useEffect(() => {
    AOS.init({
      // disable: "mobile",
      // You can add your AOS configuration here
      duration: 800, // example: animation duration of 1000ms
    });
  }, []);
  return (
    <GlobalContextApi>
      <DndProvider backend={HTML5Backend}>
        <Providers>
          <html lang="en">
            <meta
              httpEquiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            />

            <body
              // className="container mx-auto "
              className={`mx-auto max-w-[1850px]`}
            >
              {children}
            </body>
          </html>
        </Providers>
      </DndProvider>
    </GlobalContextApi>
  );
}
