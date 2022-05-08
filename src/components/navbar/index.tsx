import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    useColorModeValue,
    Container,
    Stack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import NextLink from "next/link";
import { useWallet } from "use-wallet";
import { DarkMode } from "..";
import { firebaseClient } from "src/firebase";
import { useEffect, useState } from "react";
import { syncWallet } from "@libs/sync-wallet";
import { removeCookies, setCookies } from "cookies-next";
import { useRouter } from "next/router";

export const NavBar: React.FC = () => {
    //sua lai connect wallet
    const wallet = useWallet();
    const router = useRouter();
    const [userAuth, setUserAuth] = useState<{ uid: string; [x: string]: any }>(
        { uid: "" },
    );
    const [display, changeDisplay] = useState("none");

    const signOutWallet = async () => {
        const auth = getAuth();
        signOut(auth);
        removeCookies("uid");
        wallet.reset();
        setUserAuth({ uid: "" });
        router.reload();
    };
    useEffect(() => {
        const authenticateUser = async () => {
            const auth = getAuth(firebaseClient);
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setCookies("uid", user.uid);
                    setUserAuth({ ...user });
                } else {
                    wallet.reset();
                }
            });
        };
        authenticateUser();
    }, []);
    return (
        <Box zIndex={9999}>
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
                        "rgba(26, 32, 44, 0.8)",
                    ),
                }}
            >
                <Container as={Flex} maxW={"7xl"} align={"center"}>
                    <Flex
                        flex={{ base: 1 }}
                        justify="start"
                        ml={{ base: -2, md: 0 }}
                    >
                        <Heading
                            textAlign="left"
                            fontFamily={"heading"}
                            color={useColorModeValue("green.800", "white")}
                            //as="h2"
                            size="lg"
                        >
                            <Box
                                style={{ fontWeight: 900 }}
                                as={"span"}
                                color={useColorModeValue(
                                    "green.400",
                                    "green.300",
                                )}
                                position={"relative"}
                                zIndex={10}
                                _after={{
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0,
                                    w: "full",
                                    h: "30%",
                                    bg: useColorModeValue(
                                        "green.100",
                                        "green.900",
                                    ),
                                    zIndex: -1,
                                }}
                            >
                                <NextLink href="/">Funding🌱Fun</NextLink>
                            </Box>
                        </Heading>
                    </Flex>
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={{ base: "3", md: "6" }}
                        display={{ base: "flex", md: "flex" }}
                    >
                        {(wallet.status === "connected" || userAuth?.uid) && (
                            <Button
                                fontSize={"md"}
                                fontWeight={600}
                                variant={"link"}
                                color={useColorModeValue(
                                    "green.400",
                                    "green.300",
                                )}
                                display={{
                                    base: "none",
                                    md: "inline-flex",
                                }}
                            >
                                <NextLink href="/user">Profile</NextLink>
                            </Button>
                        )}
                        <Button
                            fontSize={"md"}
                            fontWeight={600}
                            variant={"link"}
                            color={useColorModeValue("green.400", "green.300")}
                            display={{ base: "none", md: "inline-flex" }}
                        >
                            <NextLink href="/campaign/new">
                                Create Campaign
                            </NextLink>
                        </Button>
                        {wallet.status === "connected" || userAuth?.uid ? (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {userAuth?.uid?.slice(0, 10) + "..."}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={signOutWallet}>
                                        {" "}
                                        Disconnect Wallet{" "}
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <div>
                                <Button
                                    display={{
                                        base: "none",
                                        md: "inline-flex",
                                    }}
                                    fontSize={"md"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"green.400"}
                                    //href={"#"}
                                    _hover={{
                                        bg: "green.300",
                                    }}
                                    // onClick={() => wallet.connect("injected")}
                                    onClick={() => syncWallet(wallet)}
                                >
                                    Connect Wallet{" "}
                                </Button>
                            </div>
                        )}
                        <DarkMode />
                        <IconButton
                            aria-label="open Menu"
                            w="40px"
                            h="40px"
                            //mr={2}
                            icon={<HamburgerIcon />}
                            display={{ base: "flex", md: "none" }}
                            onClick={() => changeDisplay("flex")}
                        />
                        <Flex
                            //w="100vw"
                            w={{ md: "lg", base: "lg" }}
                            bgColor={useColorModeValue(
                                "rgba(255, 255, 255, 1)",
                                "rgba(26, 32, 44, 1)",
                            )}
                            zIndex={20}
                            h="100vh"
                            pos="fixed"
                            top="0"
                            //left="0"
                            right="0"
                            overflowY="auto"
                            flexDir="column"
                            display={{ base: display, md: "none" }}
                            shadow="lg"
                        >
                            <Flex justify="flex-end">
                                <IconButton
                                    aria-label="Close Menu"
                                    //mt={2}
                                    //mr={2}
                                    size="lg"
                                    icon={<CloseIcon />}
                                    onClick={() => changeDisplay("none")}
                                />
                            </Flex>
                            <Stack
                                flex={{ base: 1, md: 0 }}
                                //justify={"flex-end"}
                                direction={"column"}
                                spacing={6}
                                display={{ base: "flex", md: "flex" }}
                                align="center"
                            >
                                {(wallet.status === "connected" ||
                                    userAuth?.uid) && (
                                    <Button
                                        fontSize={"md"}
                                        fontWeight={600}
                                        variant={"link"}
                                        color={useColorModeValue(
                                            "green.400",
                                            "green.300",
                                        )}
                                        onClick={() => changeDisplay("none")}
                                        display={{
                                            base: "inline-flex",
                                            md: "none",
                                        }}
                                    >
                                        <NextLink href="/user">
                                            Profile
                                        </NextLink>
                                    </Button>
                                )}
                                <Button
                                    fontSize={"md"}
                                    fontWeight={600}
                                    variant={"link"}
                                    color={useColorModeValue(
                                        "green.400",
                                        "green.300",
                                    )}
                                    display={{
                                        base: "inline-flex",
                                        md: "none",
                                    }}
                                    onClick={() => changeDisplay("none")}
                                >
                                    <NextLink href="/campaign/new">
                                        Create Campaign
                                    </NextLink>
                                </Button>
                                {wallet.status === "connected" ||
                                userAuth?.uid ? (
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon />}
                                        >
                                            {userAuth?.uid?.slice(0, 10) +
                                                "..."}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={signOutWallet}>
                                                {" "}
                                                Disconnect Wallet{" "}
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <div>
                                        <Button
                                            display={{
                                                base: "inline-flex",
                                                md: "none",
                                            }}
                                            fontSize={"md"}
                                            fontWeight={600}
                                            color={"white"}
                                            bg={"teal.400"}
                                            //href={"#"}
                                            _hover={{
                                                bg: "teal.300",
                                            }}
                                            // onClick={() => wallet.connect("injected")}
                                            //onClick={syncWallet}
                                            onClick={() => {
                                                //changeDisplay('none')
                                                syncWallet(wallet);
                                            }}
                                        >
                                            Connect Wallet{" "}
                                        </Button>
                                    </div>
                                )}
                            </Stack>
                        </Flex>
                    </Stack>
                </Container>
            </Flex>
        </Box>
    );
};
