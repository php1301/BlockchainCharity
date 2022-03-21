import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
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
    Spacer,
    Table,
    Thead,
    Tbody,
    Tooltip,
    Tr,
    Th,
    Td,
    TableCaption,
    Skeleton,
    Alert,
    AlertIcon,
    AlertDescription,
    HStack,
    Stack,
    Link } from "@chakra-ui/react";
import {
    ArrowBackIcon,
    InfoIcon,
    CheckCircleIcon,
    WarningIcon } from "@chakra-ui/icons";

//them onApprove, onFinalize trong file goc

export const RequestRow: React.FC<{
    id: string, 
    request: any, 
    approversCount: any, 
    campaignId: string,
    disabled: any,
    ETHPrice: any }> = (props) => {
        const router = useRouter();
        const readyToFinalize = props.request.approvalCount > props.approversCount / 2;
        const [errorMessageApprove, setErrorMessageApprove] = useState();
        const [loadingApprove, setLoadingApprove] = useState(false);
        const [errorMessageFinalize, setErrorMessageFinalize] = useState();
        const [loadingFinalize, setLoadingFinalize] = useState(false);
    return (
        <Tr>
            
        </Tr>
    )
}