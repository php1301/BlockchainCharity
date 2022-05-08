import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
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
    Spacer,
    Table,
    Thead,
    Tbody,
    Tooltip,
    Tr,
    Th,
    Td,
    TableCaption,
    Skeleton,
    Alert,
    AlertIcon,
    AlertDescription,
    HStack,
    Stack,
    Link,
} from "@chakra-ui/react";
import {
    ArrowBackIcon,
    InfoIcon,
    CheckCircleIcon,
    WarningIcon,
} from "@chakra-ui/icons";
import { getWEIPriceInUSD } from "pages/api/getETHPrice";
import axiosClient from "src/framework/axios";
import { getETHPrice, getETHPriceInUSD } from "@libs/get-eth-price";
import web3 from "@libs/web3";
import { useWallet } from "use-wallet";
import { getAuth } from "firebase/auth";
import { firebaseClient } from "src/firebase";
import {
    isSuccessfulTransaction,
    waitTransaction,
} from "@libs/poll-confirmation";
import { getCookie } from "cookies-next";
//import web3 from "../../../../smart-contract/web3";
//import Campaign from "../../../../smart-contract/campaign";

//thêm onApprove, onFinalize trong file gốc,
//<Td>{/*request.description*/}</Td>, atr bg trong <Tr> và còn rất nhiều bên dưới,
//request.complete, disabled /*|| request.approvalCount =,
////const campaign = Campaign(campaignId), /*web3.utils.fromWei(balance, "ether")*/,
//

export async function getServerSideProps({ params, req, res }: any) {
    const cookie =
        getCookie("base", { req, res })?.toString() ||
        "http://localhost:3000/dev";
    axiosClient.defaults.baseURL = cookie;
    const campaignId = params.id;
    const { requestsCount: requestCount }: { requestsCount: any } =
        await axiosClient.get(`/campaigns/get-requests-count/${campaignId}`);
    const { approversCount }: { approversCount: any } = await axiosClient.get(
        `/campaigns/get-approvers-count/${campaignId}`,
    );
    const { summary }: any = await axiosClient.get(
        `/campaigns/get-campaign-summary/${campaignId}`,
    );
    const ETHPrice = await getETHPrice();

    return {
        props: {
            campaignId,
            requestCount,
            approversCount,
            balance: summary[1],
            name: summary[5],
            ETHPrice,
        },
    };
}

const RequestRow: React.FC<{
    id: string;
    request: any;
    approversCount: any;
    campaignId: string;
    disabled: any;
    ETHPrice: any;
    wallet: any;
    getRequests: any;
}> = ({
    id,
    request,
    approversCount,
    campaignId,
    disabled,
    ETHPrice,
    wallet,
    getRequests,
}) => {
    const router = useRouter();
    const readyToFinalize = request.approvalCount > approversCount / 2;
    const [errorMessageApprove, setErrorMessageApprove] = useState("");
    const [loadingApprove, setLoadingApprove] = useState(false);
    const [errorMessageFinalize, setErrorMessageFinalize] = useState("");
    const [loadingFinalize, setLoadingFinalize] = useState(false);
    const onApprove = async () => {
        setLoadingApprove(true);
        setErrorMessageApprove("");
        try {
            const accounts = wallet?.account;
            const { txParams }: any = await axiosClient.post(
                "/campaigns/approve-withdraw-request",
                {
                    walletAddr: accounts,
                    id,
                    campaignId,
                },
            );
            const final = await (window as any)?.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams],
            });
            const receipt = await waitTransaction(web3, final, {
                interval: 500,
                blocksToWait: 1,
            });
            const isSuccessTx = isSuccessfulTransaction(receipt);
            if (isSuccessTx) {
                const { docs }: any = await axiosClient.post(
                    "/campaigns/approve-withdraw-request-fb",
                    {
                        walletAddr: accounts,
                        id,
                        campaignId,
                    },
                );
                await getRequests();
                // router.reload();
            }
        } catch (err) {
            if ((err as any).response.status === 403) {
                setErrorMessageApprove("Not qualified to approve");
            } else {
                setErrorMessageApprove((err as any).message);
            }
        } finally {
            setLoadingApprove(false);
        }
    };

    const onFinalize = async () => {
        setLoadingFinalize(true);
        setErrorMessageFinalize("");
        setErrorMessageApprove("");
        try {
            const accounts = wallet?.account;
            const { txParams }: any = await axiosClient.post(
                "/campaigns/finalize-request",
                {
                    walletAddr: accounts,
                    id,
                    campaignId,
                },
            );
            const final = await (window as any)?.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams],
            });
            const receipt = await waitTransaction(web3, final, {
                interval: 500,
                blocksToWait: 1,
            });
            const isSuccessTx = isSuccessfulTransaction(receipt);
            if (isSuccessTx) {
                const { docs }: any = await axiosClient.post(
                    "/campaigns/finalize-request-fb",
                    {
                        id,
                        campaignId,
                    },
                );
                await getRequests();
                // router.reload();
            }
        } catch (err) {
            if ((err as any).response.status === 403) {
                setErrorMessageFinalize("Not qualified to approve");
            } else {
                setErrorMessageFinalize((err as any).message);
            }
        } finally {
            setLoadingFinalize(false);
        }
    };

    return (
        <Tr
            bg={
                readyToFinalize && !request.complete
                    ? useColorModeValue("teal.100", "teal.700")
                    : useColorModeValue("gray.100", "gray.700")
            }
            opacity={request.complete ? "0.4" : "1"}
        >
            <Td>{id}</Td>
            <Td>{request.description}</Td>
            <Td isNumeric>
                {request.value}ETH ($
                {getETHPriceInUSD(ETHPrice, request.value)})
            </Td>
            <Td>
                <Link
                    color="teal.500"
                    href={`https://rinkeby.etherscan.io/address/${request.recipient}`}
                    isExternal
                >
                    {" "}
                    {request?.recipient?.slice(0, 10) + "..."}
                </Link>
            </Td>
            <Td>
                {request.approvalCount}/{approversCount}
            </Td>
            <Td>
                <HStack spacing={2}>
                    <Tooltip
                        label={errorMessageApprove}
                        bg={useColorModeValue("white", "gray.700")}
                        placement={"top"}
                        color={useColorModeValue("gray.800", "white")}
                        fontSize={"1em"}
                    >
                        <WarningIcon
                            color={useColorModeValue("red.600", "red.300")}
                            display={
                                errorMessageApprove ? "inline-block" : "none"
                            }
                        />
                    </Tooltip>
                    {request.complete ? (
                        <Tooltip
                            label="This Request has been finalized & withdrawn to the recipient,it may then have less no of approvers"
                            bg={useColorModeValue("white", "gray.700")}
                            placement={"top"}
                            color={useColorModeValue("gray.800", "white")}
                            fontSize={"1em"}
                        >
                            <CheckCircleIcon
                                color={useColorModeValue(
                                    "green.600",
                                    "green.300",
                                )}
                            />
                        </Tooltip>
                    ) : (
                        <Button
                            colorScheme="yellow"
                            variant="outline"
                            _hover={{
                                bg: "yellow.600",
                                color: "white",
                            }}
                            onClick={onApprove}
                            isDisabled={
                                request.approvalCount === approversCount
                            }
                            isLoading={loadingApprove}
                        >
                            Approve
                        </Button>
                    )}
                </HStack>
            </Td>
            <Td>
                <Tooltip
                    label={errorMessageFinalize}
                    bg={useColorModeValue("white", "gray.700")}
                    placement={"top"}
                    color={useColorModeValue("gray.800", "white")}
                    fontSize={"1em"}
                >
                    <WarningIcon
                        color={useColorModeValue("red.600", "red.300")}
                        display={errorMessageFinalize ? "inline-block" : "none"}
                        mr="2"
                    />
                </Tooltip>
                {request.complete ? (
                    <Tooltip
                        label="This Request has been finalized & withdrawn to the recipient,it may then have less no of approvers"
                        bg={useColorModeValue("white", "gray.700")}
                        placement={"top"}
                        color={useColorModeValue("gray.800", "white")}
                        fontSize={"1em"}
                    >
                        <CheckCircleIcon
                            color={useColorModeValue("green.600", "green.300")}
                        />
                    </Tooltip>
                ) : (
                    <HStack spacing={2}>
                        <Button
                            colorScheme="green"
                            variant="outline"
                            _hover={{
                                bg: "green.600",
                                color: "white",
                            }}
                            isDisabled={!request.complete && !readyToFinalize}
                            onClick={onFinalize}
                            isLoading={loadingFinalize}
                        >
                            Finalize
                        </Button>

                        <Tooltip
                            label="This Request is ready to be Finalized because it has been approved by 50% Approvers"
                            bg={useColorModeValue("white", "gray.700")}
                            placement={"top"}
                            color={useColorModeValue("gray.800", "white")}
                            fontSize={"1.2em"}
                        >
                            <InfoIcon
                                as="span"
                                color={useColorModeValue("teal.800", "white")}
                                display={
                                    readyToFinalize && !request.complete
                                        ? "inline-block"
                                        : "none"
                                }
                            />
                        </Tooltip>
                    </HStack>
                )}
            </Td>
        </Tr>
    );
};

interface withdrawalInfo {
    campaignId: string;
    requestCount: any;
    approversCount: any;
    balance: any;
    name: string;
    ETHPrice: any;
}

export default function Withdrawal({
    campaignId,
    requestCount,
    balance,
    name,
    ETHPrice,
    approversCount,
}: withdrawalInfo) {
    const [requestsList, setRequestsList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [FundNotAvailable, setFundNotAvailable] = useState(false);
    const wallet = useWallet();
    useEffect(() => {
        const authenticateUser = async () => {
            const auth = getAuth(firebaseClient);
            auth.onAuthStateChanged(async (user) => {
                if (user) await wallet.connect("injected");
                else {
                    wallet.reset();
                }
            });
        };
        authenticateUser();
    }, []);
    async function getRequests() {
        try {
            const { requests }: any = await axiosClient.get(
                `/campaigns/get-campaign-requests/${campaignId}/1`,
            );

            setRequestsList(requests);
            setIsLoading(false);
            return requests;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (balance === 0) {
            setFundNotAvailable(true);
        }
        getRequests();
    }, []);

    return (
        <div>
            <Head>
                <title>Campaign Withdrawal Requests</title>
                <meta
                    name="description"
                    content="Create a Withdrawal Request"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <main>
                <Container
                    px={{ base: "4", md: "12" }}
                    maxW={"7xl"} /*align={"left"}*/
                >
                    <Flex flexDirection={{ base: "column", md: "row" }} py={4}>
                        <Box py="4">
                            <Text fontSize={"lg"} color={"teal.400"}>
                                <ArrowBackIcon mr={2} />
                                <NextLink href={`/campaign/${campaignId}`}>
                                    Back to Campaign
                                </NextLink>
                            </Text>
                        </Box>
                        <Spacer />
                        <Box py="4">
                            Campaign Balance :{" "}
                            <Text as="span" fontWeight={"bold"} fontSize="lg">
                                {balance > 0
                                    ? web3.utils.fromWei(balance, "ether")
                                    : "0, Become a Donor 😄"}
                            </Text>
                            <Text
                                as="span"
                                display={balance > 0 ? "inline" : "none"}
                                pr={2}
                                fontWeight={"bold"}
                                fontSize="lg"
                            >
                                {" "}
                                ETH
                            </Text>
                            <Text
                                as="span"
                                display={balance > 0 ? "inline" : "none"}
                                fontWeight={"normal"}
                                color={useColorModeValue(
                                    "gray.500",
                                    "gray.200",
                                )}
                            >
                                ($
                                {getWEIPriceInUSD(ETHPrice, balance)})
                            </Text>
                        </Box>
                    </Flex>
                    {FundNotAvailable ? (
                        <Alert status="error" my={4}>
                            <AlertIcon />
                            <AlertDescription>
                                The Current Balance of the Campaign is 0, Please
                                Contribute to approve and finalize Requests.
                            </AlertDescription>
                        </Alert>
                    ) : null}
                </Container>
                {requestsList.length > 0 ? (
                    <Container
                        px={{ base: "4", md: "12" }}
                        maxW={"7xl"} /*align={"left"}*/
                    >
                        <Flex
                            flexDirection={{ base: "column", lg: "row" }}
                            py={4}
                        >
                            <Box py="2" pr="2">
                                <Heading
                                    textAlign={useBreakpointValue({
                                        base: "left",
                                    })}
                                    fontFamily={"heading"}
                                    color={useColorModeValue(
                                        "gray.800",
                                        "white",
                                    )}
                                    as="h3"
                                    isTruncated
                                    maxW={"3xl"}
                                >
                                    Withdrawal Requests for {name} Campaign
                                </Heading>
                            </Box>
                            <Spacer />
                            <Box py="2">
                                <NextLink
                                    href={`/campaign/${campaignId}/withdrawal/new`}
                                >
                                    <Button
                                        display={{ sm: "inline-flex" }}
                                        //justify={"flex-end"}
                                        fontSize={"md"}
                                        fontWeight={600}
                                        color={"white"}
                                        bg={"teal.400"}
                                        //href={"#"}
                                        _hover={{
                                            bg: "teal.300",
                                        }}
                                    >
                                        Add Withdrawal Request
                                    </Button>
                                </NextLink>
                            </Box>
                        </Flex>{" "}
                        <Box overflowX="auto">
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th w="30%">Description</Th>
                                        <Th isNumeric>Amount</Th>
                                        <Th maxW="12%" isTruncated>
                                            Recipient Wallet Address
                                        </Th>
                                        <Th>Approval Count </Th>
                                        <Th>Approve </Th>
                                        <Th>Finalize </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {requestsList.map(
                                        (request: any, index: number) => {
                                            return (
                                                <RequestRow
                                                    key={index}
                                                    id={index.toString()}
                                                    request={request}
                                                    approversCount={
                                                        approversCount
                                                    }
                                                    campaignId={campaignId}
                                                    disabled={FundNotAvailable}
                                                    ETHPrice={ETHPrice}
                                                    wallet={wallet}
                                                    getRequests={getRequests}
                                                />
                                            );
                                        },
                                    )}
                                </Tbody>
                                <TableCaption textAlign="left" ml="-2">
                                    Found {requestCount} Requests
                                </TableCaption>
                            </Table>
                        </Box>
                    </Container>
                ) : (
                    <div>
                        <Container
                            px={{ base: "4", md: "12" }}
                            maxW={"7xl"}
                            //align={"left"}
                            display={isLoading ? "block" : "none"}
                        >
                            <SimpleGrid row={{ base: 3 }} spacing={2}>
                                <Skeleton height="2rem" />
                                <Skeleton height="5rem" />
                                <Skeleton height="5rem" />
                                <Skeleton height="5rem" />
                            </SimpleGrid>
                        </Container>
                        <Container
                            maxW={"lg"}
                            //align={"center"}
                            display={
                                requestsList.length === 0 && !isLoading
                                    ? "block"
                                    : "none"
                            }
                        >
                            <SimpleGrid spacing={2} alignContent="center">
                                <Stack align="center">
                                    <NextImage
                                        src="/static/no-requests.png"
                                        alt="no-request"
                                        width="150"
                                        height="150"
                                    />
                                </Stack>
                                <Heading
                                    textAlign={"center"}
                                    color={useColorModeValue(
                                        "gray.800",
                                        "white",
                                    )}
                                    as="h4"
                                    size="md"
                                >
                                    No Requests yet for {name} Campaign
                                </Heading>
                                <Text
                                    textAlign={useBreakpointValue({
                                        base: "center",
                                    })}
                                    color={useColorModeValue(
                                        "gray.600",
                                        "gray.300",
                                    )}
                                    fontSize="sm"
                                >
                                    Create a Withdrawal Request to Withdraw
                                    funds from the Campaign😄
                                </Text>

                                <Button
                                    fontSize={"md"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"teal.400"}
                                    _hover={{
                                        bg: "teal.300",
                                    }}
                                >
                                    <NextLink
                                        href={`/campaign/${campaignId}/withdrawal/new`}
                                    >
                                        Create Withdrawal Request
                                    </NextLink>
                                </Button>

                                <Button
                                    fontSize={"md"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"gray.400"}
                                    _hover={{
                                        bg: "gray.300",
                                    }}
                                >
                                    <NextLink href={`/campaign/${campaignId}/`}>
                                        Go to Campaign
                                    </NextLink>
                                </Button>
                            </SimpleGrid>
                        </Container>
                    </div>
                )}
            </main>
        </div>
    );
}
