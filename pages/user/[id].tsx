import { VStack } from "@chakra-ui/layout";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";

import Header from "pages/header";
import Profile from "pages/profile";
import Social from "pages/social";
import { useEffect, useState } from "react";
import axiosClient from "src/framework/axios";

function App() {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const { user }: any = await axiosClient.get("/users/get-profile");
            setUserData(user);
        };
        fetchUserData();
    }, []);
    console.log(userData);
    return (
        <div>
            <head>
                <title>Profile</title>
            </head>
            <VStack p={5}>
                {userData ? (
                    <>
                        <Header allowUpdate={false} user={userData}></Header>
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
