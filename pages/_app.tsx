import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { NavBar } from "@components/navbar";

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
            </ChakraProvider>
        </>
    );
}

export default MyApp;
