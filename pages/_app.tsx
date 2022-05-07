import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { NavBar } from "@components/navbar";
import Footer from "@components/footer/index.spec";
import "@fontsource/space-grotesk";
import { UseWalletProvider } from "use-wallet";

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
                <UseWalletProvider
                    chainId={4}
                    connectors={{
                        walletconnect: {
                            rpcUrl: "https://rinkeby.infura.io/v3/08ac79d88b5d4aea961ca36af7ea6ee7",
                        },
                        // injected: true,
                    }}
                >
                    <NavBar />
                    <Component {...pageProps} />
                    <Footer />
                </UseWalletProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
