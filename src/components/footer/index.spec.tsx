import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Heading
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          color={useColorModeValue("teal.800", "white")}
          as="h2"
          size="lg"
        >
          <Box
            as={"span"}
            style={{fontSize: "2rem"}}
            color={useColorModeValue("green.400", "green.300")}
            position={"relative"}
            zIndex={10}
            _after={{
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 0,
              w: "full",
              h: "30%",
              bg: useColorModeValue("green.100", "green.900"),
              zIndex: -1,
            }}
          >
            <NextLink href="/">Funding Healthcare</NextLink>
          </Box>
        </Heading>
        <Stack direction={"row"} spacing={6}>
          <NextLink href="/">Home</NextLink>
          <Link
            href={
              "https://github.com/php1301/BlockchainCharity"
            }
            isExternal
          >
            Github
          </Link>
          <Link href={"mailto:19520972@gm.uit.edu.vn"} isExternal>
            Contact
          </Link>
        </Stack>
      </Container>

      <Container
        as={Stack}
        maxW={"3xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        

        <Text style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>Made by Pham Hoang Phuc, Nguyen Nhat Minh , Nguyen Ngoc Thien & Le Tran Thanh Nhan <br />🌐University of Information and Technology, Ho Chi Minh</Text>
        
        <Stack direction={"row"} spacing={6}>
        </Stack>
      </Container>
    </Box>
  );
}
