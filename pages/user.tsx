import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, VStack, Heading, Spacer } from "@chakra-ui/layout";
import { FaSun, FaMoon, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import Header from "./header";
import Profile from "./profile";
import Social from "./social";

function App() {

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div>
      <head>
        <title>Profile</title>
      </head>
<VStack p={5}>
      
      <Header></Header>
      <Social></Social>
      <Profile></Profile>
    </VStack>
    </div>
    
  );
}
export default App;