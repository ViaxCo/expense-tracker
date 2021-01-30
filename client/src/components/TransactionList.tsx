import { Flex } from "@chakra-ui/react";
import Transaction from "./Transaction";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { AnimatePresence } from "framer-motion";

const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  // Track if the Transaction List has rendered to use for the transaction animations
  const hasTransactionsRendered = useRef(false);
  useEffect(() => {
    hasTransactionsRendered.current = true;
  }, []);
  return (
    <Flex direction="column" mt={12} w="100%">
      <AnimatePresence>
        {transactions.map((transaction, i) => (
          <Transaction
            key={transaction._id}
            transaction={transaction}
            i={i}
            hasTransactionsRendered={hasTransactionsRendered.current}
          />
        ))}
      </AnimatePresence>
    </Flex>
  );
};

export default TransactionList;
