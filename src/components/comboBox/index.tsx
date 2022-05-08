import { Heading, HStack, Select, SkeletonCircle } from "@chakra-ui/react";
import axiosClient from "src/framework/axios";

export const ComboBox: React.FC<{
    setCampaignAddreses: any;
    setIsLoading: any;
}> = ({ setCampaignAddreses, setIsLoading }) => {
    const handleOnChange = async (value: any) => {
        setIsLoading(true);
        console.log(value);
        const { sorted: deployedCampaigns }: any = await axiosClient.get(
            `/campaigns/get-deployed-campaigns/${value}`,
        );
        setCampaignAddreses(deployedCampaigns || []);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <HStack
                    spacing={2}
                    style={{
                        flexDirection: "row",
                        width: "300%",
                    }}
                >
                    <SkeletonCircle size="4" />
                    <Heading as="h2" size="lg">
                        Open Campaigns
                    </Heading>
                </HStack>
                <Select
                    placeholder="Filter Campaign"
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "right",
                    }}
                    onChange={(e) => {
                        handleOnChange(e.target.value);
                    }}
                >
                    <option value="hot">Top 10 Campaigns</option>
                    <option value="new">New Campaigns</option>
                    <option value="old">Old Campaigns</option>
                </Select>
            </div>
        </>
    );
};
