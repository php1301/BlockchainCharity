import { 
    Flex,
    Stat, 
    StatLabel, 
    Tooltip, 
    useColorModeValue,
    Box, 
    StatNumber} from "@chakra-ui/react";

export const StatCard: React.FC<{
    title: string, 
    stat: any, 
    info: string}> = (props) => {
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={"5"}
            shadow={"sm"}
            border={"1px solid"}
            borderColor={"gray.500"}
            rounded={"lg"}
            transition={"transform 0.3s ease"}
            _hover={{
            transform: "translateY(-5px)",
            }}    
        >
            <Tooltip
                label={props.info}
                bg={useColorModeValue("white", "gray.700")}
                placement={"top"}
                color={useColorModeValue("gray.800", "white")}
                fontSize={"1em"}
            >
                <Flex justifyContent={"space-between"}>
                    <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel fontWeight={"medium"} isTruncated>
                            {props.title}
                        </StatLabel>
                        <StatNumber
                            fontSize={"base"}
                            fontWeight={"bold"}
                            isTruncated
                            maxW={{ base: "	10rem", sm: "sm" }}
                        >
                            {props.stat}
                        </StatNumber>
                    </Box>
                </Flex>
            </Tooltip>
        </Stat>
    )
}