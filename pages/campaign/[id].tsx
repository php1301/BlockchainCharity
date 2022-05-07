import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import NextLink from "next/link";
import { DateTime } from "luxon";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    CloseButton,
    Container,
    FormControl,
    Heading,
    Link,
    Progress,
    SimpleGrid,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Tooltip,
    useColorModeValue,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormHelperText,
    Button,
    Img,
    AspectRatio,
} from "@chakra-ui/react";
import { ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import { StatCard } from "@components/statCard";
import { getWEIPriceInUSD, getETHPriceInUSD } from "pages/api/getETHPrice";
import axiosClient from "src/framework/axios";
import { getETHPrice } from "@libs/get-eth-price";
import web3 from "@libs/web3";
import { useWallet } from "use-wallet";
import { getAuth } from "firebase/auth";
import { firebaseClient } from "src/firebase";

//import web3 from "../../smart-contract/web3";
//import Campaign from "../../smart-contract/campaign";
//Sua web3 "become a donnor", web3 "target of", web3 <Progress> form onsubmit, "Amount in Ether you want to contribute", button "contribute"

export async function getServerSideProps({
    params,
}: {
    params: { id: string };
}) {
    const campaignId = params.id;
    const { summary }: any = await axiosClient.get(
        `/campaigns/get-campaign-summary/${campaignId}`,
    );
    const ETHPrice = await getETHPrice();
    return {
        props: {
            id: campaignId,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            name: summary[5],
            description: summary[6],
            image: summary[7],
            dateCreated: summary[8],
            dateUpdated: summary[9],
            target: summary[10],
            roadmap: summary?.[11] || [],
            ETHPrice,
        },
    };
}

interface PropsCampaignSingle {
    id: any;
    minimumContribution: any;
    balance: any;
    requestsCount: any;
    approversCount: any;
    manager: any;
    name: string;
    description: string;
    image: string;
    dateCreated: string;
    dateUpdated: string;
    target: any;
    ETHPrice: any;
    roadmap: any;
}

const CampaignSingle: React.FC<PropsCampaignSingle> = ({
    id,
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
    name,
    description,
    image,
    dateCreated,
    dateUpdated,
    target,
    ETHPrice,
    roadmap,
}) => {
    const { handleSubmit, register, formState, reset } = useForm({
        mode: "onChange",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [error, setError] = useState("");
    const [amountInUSD, setAmountInUSD] = useState<any>();
    const wallet = useWallet();
    const router = useRouter();
    const { width, height } = useWindowSize();
    console.log("roadmap", roadmap);
    async function onSubmit(data: any) {
        try {
            setError("");
            const accounts = wallet?.account;
            const { txParams: res }: { txParams: any } = await axiosClient.post(
                "/campaigns/contribute-campaign",
                {
                    walletAddr: accounts,
                    value: data?.value,
                    address: id,
                },
            );
            const final = await (window as any)?.ethereum.request({
                method: "eth_sendTransaction",
                params: [res],
            });
            console.log(final);
            const { docs }: any = await axiosClient.post(
                "/campaigns/contribute-campaign-fb",
                {
                    walletAddr: accounts,
                    value: data?.value,
                    address: id,
                },
            );
            console.log(docs);
            setAmountInUSD(null);
            reset(
                {},
                {
                    keepValues: false,
                },
            );
            setIsSubmitted(true);
            setError("");
            router.push(`/campaign/${id}`);
        } catch (err) {
            setError((err as any).message);
            console.log(err);
        }
    }
    async function handleOnChange(e: any) {
        if (
            parseFloat(e.target.value) >=
            parseFloat(web3.utils.fromWei(minimumContribution, "ether"))
        ) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
        setAmountInUSD(Math.abs(e.target.value as any));
    }
    useEffect(() => {
        const authenticateUser = async () => {
            const auth = getAuth(firebaseClient);
            console.log(auth);
            auth.onAuthStateChanged(async (user) => {
                console.log(user);
                await wallet.connect("injected");
            });
        };
        authenticateUser();
    }, []);
    return (
        <div>
            <Head>
                <title>Campaign Details</title>
                <meta
                    name="description"
                    content="Create a Withdrawal Request"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            {isSubmitted ? <Confetti width={width} height={height} /> : null}
            <main>
                {" "}
                <Box position={"relative"}>
                    {isSubmitted ? (
                        <Container
                            maxW={"7xl"}
                            gridColumn={{ base: 1, md: 2 }}
                            py={{ base: 6 }}
                        >
                            <Alert status="success" mt="2">
                                <AlertIcon />
                                <AlertDescription mr={2}>
                                    {" "}
                                    Thank You for your Contribution 🙏
                                </AlertDescription>
                                <CloseButton
                                    position="absolute"
                                    right="8px"
                                    top="8px"
                                    onClick={() => setIsSubmitted(false)}
                                />
                            </Alert>
                        </Container>
                    ) : null}
                    <Container
                        as={SimpleGrid}
                        maxW={"7xl"}
                        columns={{ base: 1, md: 2 }}
                        spacing={{ base: 10, lg: 32 }}
                        py={{ base: 6 }}
                    >
                        <Stack spacing={{ base: 6 }}>
                            <Heading
                                lineHeight={1.1}
                                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                            >
                                {name}
                            </Heading>
                            <Text
                                color={useColorModeValue(
                                    "gray.500",
                                    "gray.200",
                                )}
                                fontSize={{ base: "lg" }}
                            >
                                {description}
                            </Text>
                            <Link
                                color="teal.500"
                                href={`https://rinkeby.etherscan.io/address/${id}`}
                                isExternal
                            >
                                View on Rinkeby Etherscan{" "}
                                <ExternalLinkIcon mx="2px" />
                            </Link>
                            <Box mx={"auto"} w={"full"}>
                                <SimpleGrid
                                    columns={{ base: 1 }}
                                    spacing={{ base: 5 }}
                                >
                                    <StatCard
                                        title={"Minimum Contribution"}
                                        stat={`${web3.utils.fromWei(
                                            minimumContribution,
                                            "ether",
                                        )} ETH ($${getWEIPriceInUSD(
                                            ETHPrice,
                                            minimumContribution,
                                        )})`}
                                        info={
                                            "You must contribute at least this much in Wei ( 1 ETH = 10 ^ 18 Wei) to become an approver"
                                        }
                                    />
                                    <StatCard
                                        title={"Date Created"}
                                        stat={DateTime.fromISO(
                                            dateCreated,
                                        ).toFormat("MM-dd-yyyy HH:mm:ss")}
                                        info={
                                            "The date created of the campaign"
                                        }
                                    />
                                    <StatCard
                                        title={
                                            "Wallet Address of Campaign Creator"
                                        }
                                        stat={manager}
                                        info={
                                            "The Campaign Creator created the campaign and can create requests to withdraw money."
                                        }
                                    />
                                    <StatCard
                                        title={"Number of Requests"}
                                        stat={requestsCount}
                                        info={
                                            "A request tries to withdraw money from the contract. Requests must be approved by approvers"
                                        }
                                    />
                                    <StatCard
                                        title={"Number of Approvers"}
                                        stat={approversCount}
                                        info={
                                            "Number of people who have already donated to this campaign"
                                        }
                                    />
                                </SimpleGrid>
                            </Box>
                        </Stack>
                        <Stack spacing={{ base: 4 }}>
                            <Stack
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow={"lg"}
                                rounded={"xl"}
                                p={{ base: 4, sm: 6, md: 8 }}
                                spacing={4}
                            >
                                <AspectRatio
                                    maxW="500px"
                                    maxH="150px"
                                    ratio={4 / 3}
                                >
                                    <Img
                                        src={image}
                                        alt={`Picture of ${name}`}
                                        roundedTop="lg"
                                        objectFit="cover"
                                        w="full"
                                        h="full"
                                        display="block"
                                    />
                                </AspectRatio>
                            </Stack>
                            <Box>
                                <Stat
                                    bg={useColorModeValue("white", "gray.700")}
                                    boxShadow={"lg"}
                                    rounded={"xl"}
                                    p={{ base: 4, sm: 6, md: 8 }}
                                    //spacing={{ base: 8 }}
                                >
                                    <StatLabel fontWeight={"medium"}>
                                        <Text as="span" isTruncated mr={2}>
                                            {" "}
                                            Campaign Balance
                                        </Text>
                                        <Tooltip
                                            label="The balance is how much money this campaign has left to
                                        spend."
                                            bg={useColorModeValue(
                                                "white",
                                                "gray.700",
                                            )}
                                            placement={"top"}
                                            color={useColorModeValue(
                                                "gray.800",
                                                "white",
                                            )}
                                            fontSize={"1em"}
                                            px="4"
                                        >
                                            <InfoIcon
                                                color={useColorModeValue(
                                                    "teal.800",
                                                    "white",
                                                )}
                                            />
                                        </Tooltip>
                                    </StatLabel>
                                    <StatNumber>
                                        <Box
                                            fontSize={"2xl"}
                                            isTruncated
                                            maxW={{ base: "	15rem", sm: "sm" }}
                                            pt="2"
                                        >
                                            <Text as="span" fontWeight={"bold"}>
                                                {balance > 0
                                                    ? web3.utils.fromWei(
                                                          balance,
                                                          "ether",
                                                      )
                                                    : "0, Become a Donor 😄"}
                                            </Text>
                                            <Text
                                                as="span"
                                                display={
                                                    balance > 0
                                                        ? "inline"
                                                        : "none"
                                                }
                                                pr={2}
                                                fontWeight={"bold"}
                                            >
                                                {" "}
                                                ETH
                                            </Text>
                                            <Text
                                                as="span"
                                                fontSize="lg"
                                                display={
                                                    balance > 0
                                                        ? "inline"
                                                        : "none"
                                                }
                                                fontWeight={"normal"}
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gray.200",
                                                )}
                                            >
                                                ($
                                                {getWEIPriceInUSD(
                                                    ETHPrice,
                                                    balance,
                                                )}
                                                )
                                            </Text>
                                        </Box>

                                        <Text
                                            fontSize={"md"}
                                            fontWeight="normal"
                                        >
                                            target of{" "}
                                            {web3.utils.fromWei(
                                                target,
                                                "ether",
                                            )}{" "}
                                            ETH ($
                                            {getWEIPriceInUSD(ETHPrice, target)}
                                            )
                                        </Text>
                                        <Progress
                                            colorScheme="teal"
                                            size="sm"
                                            value={parseFloat(
                                                web3.utils.fromWei(
                                                    balance,
                                                    "ether",
                                                ),
                                            )}
                                            max={parseFloat(
                                                web3.utils.fromWei(
                                                    target,
                                                    "ether",
                                                ),
                                            )}
                                            mt={4}
                                        />
                                    </StatNumber>
                                </Stat>
                            </Box>
                            <Stack
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow={"lg"}
                                rounded={"xl"}
                                p={{ base: 4, sm: 6, md: 8 }}
                                spacing={{ base: 6 }}
                            >
                                <Heading
                                    lineHeight={1.1}
                                    fontSize={{ base: "2xl", sm: "3xl" }}
                                    color={useColorModeValue(
                                        "teal.600",
                                        "teal.200",
                                    )}
                                >
                                    Contribute Now!
                                </Heading>

                                <Box mt={10}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl id="value">
                                            <FormLabel>
                                                Amount in Ether you want to
                                                contribute
                                            </FormLabel>
                                            <InputGroup>
                                                {" "}
                                                <Input
                                                    {...register("value", {
                                                        required: true,
                                                    })}
                                                    type="number"
                                                    isDisabled={
                                                        formState.isSubmitting
                                                    }
                                                    onChange={(e) => {
                                                        handleOnChange(e);
                                                    }}
                                                    step="any"
                                                    min="0"
                                                />{" "}
                                                <InputRightAddon children="ETH" />
                                            </InputGroup>
                                            {amountInUSD ? (
                                                <FormHelperText>
                                                    ~${" "}
                                                    {getETHPriceInUSD(
                                                        ETHPrice,
                                                        amountInUSD,
                                                    )}
                                                </FormHelperText>
                                            ) : null}
                                        </FormControl>

                                        {error ? (
                                            <Alert status="error" mt="2">
                                                <AlertIcon />
                                                <AlertDescription mr={2}>
                                                    {" "}
                                                    {error}
                                                </AlertDescription>
                                            </Alert>
                                        ) : null}

                                        <Stack spacing={10}>
                                            {wallet.status === "connected" ? (
                                                <Button
                                                    fontFamily={"heading"}
                                                    mt={4}
                                                    w={"full"}
                                                    bgGradient="linear(to-r, teal.400,green.400)"
                                                    color={"white"}
                                                    _hover={{
                                                        bgGradient:
                                                            "linear(to-r, teal.400,blue.400)",
                                                        boxShadow: "xl",
                                                    }}
                                                    isLoading={
                                                        formState.isSubmitting
                                                    }
                                                    isDisabled={disableButton}
                                                    type="submit"
                                                >
                                                    Contribute
                                                </Button>
                                            ) : (
                                                <Alert status="warning" mt={4}>
                                                    <AlertIcon />
                                                    <AlertDescription mr={2}>
                                                        Please Connect Your
                                                        Wallet to Contribute
                                                    </AlertDescription>
                                                </Alert>
                                            )}
                                        </Stack>
                                    </form>
                                </Box>
                            </Stack>

                            <Stack
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow={"lg"}
                                rounded={"xl"}
                                p={{ base: 4, sm: 6, md: 8 }}
                                spacing={4}
                            >
                                <NextLink href={`/campaign/${id}/withdrawal`}>
                                    <Button
                                        fontFamily={"heading"}
                                        w={"full"}
                                        bgGradient="linear(to-r, teal.400,green.400)"
                                        color={"white"}
                                        _hover={{
                                            bgGradient:
                                                "linear(to-r, teal.400,blue.400)",
                                            boxShadow: "xl",
                                        }}
                                    >
                                        View Withdrawal Requests
                                    </Button>
                                </NextLink>
                                <Text fontSize={"sm"}>
                                    * You can see where these funds are being
                                    used & if you have contributed you can also
                                    approve those Withdrawal Requests :)
                                </Text>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </div>
    );
};
export default CampaignSingle;
