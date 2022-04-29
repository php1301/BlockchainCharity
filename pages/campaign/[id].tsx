import Head from "next/head";
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import NextLink from "next/link";
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
    HStack,
    SkeletonCircle,
    Divider,
    Skeleton,
    Img,
    Flex,
 } from "@chakra-ui/react";
import { ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import { StatCard } from "@components/statCard";
import { getWEIPriceInUSD, getETHPriceInUSD } from "pages/api/getETHPrice";

//import web3 from "../../smart-contract/web3";
//import Campaign from "../../smart-contract/campaign";
//Sua web3 "become a donnor", web3 "target of", web3 <Progress> form onsubmit, "Amount in Ether you want to contribute", button "contribute"

/*export async function getServerSideProps({ params }) {
    const campaignId = params.id;
    const campaign = Campaign(campaignId);
    const summary = await campaign.methods.getSummary().call();
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
        target: summary[8],
        ETHPrice,
      },
    };
  }*/

interface propsCampaiggnSingle {
    id: any
    minimumContribution: any
    balance: any
    requestsCount: any
    approversCount: any
    manager: any
    name: string
    description: string
    image: string
    target: any
    ETHPrice: any
}

const CampaignCard: React.FC<{
    name: string;
    date: string;
    description: string;
}> = (props) => {
    return (
        <Tooltip 
            label={props.name +": "+ props.description}
            bg={useColorModeValue("white", "gray.700")}
            placement={"top"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"1em"}
        >
            <Box
                bg={useColorModeValue("white", "gray.800")}
                maxW={{ md: "sm" }}
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                alignItems="center"
                justifyContent="center"
                transition={"transform 0.3s ease"}
                _hover={{
                    transform: "translateY(-8px)",
                }}
            >
                <Box p="6">
                    <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                    >
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {props.name}
                        </Box>

                    </Flex>
                    <Flex alignContent="center" >
                        <Heading size="base" isTruncated>
                            on: {props.date}
                        </Heading>
                    </Flex>
                    <Flex direction="row" py={2}>
                        <Box w="full">
                            <Box
                                fontSize={"2xl"}
                                isTruncated
                                maxW={{ base: "	15rem", sm: "sm" }}
                            >
                                <Text
                                    as="span"
                                    fontSize="lg"
                                    display="inline"
                                    fontWeight={"normal"}
                                    color={useColorModeValue(
                                        "gray.500",
                                        "gray.200",
                                    )}
                                >
                                    {props.description}
                                </Text>
                            </Box>
                        </Box>{" "}
                    </Flex>
                </Box>
            </Box>
        </Tooltip>
    );
};

export default function CampaignSingle(props: propsCampaiggnSingle) {
    const { handleSubmit, register, formState, reset, getValues } = useForm({
        mode: "onChange",
      });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [amountInUSD, setAmountInUSD] = useState();
    const wallet = useState(false); //useWallet();
    const router = useRouter();
    const { width, height } = useWindowSize();
    const [roadmaps, setRoadmaps] = useState([
        {name: 'Buy food', date: '1/1/2022', description: 'so we need to buy some food for the children who does not have any food'},
        {name: 'Buy food', date: '1/1/2022', description: 'so we need to buy some food for the children who does not have any food'},
        {name: 'Buy food', date: '1/1/2022', description: 'so we need to buy some food for the children who does not have any food'},
    ])

    async function onSubmit(data: any) {
        console.log(data);
        /*try {
          const campaign = Campaign(id);
          const accounts = await web3.eth.getAccounts();
          await campaign.methods.contibute().send({
            from: accounts[0],
            value: web3.utils.toWei(data.value, "ether"),
          });
          router.push(`/campaign/${id}`);
          setAmountInUSD(null);
          reset("", {
            keepValues: false,
          });
          setIsSubmitted(true);
          setError(false);
        } catch (err) {
          setError(err.message);
          console.log(err);
        }*/
      }

    return (
        <div>
            <Head>
                <title>Campaign Details</title>
                <meta name="description" content="Create a Withdrawal Request" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            {isSubmitted ? <Confetti width={width} height={height} /> : null}
            <main>
                {" "}
                <Box position={"relative"}>
                    {isSubmitted ? (
                        <Container
                            maxW={"7xl"}
                            //columns={{ base: 1, md: 2 }}
                            //spacing={{ base: 10, lg: 32 }}
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
                        //py={{ base: 6 }}
                    >
                        <Stack spacing={{ base: 6 }}>
                            <Heading
                                lineHeight={1.1}
                                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                            >
                                {props.name}
                            </Heading>
                            <Text
                                color={useColorModeValue("gray.500", "gray.200")}
                                fontSize={{ base: "lg" }}
                            >
                                {props.description}
                            </Text>
                            <Link
                                color="teal.500"
                                href={`https://rinkeby.etherscan.io/address/${props.id}`}
                                isExternal
                            >
                                View on Rinkeby Etherscan <ExternalLinkIcon mx="2px"/>
                            </Link>
                            <Box mx={"auto"} w={"full"}>
                                <SimpleGrid columns={{ base: 1 }} spacing={{ base: 5 }}>
                                    <StatCard
                                        title={"Minimum Contribution"}
                                        stat={/*`${web3.utils.fromWei(
                                            minimumContribution,
                                            "ether"
                                        )} ETH ($${getWEIPriceInUSD(
                                            ETHPrice,
                                            minimumContribution
                                        )})`*/10000}
                                        info={
                                          "You must contribute at least this much in Wei ( 1 ETH = 10 ^ 18 Wei) to become an approver"
                                        }
                                    />
                                    <StatCard
                                        title={"Wallet Address of Campaign Creator"}
                                        stat={props.manager}
                                        info={
                                        "The Campaign Creator created the campaign and can create requests to withdraw money."
                                        }
                                    />
                                    <StatCard
                                        title={"Number of Requests"}
                                        stat={props.requestsCount}
                                        info={
                                        "A request tries to withdraw money from the contract. Requests must be approved by approvers"
                                        }
                                    />
                                    <StatCard
                                        title={"Number of Approvers"}
                                        stat={props.approversCount}
                                        info={
                                        "Number of people who have already donated to this campaign"
                                        }
                                    />
                                </SimpleGrid>
                                <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                                <HStack spacing={2}>
                                    <SkeletonCircle size="4" />
                                    <Heading as="h2" size="lg">
                                        Roadmap
                                    </Heading>
                                </HStack>

                                <Divider marginTop="4" />

                                {roadmaps.length > 0 ? (
                                    <SimpleGrid
                                        columns={{ base: 1, md: 2 }}
                                        spacing={10}
                                        py={8}
                                    >
                                        {roadmaps.map((el, i) => {
                                            return (
                                                <div key={i}>
                                                    <CampaignCard
                                                        name={el.name}
                                                        date={el.date}
                                                        description={el.description}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </SimpleGrid>
                                ) : (
                                    <SimpleGrid
                                        columns={{ base: 1, md: 2 }}
                                        spacing={10}
                                        py={8}
                                    >
                                        <Skeleton height="25rem" />
                                        <Skeleton height="25rem" />
                                    </SimpleGrid>
                                )}
                            </Container>
                            </Box>
                        </Stack>
                        <Stack spacing={{ base: 4 }}>
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
                                            bg={useColorModeValue("white", "gray.700")}
                                            placement={"top"}
                                            color={useColorModeValue("gray.800", "white")}
                                            fontSize={"1em"}
                                            px="4"
                                        >
                                            <InfoIcon 
                                                color={useColorModeValue("teal.800", "white")}
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
                                            {props.balance > 0
                                            ? ""//"web3".utils.fromWei(balance, "ether")
                                            : "0, Become a Donor 😄"}
                                            </Text>
                                            <Text
                                                as="span"
                                                display={props.balance > 0 ? "inline" : "none"}
                                                pr={2}
                                                fontWeight={"bold"}
                                            >
                                                {" "}
                                                ETH
                                            </Text>
                                            <Text
                                                as="span"
                                                fontSize="lg"
                                                display={props.balance > 0 ? "inline" : "none"}
                                                fontWeight={"normal"}
                                                color={useColorModeValue("gray.500", "gray.200")}
                                            >
                                                (${getWEIPriceInUSD(props.ETHPrice, props.balance)})
                                            </Text>
                                        </Box>

                                        <Text fontSize={"md"} fontWeight="normal">
                                            target of {/*web3.utils.fromWei(target, "ether")*/} ETH ($
                                            {getWEIPriceInUSD(props.ETHPrice, props.target)})
                                        </Text>
                                        <Progress
                                            colorScheme="teal"
                                            size="sm"
                                            value={/*web3.utils.fromWei(balance, "ether")*/100}
                                            max={/*web3.utils.fromWei(target, "ether")*/100}                                            mt={4}
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
                                    color={useColorModeValue("teal.600", "teal.200")}
                                >
                                    Contribute Now!
                                </Heading>

                                <Box mt={10}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl id="value">
                                            <FormLabel>
                                                Amount in Ether you want to contribute
                                            </FormLabel>
                                            <InputGroup>
                                                {" "}
                                                <Input
                                                    {...register("value", { required: true })}
                                                    type="number"
                                                    isDisabled={formState.isSubmitting}
                                                    //onChange={(e) => {
                                                      //setAmountInUSD(Math.abs(e.target.value));
                                                    //}}
                                                    step="any"
                                                    min="0"
                                                />{" "}
                                                <InputRightAddon children="ETH"/>
                                            </InputGroup>
                                            {amountInUSD ? (
                                                <FormHelperText>
                                                ~$ {getETHPriceInUSD(props.ETHPrice, amountInUSD)}
                                                </FormHelperText>
                                            ) : null}
                                        </FormControl>

                                        {error ? (
                                            <Alert status="error" mt="2">
                                                <AlertIcon />
                                                <AlertDescription mr={2}> {error}</AlertDescription>
                                            </Alert>
                                        ) : null}

                                        <Stack spacing={10}>
                                            {/*wallet.status === "connected"*/0 ? (
                                                <Button
                                                fontFamily={"heading"}
                                                mt={4}
                                                w={"full"}
                                                bgGradient="linear(to-r, teal.400,green.400)"
                                                color={"white"}
                                                _hover={{
                                                    bgGradient: "linear(to-r, teal.400,blue.400)",
                                                    boxShadow: "xl",
                                                }}
                                                isLoading={formState.isSubmitting}
                                                isDisabled={amountInUSD ? false : true}
                                                type="submit"
                                                >
                                                Contribute
                                                </Button>
                                            ) : (
                                                <Alert status="warning" mt={4}>
                                                <AlertIcon />
                                                <AlertDescription mr={2}>
                                                    Please Connect Your Wallet to Contribute
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
                                <NextLink href={`/campaign/${props.id}/withdrawal`}>
                                    <Button
                                        fontFamily={"heading"}
                                        w={"full"}
                                        bgGradient="linear(to-r, teal.400,green.400)"
                                        color={"white"}
                                        _hover={{
                                          bgGradient: "linear(to-r, teal.400,blue.400)",
                                          boxShadow: "xl",
                                        }}
                                    >
                                        View Withdrawal Requests
                                    </Button>
                                </NextLink>
                                <Text fontSize={"sm"}>
                                    * You can see where these funds are being used & if you have
                                    contributed you can also approve those Withdrawal Requests :)
                                </Text>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </div>
    )
}