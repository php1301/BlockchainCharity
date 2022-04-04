import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { NavBar } from "@components/navbar";
import Footer from "@components/footer/index.spec";
import "@fontsource/space-grotesk";

const theme = extendTheme({
    fonts: {
      heading: "Space Grotesk",
      body: "Space Grotesk",
    },
  });

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    //const queryClient = new QueryClient();
    return (
        <>
            <ChakraProvider theme={theme}>
                <NavBar/>
                <Component {...pageProps}/>
                <Footer/>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
