import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import NextLinh from "next/link";
import axiosClient from "src/framework/axios";
import { getCookie } from "cookies-next";

export default function NewCampaign() {
    const [userData, setUserData] = useState({
        lastName: "",
        firstName: "",
        bio: "",
        avatar: "",
        email: "",
        phone: "",
        youtubeUrl: "",
        facebookUrl: "",
        instagramUrl: "",
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting, errors, isSubmitted },
    } = useForm({ defaultValues: userData, mode: "onChange" });
    useEffect(() => {
        const fetchUserData = async () => {
            const { user }: any = await axiosClient.get("/users/get-profile");
            reset(user.user);
            setUserData(user);
        };
        fetchUserData();
    }, []);
    const [error, setError] = useState("");

    async function onSubmit(data: any) {
        console.log(
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.bio,
            data.avatar,
            data.youtubeUrl,
            data.facebookUrl,
            data.instagramUrl,
        );
        try {
            setError("");
            const res = await axiosClient.put("/users/update-user-profile", {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                bio: data.bio,
                avatar: data.avatar || "https://picsum.photos/100/200",
                youtubeUrl: data.youtubeUrl,
                facebookUrl: data.facebookUrl,
                instagramUrl: data.instagramUrl,
            });
        } catch (err) {
            setError((err as any).message);
            console.log(err);
        }
    }
    return (
        <div>
            <Head>
                <title>Update Profile</title>
                <meta name="description" content="Update User Profile" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
                    <Text fontSize={"lg"} color={"green.400"}>
                        <ArrowBackIcon mr={2} />
                        <NextLinh href="/user">Back to Profile</NextLinh>
                    </Text>
                    <Stack>
                        <Heading fontSize={"4xl"}>Edit profile 📋</Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl id="firstName">
                                    <FormLabel>Your First Name</FormLabel>
                                    <Input
                                        {...register("firstName", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Your Last Name</FormLabel>
                                    <Input
                                        {...register("lastName", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="phone">
                                    <FormLabel>Your phone number</FormLabel>
                                    <Input
                                        type="number"
                                        step="any"
                                        {...register("phone", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Your email</FormLabel>
                                    <Input
                                        type="email"
                                        step="any"
                                        {...register("email", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="bio">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        {...register("bio", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="avatar">
                                    <FormLabel>Your avatar URL</FormLabel>
                                    <Input
                                        {...register("avatar", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="youtubeUrl">
                                    <FormLabel>Your Youtube URL</FormLabel>
                                    <Input
                                        {...register("youtubeUrl", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="facebookUrl">
                                    <FormLabel>Your Facebook URL</FormLabel>
                                    <Input
                                        {...register("facebookUrl", {
                                            required: false,
                                        })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="instagramUrl">
                                    <FormLabel>Your Instagram URL</FormLabel>
                                    <Input
                                        {...register("instagramUrl", {
                                            required: false,
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
                                    {errors.firstName ||
                                    errors.lastName ||
                                    errors.phone ||
                                    errors.email ||
                                    errors.bio ||
                                    errors.avatar ||
                                    errors.youtubeUrl ||
                                    errors.instagramUrl ||
                                    errors.facbookUrl ? (
                                        <Alert status="error">
                                            <AlertIcon />
                                            <AlertDescription mr={2}>
                                                {" "}
                                                All Fields are Required
                                            </AlertDescription>
                                        </Alert>
                                    ) : null}
                                    {isSubmitted ? (
                                        <Alert status="success" mt="2">
                                            <AlertIcon />
                                            <AlertDescription mr={2}>
                                                {" "}
                                                Profile Updated Successfully!!
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
    );
}
export async function getServerSideProps({ req, res }: any) {
    const uid = getCookie("uid", { req, res })?.toString();
    console.log(uid);
    if (!uid) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: {} };
}
