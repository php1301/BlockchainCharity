import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
        { name: '', phone: '', description: '', avatar: '', youtube: '', facebook: '' },
    ])

    useAsync(async () => {
        try {
            const result: any = await getETHPrice();
            setETHPrice(result);
        } catch (error) {
            console.log(error);
        }
    }, []);

    async function onSubmit(data: any) {
        console.log(
            data.name,
            data.phone,
            data.description,
            data.avatarUrl,
            data.youtubeURL,
            data.facebookURL,
            data.twitterURL,
        );
        // try {
        //     const accounts = await web3.eth.getAccounts();
        //     await factory.methods
        //         .createCampaign(
        //             web3.utils.toWei(data.minimumContribution, "ether"),
        //             data.campaignName,
        //             data.description,
        //             data.imageUrl,
        //             web3.utils.toWei(data.target, "ether"),
        //         )
        //         .send({
        //             from: accounts[0],
        //         });

        //     router.push("/");
        // } catch (err) {
        //     setError(err.message);
        //     console.log(err);
        // }
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
                            Edit profile 📋
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
                                <FormControl id="name">
                                    <FormLabel>
                                        Your name
                                    </FormLabel>
                                    <Input
                                        {...register("name", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="phone">
                                    <FormLabel>
                                        Your phone number
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        step="any"
                                        {...register("phone", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        {...register("description", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="avatarUrl">
                                    <FormLabel>Your avatar URL</FormLabel>
                                    <Input
                                        {...register("avatarUrl", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="youtubeUrl">
                                    <FormLabel>Your Youtube URL</FormLabel>
                                    <Input
                                        {...register("youtubeUrl", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="facebookUrl">
                                    <FormLabel>Your Facebook URL</FormLabel>
                                    <Input
                                        {...register("facebookUrl", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="facebookUrl">
                                    <FormLabel>Your Twitter URL</FormLabel>
                                    <Input
                                        {...register("twitterUrl", {
                                            required: true,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button
                                        bg={"green.400"}
                                        color={"white"}
                                        _hover={{
                                            bg: "green.500",
                                        }}
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Done
                                    </Button>
                                    {error ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                ) : null}
                                {errors.name ||
                                errors.phone ||
                                errors.description ||
                                errors.avatarUrl ||
                                errors.youtubeUrl ||
                                errors.twitterUrl ||
                                errors.facbookUrl ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {" "}
                                            All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </main>
        </div>
    )
}

