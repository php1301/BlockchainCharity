import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-use";
import { getETHPrice, getETHPriceInUSD } from "@libs/get-eth-price";
import Head from "next/head";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import NextLinh from "next/link";
import { useWallet } from "use-wallet";
import { getAuth } from "firebase/auth";
import { firebaseClient } from "src/firebase";
import web3 from "@libs/web3";
import axiosClient from "src/framework/axios";
// import factory from "@libs/factory";
import { syncWallet } from "@libs/sync-wallet";
import { waitTransaction } from "@libs/poll-confirmation";
//import factory from "../../smart-contract/factory";
//import web3 from "../../smart-contract/web3";

//sua wallet, form submit, setTargetInUSD(Math.abs(e.target.value));setMinContriInUSD(Math.abs(e.target.value))

export default function NewCampaign() {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
    } = useForm({
        mode: "onChange",
    });

    const router = useRouter();
    const [error, setError] = useState("");
    const wallet = useWallet();
    const [minContriInUSD, setMinContriInUSD] = useState<number>();
    const [targetInUSD, setTargetInUSD] = useState<number>();
    const [ETHPrice, setETHPrice] = useState(0);
    const [roadmaps, setRoadmaps] = useState([
        { name: "", date: "", description: "" },
    ]);

    useAsync(async () => {
        try {
            const result: any = await getETHPrice();
            setETHPrice(result);
        } catch (error) {
            console.log(error);
        }
    }, []);
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
    async function onSubmit(data: any) {
        console.log(
            data.minimumContribution,
            data.campaignName,
            data.description,
            data.imageUrl,
            data.target,
            roadmaps,
        );
        try {
            // const accounts = await web3.eth.getAccounts();
            // await factory.methods
            //     .createCampaign(
            //         web3.utils.toWei(data.minimumContribution, "ether"),
            //         data.campaignName,
            //         data.description,
            //         "https://picsum.photos/200/300" || data.imageUrl,
            //         web3.utils.toWei(data.target, "ether"),
            //     )
            //     .send({
            //         from: accounts[0],
            //     });

            // router.push("/");
            // const accounts = await web3.eth.getAccounts();
            setError("");
            const accounts = wallet?.account;
            const date = new Date();
            const timestamp = Number(date);
            const today = date.toISOString();
            const { txParams: res }: { txParams: any } = await axiosClient.post(
                "/campaigns/create-campaign",
                {
                    minimumContribution: data.minimumContribution,
                    campaignName: data.campaignName,
                    description: data.description,
                    imageUrl: data.imageUrl || "https://picsum.photos/200/300",
                    target: data.target,
                    walletAddr: accounts,
                    date: today,
                },
            );
            const final = await (window as any)?.ethereum.request({
                method: "eth_sendTransaction",
                params: [res],
            });
            // const receipt = await web3.eth.getTransactionReceipt(final);
            // console.log(receipt);
            const receipt = await waitTransaction(web3, final, {
                interval: 500,
                blocksToWait: 1,
            });
            const campaignId = web3.eth.abi.decodeParameters(
                ["address"],
                receipt?.logs[0]?.data,
            )["0"];
            const { docs }: any = await axiosClient.post(
                "/campaigns/create-campaign-fb",
                {
                    minimumContribution: data.minimumContribution,
                    campaignName: data.campaignName,
                    description: data.description,
                    // imageUrl: data.imageUrl,
                    imageUrl: "https://picsum.photos/200/300",
                    target: data.target,
                    walletAddr: accounts,
                    campaignId,
                    txHash: final,
                    date: today,
                    roadmap: roadmaps || [],
                    timestamp,
                },
            );
            router.push(`/campaign/${campaignId}`);
        } catch (err) {
            setError((err as any).message);
            console.log(err);
        }
    }

    return (
        <div>
            <Head>
                <title>New Campaign</title>
                <meta name="description" content="Create New Campaign" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
                    <Text fontSize={"lg"} color={"green.400"}>
                        <ArrowBackIcon mr={2} />
                        <NextLinh href="/">Back to Home</NextLinh>
                    </Text>
                    <Stack>
                        <Heading fontSize={"4xl"}>
                            Create a New Campaign ????
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
                                <FormControl id="minimumContribution">
                                    <FormLabel>
                                        Minimum Contribution Amount
                                    </FormLabel>
                                    <InputGroup>
                                        {" "}
                                        <Input
                                            type="number"
                                            step="any"
                                            {...register(
                                                "minimumContribution",
                                                { required: true },
                                            )}
                                            isDisabled={isSubmitting}
                                            onChange={(e) => {
                                                setMinContriInUSD(
                                                    Math.abs(
                                                        parseFloat(
                                                            e.target.value,
                                                        ),
                                                    ),
                                                );
                                            }}
                                        />{" "}
                                        <InputRightAddon children="ETH" />
                                    </InputGroup>
                                    {minContriInUSD ? (
                                        <FormHelperText>
                                            ~${" "}
                                            {getETHPriceInUSD(
                                                ETHPrice,
                                                minContriInUSD,
                                            )}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                                <FormControl id="campaignName">
                                    <FormLabel>Campaign Name</FormLabel>
                                    <Input
                                        {...register("campaignName", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel>Campaign Description</FormLabel>
                                    <Textarea
                                        {...register("description", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="imageUrl">
                                    <FormLabel>Image URL</FormLabel>
                                    <Input
                                        {...register("imageUrl", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="target">
                                    <FormLabel>Target Amount</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type="number"
                                            step="any"
                                            {...register("target", {
                                                required: true,
                                            })}
                                            isDisabled={isSubmitting}
                                            onChange={(e) => {
                                                setTargetInUSD(
                                                    Math.abs(
                                                        parseFloat(
                                                            e.target.value,
                                                        ),
                                                    ),
                                                );
                                            }}
                                        />
                                        <InputRightAddon children="ETH" />
                                    </InputGroup>
                                    {targetInUSD ? (
                                        <FormHelperText>
                                            ~${" "}
                                            {getETHPriceInUSD(
                                                ETHPrice,
                                                targetInUSD,
                                            )}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                                <Text>Roadmap:</Text>

                                {roadmaps.map((roadmap, index) => {
                                    return (
                                        <div>
                                            <Box
                                                rounded={"lg"}
                                                bg={useColorModeValue(
                                                    "white",
                                                    "gray.700",
                                                )}
                                                boxShadow={"lg"}
                                                p={8}
                                            >
                                                <FormControl
                                                    id="roadmap"
                                                    px={4}
                                                >
                                                    <Text p={0}>
                                                        Roadmap {index + 1}:
                                                    </Text>
                                                    <FormLabel>Name</FormLabel>
                                                    <Input
                                                        value={roadmap.name}
                                                        onChange={(
                                                            event: any,
                                                        ) => {
                                                            const value = [
                                                                ...roadmaps,
                                                            ];
                                                            value[index].name =
                                                                event.target.value;
                                                            setRoadmaps(value);
                                                        }}
                                                    />
                                                    <FormLabel>Date</FormLabel>
                                                    <Input
                                                        type="date"
                                                        value={roadmap.date}
                                                        onChange={(
                                                            event: any,
                                                        ) => {
                                                            const value = [
                                                                ...roadmaps,
                                                            ];
                                                            value[index].date =
                                                                event.target.value;
                                                            setRoadmaps(value);
                                                        }}
                                                    />
                                                    <FormLabel>
                                                        Description
                                                    </FormLabel>
                                                    <Input
                                                        value={
                                                            roadmap.description
                                                        }
                                                        onChange={(
                                                            event: any,
                                                        ) => {
                                                            const value = [
                                                                ...roadmaps,
                                                            ];
                                                            value[
                                                                index
                                                            ].description =
                                                                event.target.value;
                                                            setRoadmaps(value);
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        color={"teal.400"}
                                                        _hover={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            const value = [
                                                                ...roadmaps,
                                                            ];
                                                            value.splice(
                                                                index,
                                                                1,
                                                            );
                                                            setRoadmaps(value);
                                                        }}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </div>
                                    );
                                })}
                                <Button
                                    color={"white"}
                                    bg={"teal.400"}
                                    _hover={{
                                        bg: "teal.300",
                                    }}
                                    onClick={() =>
                                        setRoadmaps([
                                            ...roadmaps,
                                            {
                                                name: "",
                                                date: "",
                                                description: "",
                                            },
                                        ])
                                    }
                                >
                                    Add new roadmap
                                </Button>

                                {error ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                ) : null}
                                {errors.minimumContribution ||
                                errors.name ||
                                errors.description ||
                                errors.imageUrl ||
                                errors.target ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {" "}
                                            All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}
                                <Stack spacing={10}>
                                    {wallet.status === "connected" ? (
                                        <Button
                                            bg={"green.400"}
                                            color={"white"}
                                            _hover={{
                                                bg: "green.500",
                                            }}
                                            isLoading={isSubmitting}
                                            type="submit"
                                        >
                                            Create
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
