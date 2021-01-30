import { Box, chakra, Flex, Heading, Text } from "@chakra-ui/react";
import { HiArrowCircleDown } from "react-icons/hi";
import { HiArrowCircleUp } from "react-icons/hi";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";
import { MotionFlex } from "./Transaction";

// Give the components chakra props
const ChakraHiArrowCircleUp = chakra(HiArrowCircleUp);
const ChakraHiArrowCircleDown = chakra(HiArrowCircleDown);

const IncomeExpenses = () => {
  const { transactions, currencySymbol } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <Flex align="center" justify="center" mt={4} w="100%">
      <MotionFlex
        align="center"
        justify="center"
        p="0.375rem"
        mr={4}
        bg="rgba(0,255,0,0.38)"
        borderRadius={7}
        minW={0}
        flex={1}
        // Animations
        variants={{
          hidden: {
            transform: "scale(1.12)",
          },
          visible: {
            transform: "scale(1)",
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.35,
          duration: 0.2,
          type: "spring",
          stiffness: 60,
        }}
      >
        <ChakraHiArrowCircleUp size={48} mr={1} color="green.500" w="30%" />
        <Box display="flex" flexDir="column" mr={1} w="70%">
          <Heading as="h4" fontSize="xs" fontWeight="400" color="gray.800">
            Income
          </Heading>
          <Text color="gray.100" fontSize="xl" fontWeight="500">
            {currencySymbol ? currencySymbol : "$"}
            {numberWithCommas(Math.abs(+income))}
          </Text>
        </Box>
      </MotionFlex>
      <MotionFlex
        align="center"
        justify="center"
        p="0.375rem"
        bg="rgba(255,0,0,0.28)"
        borderRadius={7}
        minW={0}
        flex={1}
        // Animations
        variants={{
          hidden: {
            transform: "scale(1.12)",
          },
          visible: {
            transform: "scale(1)",
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.45,
          duration: 0.2,
          type: "spring",
          stiffness: 60,
        }}
      >
        <ChakraHiArrowCircleDown size={48} mr={1} color="red.600" w="30%" />
        <Box display="flex" flexDir="column" mr={1} w="70%">
          <Heading as="h4" fontSize="xs" fontWeight="400" color="gray.800">
            Expenses
          </Heading>
          <Text color="gray.100" fontSize="xl" fontWeight="500">
            {currencySymbol ? currencySymbol : "$"}
            {numberWithCommas(Math.abs(+expense))}
          </Text>
        </Box>
      </MotionFlex>
    </Flex>
  );
};

export default IncomeExpenses;
