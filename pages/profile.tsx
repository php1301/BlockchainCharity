import React, { useEffect, useState } from "react";
import Head from "next/head";
import { CampaignCard } from "pages";
import {
    Heading,
    Container,
    SimpleGrid,
    Divider,
    SkeletonCircle,
    HStack,
    Skeleton,
} from "@chakra-ui/react";
import { getETHPrice } from "@libs/get-eth-price";
import axiosClient from "src/framework/axios";
// const [campaignList, setCampaignList] = useState([]);
// const [ethPrice, updateEthPrice] = useState(null);
function Profile({ user }: any): JSX.Element {
    const [campaignList, setCampaignList] = useState<any>([]);
    const [ethPrice, updateEthPrice] = useState<any>(null);
    async function getSummary() {
        try {
            const summary = await Promise.all(
                user?.userCampaigns.map(async (campaign: any, i: any) => {
                    const { summary }: any = await axiosClient.get(
                        `/campaigns/get-campaign-summary/${user.userCampaigns[i]}`,
                    );
                    return summary;
                }),
            );
            const ETHPrice = await getETHPrice();
            updateEthPrice(ETHPrice);
            setCampaignList(summary);
            return summary;
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getSummary();
    }, []);
    return (
        <>
            <Head>
                <title>Profile Page</title>

                <meta
                    name="description"
                    content="Transparent Crowdfunding in Blockchain"
                />
                <link rel="icon" href="/logo.svg" />
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com" /*crossorigin*/
                ></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                <HStack spacing={2}>
                    <SkeletonCircle size="4" />
                    <Heading as="h2" size="lg">
                        Campaigns Created
                    </Heading>
                </HStack>

                <Divider marginTop="4" />
                {user?.userCampaigns.length > 0 ? (
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={10}
                        py={8}
                    >
                        {campaignList.map((el: any, i: any) => {
                            return (
                                <div key={i}>
                                    <CampaignCard
                                        name={el[5]}
                                        description={el[6]}
                                        creatorId={el[4]}
                                        imageURL={el[7]}
                                        id={user?.userCampaigns[i]}
                                        target={el[10]}
                                        balance={el[1]}
                                        ethPrice={ethPrice}
                                    />
                                </div>
                            );
                        })}
                    </SimpleGrid>
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
            </Container>
        </>
    );
}

export default Profile;
