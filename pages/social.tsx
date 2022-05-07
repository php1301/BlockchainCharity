import Icon from '@chakra-ui/icon'
import { HStack } from '@chakra-ui/layout'
import React from 'react'
import NextLink from "next/link";
import { FaFacebookF, FaGoogle, FaSpotify, FaShopify, FaYoutube, FaTwitter } from 'react-icons/fa'

function Social() {
    return (
        <HStack spacing="24">
            <a target={"_blank"} href={"https://www.facebook.com/profile.php?id=100008346932446"}>
            <Icon as={FaFacebookF} boxSize="50" />
            </a>
            <a target={"_blank"} href={"https://www.youtube.com/watch?v=odpGVvARDMw&list=RDodpGVvARDMw&index=1"}>
            <Icon as={FaYoutube} boxSize="50" />
            </a>
            <a target={"_blank"} href={"https://twitter.com/chub3d4n"}>
            <Icon as={FaTwitter} boxSize="50" />
            </a> 
        </HStack>
    )
}

export default Social