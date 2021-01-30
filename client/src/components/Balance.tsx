import { Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Balance = () => {
  const { transactions, currencySymbol } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  // Add the numbers together to 2.d.p
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <Flex direction="column" w="100%" maxW="100%" textAlign="center">
      <Heading as="h3" size="sm" fontWeight="400" color="gray.600" mb={[0, 1]}>
        Overall Balance
      </Heading>
      <Heading
        as="h1"
        fontSize="5xl"
        fontWeight="500"
        letterSpacing="tight"
        color="gray.700"
      >
        {currencySymbol ? currencySymbol : "$"}
        {numberWithCommas(Math.abs(+total))}
      </Heading>
    </Flex>
  );
};

export default Balance;
