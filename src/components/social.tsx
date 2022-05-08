import Icon from "@chakra-ui/icon";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

function Social({ user }: any) {
    return (
        <HStack spacing="24">
            <a
                target={"_blank"}
                href={
                    user.user.facebookUrl ||
                    "https://www.facebook.com/profile.php?id=100008346932446"
                }
            >
                <Icon as={FaFacebookF} boxSize="50" />
            </a>
            <a
                target={"_blank"}
                href={
                    user.user.youtubeUrl ||
                    "https://www.youtube.com/watch?v=odpGVvARDMw&list=RDodpGVvARDMw&index=1"
                }
            >
                <Icon as={FaYoutube} boxSize="50" />
            </a>
            <a
                target={"_blank"}
                href={user.user.instagramUrl || "https://instagram.com/rap"}
            >
                <Icon as={FaInstagram} boxSize="50" />
            </a>
        </HStack>
    );
}

export default Social;
