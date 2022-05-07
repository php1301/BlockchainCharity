import { ChevronDownIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    useColorModeValue,
    Container,
    Stack,
    Button,
    IconButton,
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import NextLink from "next/link";
import { useWallet } from "use-wallet";
import { DarkMode } from "..";
import { ethers } from "ethers";
import { toHex } from "@libs/to-hex";
import { firebaseClient } from "src/firebase";
import axiosClient from "src/framework/axios";
import { useEffect, useState } from "react";
//import { useWallet } from "use-wallet";

export const NavBar: React.FC = () => {
    //sua lai connect wallet
    const wallet = useWallet();
    const baseUrl = "http://localhost:3000/dev";
    const { colorMode, toggleColorMode } = useColorMode();
    const [userAuth, setUserAuth] = useState<{ uid: string; [x: string]: any }>(
        { uid: "" },
    );
    const [display, changeDisplay] = useState('none')

    const syncWallet = async () => {
        const provider = new ethers.providers.Web3Provider(
            (window as any)?.ethereum,
        );
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const walletAddr = await signer.getAddress();
        console.log(walletAddr);
        let response = await axiosClient.post(
            `${baseUrl}/auth/nonce`,
            {
                walletAddr,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const { nonce } = response;
        const hexedNonce = toHex(nonce);
        const signature = await signer.signMessage(hexedNonce);
        console.log(`signature`, signature);
        response = await axiosClient.post(
            `${baseUrl}/auth/wallet`,
            {
                walletAddr,
                nonce: hexedNonce,
                signature,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const { token, userDoc } = response;
        const auth = getAuth(firebaseClient);
        await signInWithCustomToken(auth, token);
        const user = auth.currentUser;
        await user?.reload();
        console.log(user);
        await wallet.connect("injected");
    };
    const signOutWallet = async () => {
        const auth = getAuth();
        signOut(auth);
        wallet.reset();
    };
    useEffect(() => {
        const authenticateUser = async () => {
            const auth = getAuth(firebaseClient);
            console.log(auth);
            auth.onAuthStateChanged(async (user) => {
                console.log(user);
                if (user) {
                    setUserAuth({ ...user });
                } else {
                    setUserAuth({ uid: "" });
                }
            });
        };
        authenticateUser();
    }, []);
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
                            color={useColorModeValue("teal.800", "white")}
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
                                <NextLink href="/">
                                    Funding🌱Healthcare
                                </NextLink>
                            </Box>
                        </Heading>
                    </Flex>
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={6}
                        display={{ base: "flex", md: "flex" }}
                    >
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
                                    bg={"teal.400"}
                                    //href={"#"}
                                    _hover={{
                                        bg: "teal.300",
                                    }}
                                    // onClick={() => wallet.connect("injected")}
                                    onClick={syncWallet}
                                >
                                    Connect Wallet{" "}
                                </Button>
                            </div>
                        )}
                        <DarkMode />
                        <IconButton
                            aria-label="open Menu"
                            size="lg"
                            //mr={2}
                            icon={<HamburgerIcon/>}
                            display={{ base: "flex", md: "none" }}
                            onClick={() => changeDisplay('flex')}
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
                            display={{ base:display, md: "none" }}
                            shadow="lg"
                        >
                            <Flex justify="flex-end">
                                <IconButton
                                    aria-label="Close Menu"
                                    //mt={2}
                                    //mr={2}
                                    size="lg"
                                    icon={<CloseIcon/>}      
                                    onClick={() => changeDisplay('none')}
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
                                <Button
                                    fontSize={"md"}
                                    fontWeight={600}
                                    variant={"link"}
                                    color={useColorModeValue("green.400", "green.300")}
                                    display={{ base: "inline-flex", md: "none" }}
                                    onClick={() => changeDisplay('none')}
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
                                                syncWallet
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
