import { VStack } from "@chakra-ui/layout";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";
import { getETHPrice } from "@libs/get-eth-price";

import Header from "@components/header";
import Profile from "@components/profile";
import Social from "@components/social";
import { useEffect, useState } from "react";
import axiosClient from "src/framework/axios";
import { useRouter } from "next/router";

function App({ ETHPrice }: any) {
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        const fetchUserData = async () => {
            const { user }: any = await axiosClient.get(
                `users/view-profile/${id}`,
            );
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
                        <Header
                            ETHPrice={ETHPrice}
                            allowUpdate={false}
                            user={userData}
                        ></Header>
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
    const ETHPrice = await getETHPrice();
    return { props: { ETHPrice } };
}
