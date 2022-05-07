import Head from "next/head";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useWallet } from "use-wallet";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputRightAddon,
    InputGroup,
    Alert,
    AlertIcon,
    AlertDescription,
    FormHelperText,
    Textarea,
} from "@chakra-ui/react";
import { useAsync } from "react-use";
import {
    getETHPrice,
    getETHPriceInUSD,
    getWEIPriceInUSD,
} from "@libs/get-eth-price";
import axiosClient from "src/framework/axios";
import web3 from "@libs/web3";
import { syncWallet } from "@libs/sync-wallet";
import { getAuth } from "firebase/auth";
import { firebaseClient } from "src/firebase";

//sửa useAsync, async function onSubmit,
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
            campaignId,
            balance: summary[1],
            name: summary[5],
            ETHPrice,
        },
    };
}
export default function NewWithdrawal({
    balance,
}: {
    balance: string & number;
}) {
    const router = useRouter();
    const { id } = router.query;
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
    } = useForm({
        mode: "onChange",
    });
    const [error, setError] = useState("");
    const [inUSD, setInUSD] = useState(0);
    const [ETHPrice, setETHPrice] = useState<any>(0);
    const wallet = useWallet();

    useAsync(async () => {
        try {
            const result = await getETHPrice();
            setETHPrice(result);
        } catch (error) {
            console.log(error);
        }
    }, []);

    async function onSubmit(data: any) {
        console.log(data);
        // if (
        //     parseFloat(data?.value) >
        //     parseFloat(web3.utils.fromWei(balance, "ether"))
        // ) {
        //     console.log(parseFloat(web3.utils.fromWei(balance, "ether")));
        //     setError("Not enough funds");
        // } else {
        try {
            const accounts = wallet?.account;
            setError("");
            const { txParams }: any = await axiosClient.post(
                "/campaigns/create-withdraw-request",
                {
                    description: data?.description,
                    walletAddr: accounts,
                    value: data?.value,
                    address: id,
                    recipient: data?.recipient,
                },
            );
            console.log(txParams);
            const final = await (window as any)?.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams],
            });
            console.log(final);
            const { docs }: any = await axiosClient.post(
                "/campaigns/create-withdraw-request-fb",
                {
                    description: data?.description,
                    walletAddr: accounts,
                    value: data?.value,
                    campaignId: id,
                    recipient: data?.recipient,
                    txHash: final,
                },
            );
            console.log(docs);
            router.push(`/campaign/${id}/withdrawal`);
        } catch (err) {
            setError((err as any).message);
            console.log(err);
        }
        // }
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
                <title>Create a Withdrawal Request</title>
                <meta
                    name="description"
                    content="Create a Withdrawal Request"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
                    <Text
                        fontSize={"lg"}
                        color={"teal.400"}
                        justifyContent="center"
                    >
                        <ArrowBackIcon mr={2} />
                        <NextLink href={`/campaign/${id}/withdrawal`}>
                            Back to Requests
                        </NextLink>
                    </Text>
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
                            color={useColorModeValue("gray.500", "gray.200")}
                        >
                            ($
                            {getWEIPriceInUSD(ETHPrice, balance)})
                        </Text>
                    </Box>
                    <Stack>
                        <Heading fontSize={"4xl"}>
                            Create a Withdrawal Request 💸
                        </Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl id="description">
                                    <FormLabel>Request Description</FormLabel>
                                    <Textarea
                                        {...register("description", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="value">
                                    <FormLabel>Amount in Ether</FormLabel>
                                    <InputGroup>
                                        {" "}
                                        <Input
                                            type="number"
                                            {...register("value", {
                                                required: true,
                                            })}
                                            isDisabled={isSubmitting}
                                            onChange={(e) => {
                                                setInUSD(
                                                    Math.abs(
                                                        e.target.value as any,
                                                    ),
                                                );
                                            }}
                                            step="any"
                                        />{" "}
                                        <InputRightAddon children="ETH" />
                                    </InputGroup>
                                    {inUSD ? (
                                        <FormHelperText>
                                            ~${" "}
                                            {getETHPriceInUSD(ETHPrice, inUSD)}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>

                                <FormControl id="recipient">
                                    <FormLabel htmlFor="recipient">
                                        Recipient Ethereum Wallet Address
                                    </FormLabel>
                                    <Input
                                        //name="recipient"
                                        {...register("recipient", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                {errors.description ||
                                errors.value ||
                                errors.recipient ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {" "}
                                            All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}
                                {error ? (
                                    <Alert status="error">
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
                                            bg={"teal.400"}
                                            color={"white"}
                                            _hover={{
                                                bg: "teal.500",
                                            }}
                                            isLoading={isSubmitting}
                                            type="submit"
                                        >
                                            Create Withdrawal Request
                                        </Button>
                                    ) : (
                                        <Stack spacing={3}>
                                            <Button
                                                color={"white"}
                                                bg={"teal.400"}
                                                _hover={{
                                                    bg: "teal.300",
                                                }}
                                                onClick={() =>
                                                    syncWallet(wallet)
                                                }
                                            >
                                                Connect Wallet{" "}
                                            </Button>
                                            <Alert status="warning">
                                                <AlertIcon />
                                                <AlertDescription mr={2}>
                                                    Please Connect Your Wallet
                                                    First to Create a Campaign
                                                </AlertDescription>
                                            </Alert>
                                        </Stack>
                                    )}
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </main>
        </div>
    );
}
