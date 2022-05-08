import { VStack } from "@chakra-ui/layout";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";
import { getETHPrice } from "@libs/get-eth-price";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import axiosClient from "src/framework/axios";
import Header from "./header";
import Profile from "./profile";
import Social from "./social";

function App({ ETHPrice }: any) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const { user }: any = await axiosClient.get("/users/get-profile");
            setUserData(user);
        };
        fetchUserData();
    }, []);
    return (
        <div>
            <head>
                <title>Profile</title>
            </head>
            <VStack p={5}>
                {userData ? (
                    <>
                        <Header ETHPrice={ETHPrice} user={userData}></Header>
                        <Social user={userData}></Social>
                        <Profile user={userData}></Profile>
                    </>
                ) : (
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={10}
                        py={8}
                    >
                        <Skeleton height="25rem" />
                        <Skeleton height="25rem" />
                        <Skeleton height="25rem" />
                    </SimpleGrid>
                )}
            </VStack>
        </div>
    );
}
export default App;
export async function getServerSideProps({ req, res }: any) {
    const uid = getCookie("uid", { req, res })?.toString();
    console.log(uid);
    if (!uid) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const ETHPrice = await getETHPrice();
    return { props: { ETHPrice } };
}
