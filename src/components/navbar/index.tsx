import { 
    Box, 
    Flex, 
    Heading, 
    useColorModeValue,
    Container, 
    Stack,
    Button} from "@chakra-ui/react"
import NextLink from "next/link"

export const NavBar: React.FC = () => {
    //sua lai connect wallet
    return (
        <Box>
            <Flex
                color={useColorModeValue("gray.600", "white")}  
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                pos="fixed"
                top="0"
                w={"full"}
                minH={"60px"}
                //boxShadow={"sm"}
                zIndex="999"
                justify={"center"}
                css={{
                backdropFilter: "saturate(180%) blur(5px)",
                backgroundColor: useColorModeValue(
                    "rgba(255, 255, 255, 0.8)",
                    "rgba(26, 32, 44, 0.8)"
                ),
                }}  
            >
                <Container as={Flex} maxW={"7xl"} align={"center"}>
                    <Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
                        <Heading
                            textAlign="left"
                            fontFamily={"heading"}
                            color={useColorModeValue("teal.800", "white")}
                            //as="h2"
                            size="lg"
                        >
                            <Box
                                as={"span"}
                                color={useColorModeValue("teal.400", "teal.300")}
                                position={"relative"}
                                zIndex={10}
                                _after={{
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  w: "full",
                                  h: "30%",
                                  bg: useColorModeValue("teal.100", "teal.900"),
                                  zIndex: -1,
                                }}
                            >
                                <NextLink href="/">SupportForAll</NextLink>
                            </Box>
                        </Heading>
                    </Flex>
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={6}
                        display={{ base: "none", md: "flex" }}
                    >
                        <Button
                            fontSize={"md"}
                            fontWeight={600}
                            variant={"link"}
                            color={useColorModeValue("teal.400", "teal.300")}
                            display={{ base: "none", md: "inline-flex" }}
                        >
                            <NextLink href="/campaign/new">Create Campaign</NextLink>
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"md"}
                            fontWeight={600}
                            color={"white"}
                            bg={"teal.400"}
                            href={"#"}
                            _hover={{
                              bg: "teal.300",
                            }}
                        >
                            <NextLink href="/">Conect Wallet</NextLink>
                        </Button>
                    </Stack>
                </Container>
            </Flex>
        </Box>
    )
}