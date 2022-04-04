import Head from "next/head";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import styles from "../src/styles/Home.module.css";
//import { getETHPrice, getWEIPriceInUSD } from "../lib/getETHPrice";
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
  Divider,
  Skeleton,
  Img,
  Icon,
  chakra,
  Tooltip,
  Link,
  SkeletonCircle,
  HStack,
  Stack,
  Progress,
} from "@chakra-ui/react";

//import factory from "../smart-contract/factory";
//import web3 from "../smart-contract/web3";
//import Campaign from "../smart-contract/campaign";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaHandshake } from "react-icons/fa";
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";

// export async function getServerSideProps(context) {
// const campaigns = await factory.methods.getDeployedCampaigns().call();
//   console.log(campaigns);

//   return {
//     props: { campaigns },
//   };
// }

export const Feature: React.FC<{ title: string, text: string, icon: any }> = (props) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={useColorModeValue("gray.100", "gray.700")}
        mb={1}
      >
        {props.icon}
      </Flex>
      <Text fontWeight={600}>{props.title}</Text>
      <Text color={useColorModeValue("gray.500", "gray.200")}>{props.text}</Text>
    </Stack>
  );
};

export const CampaignCard: React.FC<{
  name: string,
  description: string,
  creatorId: any,
  imageURL: string,
  id: any,
  balance: any,
  target: any,
  ethPrice: any
}> = (props) => {
  return (
    <NextLink href={`/campaign/${props.id}`}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW={{ md: "sm" }}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition={"transform 0.3s ease"}
        _hover={{
          transform: "translateY(-8px)",
        }}
      >
        <Box height="18em">
          <Img
            src={props.imageURL}
            alt={`Picture of ${props.name}`}
            roundedTop="lg"
            objectFit="cover"
            w="full"
            h="full"
            display="block"
          />
        </Box>
        <Box p="6">
          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center"
            py={2}
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

            <Tooltip
              label="Contribute"
              bg={useColorModeValue("white", "gray.700")}
              placement={"top"}
              color={useColorModeValue("gray.800", "white")}
              fontSize={"1.2em"}
            >
              <chakra.a display={"flex"}>
                <Icon
                  as={FaHandshake}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                  color={"green.400"}
                />{" "}
              </chakra.a>
            </Tooltip>
          </Flex>
          <Flex alignContent="center" py={2}>
            {" "}
            <Text color={"gray.500"} pr={2}>
              by
            </Text>{" "}
            <Heading size="base" isTruncated>
              {props.creatorId}
            </Heading>
          </Flex>
          <Flex direction="row" py={2}>
            <Box w="full">
              <Box
                fontSize={"2xl"}
                isTruncated
                maxW={{ base: "	15rem", sm: "sm" }}
                pt="2"
              >
                <Text as="span" fontWeight={"bold"}>
                  {/* {props.balance > 0
                    ? web3.utils.fromWei(props.balance, "ether")
                    : "0, Become a Donor 😄"} */}
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
                  {/* (${getWEIPriceInUSD(ethPrice, balance)}) */}
                </Text>
              </Box>

              <Text fontSize={"md"} fontWeight="normal">
                {/* target of {web3.utils.fromWei(target, "ether")} ETH ($
                {getWEIPriceInUSD(ethPrice, target)}) */}
              </Text>
              <Progress
                colorScheme="teal"
                size="sm"
                // value={web3.utils.fromWei(balance, "ether")}
                // max={web3.utils.fromWei(target, "ether")}
                mt="2"
              />
            </Box>{" "}
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
}

export default function Home({/*campaign*/ }) {
  const [campaignList, setCampaignList] = useState([]);
  const [ethPrice, updateEthPrice] = useState(null);

  async function getSummary() {
    // try {
    //   const summary = await Promise.all(
    //     campaigns.map((campaign, i) =>
    //       Campaign(campaigns[i]).methods.getSummary().call()
    //     )
    //   );
    //   const ETHPrice = await getETHPrice();
    //   updateEthPrice(ETHPrice);
    //   console.log("summary ", summary);
    //   setCampaignList(summary);

    //   return summary;
    // } catch (e) {
    //   console.log(e);
    // }
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div>
      <Head>
        <title>FundingHealthcare</title>

        <meta
          name="description"
          content="Transparent Crowdfunding in Blockchain"
        />
        <link rel="icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" /*crossorigin*/></link>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>
      <main className={styles.main}>
        <Container py={{ base: "4", md: "12" }} maxW={"7xl"} /*align={"left"}*/>
          {" "}
          <Heading
            textAlign={useBreakpointValue({ base: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            as="h1"
            py={4}
            style={{ fontSize: "2.4rem" }}
          >
            Crowdfunding using the powers of <br /> Crypto & Blockchain{" "}
          </Heading>
          <NextLink href="/campaign/new">
            <Button
              display={{ sm: "inline-flex" }}
              fontSize={"md"}
              fontWeight={600}
              color={"white"}
              bg={"green.400"}
              _hover={{
                bg: "green.500",
              }}
            >
              Create Campaign
            </Button>
          </NextLink>
        </Container>
        <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
          <HStack spacing={2}>
            <SkeletonCircle size="4" />
            <Heading as="h2" size="lg">
              Open Campaigns
            </Heading>
          </HStack>

          <Divider marginTop="4" />

          {campaignList.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
              {campaignList.map((el, i) => {
                return (
                  <div key={i}>
                    <CampaignCard
                      name={el[5]}
                      description={el[6]}
                      creatorId={el[4]}
                      imageURL={el[7]}
                      id={/*campaigns[i]*/0}
                      target={el[8]}
                      balance={el[1]}
                      ethPrice={ethPrice}
                    />
                  </div>
                );
              })}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
              <Skeleton height="25rem" />
              <Skeleton height="25rem" />
              <Skeleton height="25rem" />
            </SimpleGrid>
          )}
        </Container>
        <Container py={{ base: "4", md: "12" }} maxW={"7xl"} id="howitworks">
          <HStack spacing={2}>
            <SkeletonCircle size="4" />
            <Heading as="h2" size="lg">
              How Funding Healthcare Works
            </Heading>
          </HStack>
          <Divider marginTop="4" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
            <Feature
              icon={<Icon as={FcDonate} w={10} h={10} />}
              title={"Create a Campaign for Fundraising"}
              text={
                "It’ll take only 2 minutes. Just enter a few details about the funds you are raising for."
              }
            />
            <Feature
              icon={<Icon as={FcShare} w={10} h={10} />}
              title={"Share your Campaign"}
              text={
                "All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in."
              }
            />
            <Feature
              icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
              title={"Request and Withdraw Funds"}
              text={
                "The funds raised can be withdrawn directly to the recipient when 50% of the contributors approve of the Withdrawal Request."
              }
            />
          </SimpleGrid>
          {/* <Heading as="h2" size="lg" mt="8">
            For any queries raise an issue on{" "}
            <Link
              color="teal.500"
              href="https://github.com/harsh242/betterfund-crowdfunding-in-blockchain/issues"
              isExternal
            >
              the Github Repo <ExternalLinkIcon mx="2px" />
            </Link>{" "}
          </Heading> */}
          <Divider marginTop="4" />
        </Container>
      </main>
    </div>
  );
}
