import { 
    Box, 
    Container, 
    Divider, 
    Flex, 
    Heading, 
    HStack, 
    Img, 
    Select, 
    SimpleGrid, 
    SkeletonCircle, 
    Tooltip, 
    useColorModeValue,
    chakra,
    Icon,
    Text,
    Progress,
    Skeleton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";

export const CampaignCard: React.FC<{
    name: string;
    description: string;
    creatorId: any;
    imageURL: string;
    id: any;
    balance: any;
    target: any;
    ethPrice: any;
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
                                    display={
                                        props.balance > 0 ? "inline" : "none"
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
                                        props.balance > 0 ? "inline" : "none"
                                    }
                                    fontWeight={"normal"}
                                    color={useColorModeValue(
                                        "gray.500",
                                        "gray.200",
                                    )}
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
};


export const ComboBox: React.FC<{
    campaigns: any,
    top10: string,
}> = (props) => {
    const [value, setValue] = useState("");
    const [change, setChange] = useState(false)
    const [campaignListFilter, setCampaignListFilter] = useState([])
    const [campaignList, setCamPaignList] = useState(props.campaigns)

    useEffect(() => {
        console.log("combobox value: ", value)
        if(value == "Latest_Campaigns") {
            //setCampaignListFilter(campaignList)
            const tmp = campaignListFilter.sort((b, a) =>
                //a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join())
                Date.parse(a.date) - Date.parse(b.date)
            ); 
            setCampaignListFilter(tmp)
            //console.log("tmp: ",tmp)
        } else if(value == "Top_10_Campaigns") {
            //setCampaignListFilter(campaignList)
            const tmp = campaignListFilter.sort((b, a) =>
                a[props.top10] - b[props.top10]
            ).slice(0,10); 
            setCampaignListFilter(tmp)
        } else if(value == "Verified_Campaigns") {
            //setCampaignListFilter(campaignList)
            const tmp = campaignList.filter( a =>
                a.verified == true
            ); 
            setCampaignListFilter(tmp)
        }
        else {
            console.log("check")
            const tmp = campaignList.map((el) => el)
            setCampaignListFilter(tmp)
        }
        setChange(false)
    }, [change]);
    console.log("value: ", value)
    //console.log("change: ", change)
    //console.log("default: ", campaignListFilter)
    //console.log(campaignList)

    return (
    <>
                <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                    <div 
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <HStack spacing={2}
                            style={{
                                flexDirection: "row",
                                width: "300%"
                            }}
                        >
                            <SkeletonCircle size="4" />
                            <Heading as="h2" size="lg">
                                Open Campaigns
                            </Heading>
                        </HStack>
                        <Select 
                            placeholder='Filter Campaign'
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "right"
                            }}
                            value={value}
                            onChange={(e:any) => 
                                {setValue(e.target.value)
                                setChange(true)
                                const tmp = campaignList.map((el) => el)
                                setCampaignListFilter(tmp)
                            }}
                        >
                        <option value='Latest_Campaigns'>Latest Campaigns</option>    
                        <option value='Top_10_Campaigns'>Top 10 Campaigns</option>
                        <option value='Verified_Campaigns'>Verified Campaigns</option>
                        </Select>
                    </div>

                    <Divider marginTop="4" />

                    {campaignList.length > 0 ? (
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            spacing={10}
                            py={8}
                        >
                            { !change ?(
                                campaignListFilter.map((el, i) => {
                                    //console.log("filter: ", campaignListFilter)
                                        return (
                                            <div key={i}>
                                                <CampaignCard
                                                    name={el.name}
                                                    description={el.description}
                                                    creatorId={el.creatorId}
                                                    imageURL={el.imageURL}
                                                    id={/*campaigns[i]*/ 0}
                                                    target={el.target}
                                                    balance={el.balance}
                                                />
                                            </div>
                                    
                                )})
                            ) : null}
                            
                        </SimpleGrid>
                    ) : (
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            spacing={10}
                            py={8}
                        >
                            <Skeleton height="25rem" />
                            <Skeleton height="25rem" />
                            <Skeleton height="25rem" />
                        </SimpleGrid>
                    )}
                </Container>
    </>    
        
    );
};