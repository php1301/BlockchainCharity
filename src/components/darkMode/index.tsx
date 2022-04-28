import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useWallet } from "use-wallet";
import { getAuth } from "firebase/auth";
import axiosClient from "src/framework/axios";

export const DarkMode: React.FC<{}> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const wallet = useWallet();
    const auth = getAuth();

    return (
        <IconButton
            aria-label="Toggle Dark Switch"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={() => {
                toggleColorMode();
                console.log(wallet?.account);
                console.log(auth?.currentUser);
                // axiosClient.get("/to-hex");
            }}
        />
    );
};
