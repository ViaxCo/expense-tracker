import { chakra, Flex, Heading } from "@chakra-ui/react";
import { IoWalletOutline } from "react-icons/io5";

// Give the component chakra props
const ChakraIoWalletOutline = chakra(IoWalletOutline);

const Header = () => {
  return (
    <Flex align="center" justify="center" textAlign="center" mb={4}>
      <ChakraIoWalletOutline color="white" mr={2} fontSize={["2xl", "3xl"]} />
      <Heading size="lg" fontWeight="600" color="white">
        Expense Tracker
      </Heading>
    </Flex>
  );
};

export default Header;
