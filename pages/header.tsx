import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image';
import { Stack, Circle, Flex, Box, Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import React from 'react'
import NextLink from "next/link";
import { FcDisplay } from 'react-icons/fc';

function Header() {

    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const [isNotSmallerScreen] = useMediaQuery("(max-width:786px)");
    //console.log("hihi")

    console.log(isNotSmallerScreen)
    return (
        <Stack
        py={{ base: "4", md: "12" }}
        maxW={"7xl"}
        width="100%"
        align={"left"}
        padding="20px"
        >
            <Circle position="absolute" bg="blue.100" opacity="0.1"
                w="300px" h="300px" alignSelf="flex-end" />
            <Flex direction={!isNotSmallerScreen ? "row" : "column"}
                spacing="200px" p={isNotSmallerScreen ? "32" : "0"}
                alignSelf="flex-start">
                <Box mt={isNotSmallerScreen ? "0" : 16} align='flex-start'>
                    <Text fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }} fontWeight="semibold">Hi, I am</Text>
                    <Text fontSize={{ base: "3xl", sm: "4xl", md: "7xl" }} fontWeight="bold" bgGradient="linear(to-r, green.400, green.500, green.600)" bgClip='text' >Nguyen Ngoc Thien</Text>
                    <Text color={isDark ? "gray.200" : "gray.500"}>Main responsibilities: Writing SRS for website, designing UI/UX for website, front-end coding</Text>
                    <Button mt={8} colorScheme="green">
                    <NextLink href="/editprofile">
                                Edit profile
                            </NextLink></Button>

                </Box>
                <Image zIndex={5} alignSelf="center" mt={isNotSmallerScreen ? "12" : "12"}
                    mb={isNotSmallerScreen ? "0" : "12"} ml={isNotSmallerScreen ? "0" : "12"} borderRadius='full'
                    backgroundColor="transparent" boxShadow="lg"
                    boxSize={isNotSmallerScreen ? "100" : "300"} src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/272997112_3093238007631067_3491816514559914718_n.jpg?_nc_cat=109&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=eDFg5xVHmOoAX8kGEPa&tn=QMG6IFJy_zklb8as&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT8XzRQ7ZWMIu5f3pChr2CcmspW_XDgx8apo1-Bw6RF_jA&oe=6279B1F6' />
            </Flex>

        </Stack>
    )
}

export default Header