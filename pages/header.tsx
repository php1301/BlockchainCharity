import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Stack, Circle, Flex, Box, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { SimpleGrid, Link } from "@chakra-ui/react";
import { StatCard } from "@components/statCard";
import React from "react";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { getETHPriceInUSD } from "@libs/get-eth-price";

function Header({
    allowUpdate = true,
    user,
    ETHPrice,
}: {
    ETHPrice: any;
    user: any;
    allowUpdate?: boolean;
}) {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const [isNotSmallerScreen] = useMediaQuery("(max-width:786px)");
    //console.log("hihi")
    console.log(isNotSmallerScreen);

    return (
        <Stack
            py={{ base: "1", md: "12" }}
            maxW={"7xl"}
            width="100%"
            align={"left"}
            padding="20px"
        >
            <Circle
                position="absolute"
                bg="blue.100"
                opacity="0.1"
                size={"300px"}
                alignSelf="flex-end"
            />
            <Flex
                direction={!isNotSmallerScreen ? "row" : "column"}
                p={isNotSmallerScreen ? "10" : "0"}
                alignSelf="flex-start"
            >
                <Box mt={isNotSmallerScreen ? "0" : 16} alignItems="flex-start">
                    <Text
                        fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
                        fontWeight="semibold"
                    >
                        Hi, I am
                    </Text>
                    <Text
                        fontSize={{ base: "3xl", sm: "4xl", md: "7xl" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, green.400, green.500, green.600)"
                        bgClip="text"
                    >
                        {user?.user?.lastName + " " + user?.user?.firstName}
                    </Text>
                    <Text color={isDark ? "gray.200" : "gray.500"}>
                        {user?.user?.bio ||
                            " Main responsibilities: Writing SRS for website, designing UI/UX for website, front-end coding"}
                    </Text>
                    <Text color={isDark ? "gray.200" : "gray.500"}>
                        Phone Number: {user?.user?.phone || " Not provided"}
                    </Text>
                    <Text color={isDark ? "gray.200" : "gray.500"}>
                        Email: {user?.user?.email || " Not provided"}
                    </Text>
                    <Text color={isDark ? "gray.200" : "gray.500"}>
                        Wallet address:{" "}
                        {user?.user?.walletAddress ? (
                            <Link
                                color="teal.500"
                                href={`https://rinkeby.etherscan.io/address/${user?.user?.walletAddress}`}
                                isExternal
                            >
                                {user?.user?.walletAddress}
                                <ExternalLinkIcon mx="2px" />
                            </Link>
                        ) : (
                            "Not provided"
                        )}
                    </Text>
                    <Box mx={"0"} my={5} w={"70%"}>
                        <SimpleGrid columns={{ base: 1 }} spacing={{ base: 5 }}>
                            <StatCard
                                title={"Number of Campaigns"}
                                stat={user?.numberOfCampaigns}
                                info={""}
                            />
                            <StatCard
                                title={"Total Donations Received in ETH"}
                                stat={`${user?.totalDonationReceived} -
                                    ${getETHPriceInUSD(
                                        ETHPrice,
                                        user?.totalDonationReceived,
                                    )} $
                                    `}
                                info={""}
                            />
                            <StatCard
                                title={"Total requests finalized"}
                                stat={user?.finalizeRate + "%"}
                                info={""}
                            />
                        </SimpleGrid>
                    </Box>
                    {allowUpdate && (
                        <Button mt={8} colorScheme="green">
                            <NextLink href="/editprofile">
                                Edit profile
                            </NextLink>
                        </Button>
                    )}
                </Box>
                <Image
                    zIndex={5}
                    alignSelf="center"
                    mt={isNotSmallerScreen ? "12" : "12"}
                    mb={isNotSmallerScreen ? "0" : "12"}
                    ml={isNotSmallerScreen ? "0" : "12"}
                    borderRadius="full"
                    backgroundColor="transparent"
                    boxShadow="lg"
                    boxSize={isNotSmallerScreen ? "100" : "300"}
                    src={user?.user?.avatar || "/static/no-requests.png"}
                />
            </Flex>
        </Stack>
    );
}

export default Header;
