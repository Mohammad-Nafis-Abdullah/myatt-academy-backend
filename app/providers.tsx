"use client";

import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/themes/themes";
import { Schoolbell } from "next/font/google";
import { Open_Sans } from "next/font/google";
import ModalProvider from "@/components/modal/ModalProvider";
import "material-symbols";
import { AuthProvider } from "@/services/AuthProvider";
import CartContextProvider from "@/services/CartProvider";

const schoolbell = Schoolbell({ subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ subsets: ["latin"] });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-schoolbell: ${schoolbell.style.fontFamily};
            --font-opensans: ${openSans.style.fontFamily};
          }
        `}
      </style>

      <CacheProvider>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            {/* <CartContextProvider> */}
            {children}
            <ModalProvider />
            {/* </CartContextProvider> */}
          </AuthProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
