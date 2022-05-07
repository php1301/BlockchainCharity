import React from 'react'
import Head from "next/head";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import styles from "../src/styles/Home.module.css";
import detectEthereumProvider from "@metamask/detect-provider";
import { useMediaQuery } from '@chakra-ui/media-query';
import { DiCodeigniter, DiAndroid, DiWebplatform, DiApple } from 'react-icons/di'
import { CampaignCard } from 'pages';
import {
    Heading,
    useBreakpointValue,
    useColorModeValue,
    Text,
    Button,
    Flex,
    Container,
    SimpleGrid,
    Box,
    Divider,
    Skeleton,
    Img,
    Icon,
    chakra,
    Tooltip,
    Link,
    SkeletonCircle,
    HStack,
    Stack,
    Progress,
} from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";
import { Feature } from 'pages';
// const [campaignList, setCampaignList] = useState([]);
// const [ethPrice, updateEthPrice] = useState(null);
function Profile(): JSX.Element {

    const [isNotSmallerScreen] = useMediaQuery("(max-width:786px)");


    return (
                    <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                    <HStack spacing={2}>
                        <SkeletonCircle size="4" />
                        <Heading as="h2" size="lg">
                            Campaigns
                        </Heading>
                    </HStack>

                    <Divider marginTop="4" />

                    
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            spacing={10}
                            py={8}
                        >
                            
                                {/* return ( */}
                                    <div key={0}>
                                        <CampaignCard
                                            name={"aav"}
                                            description={"avacs"}
                                            creatorId={1}
                                            imageURL={"https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-1/272997112_3093238007631067_3491816514559914718_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-6&_nc_sid=7206a8&_nc_ohc=eDFg5xVHmOoAX-0nLQL&tn=QMG6IFJy_zklb8as&_nc_ht=scontent.fhan3-5.fna&oh=00_AT914uSKCW15aIDT9tgkn4tMNdw1eA0ifJoUpUzxk01xLQ&oe=627A5678"}
                                            id={/*campaigns[i]*/ 0}
                                            target={10}
                                            balance={19}
                                            ethPrice={0}
                                        />
                                    </div>
                                {/* ); */}
                           
                        </SimpleGrid>
                    {/* : (
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            spacing={10}
                            py={8}
                        >
                            <Skeleton height="25rem" />
                            <Skeleton height="25rem" />
                            <Skeleton height="25rem" />
                        </SimpleGrid>
                    ) */}
                </Container>

    )
}

export default Profile