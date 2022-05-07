import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useWallet } from "use-wallet";
import { getAuth } from "firebase/auth";
import axiosClient from "src/framework/axios";
import axios from "axios";

export const DarkMode: React.FC<{}> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const wallet = useWallet();
    const auth = getAuth();
    const fetchUser = async () => {
        // const data = await axiosClient.get("/users/get-profile");
        // console.log(data);
        const viewProfile = await axiosClient.get(
            "/users/view-profile/0x4ddFf5E113FF403f193503c280DDf7723E53Ca11",
        );
        console.log("View profile", viewProfile);
        const deployedCampaign = await axiosClient.get(
            "/campaigns/get-deployed-campaigns",
        );

        console.log("deployedCampaign", deployedCampaign);
    };
    return (
        <IconButton
            aria-label="Toggle Dark Switch"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={() => {
                toggleColorMode();
                console.log(wallet?.account);
                console.log(auth?.currentUser);
                fetchUser();
                // axiosClient.get("/to-hex");
            }}
        />
    );
};
