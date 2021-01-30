import {
  ChakraProps,
  Flex,
  forwardRef,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";
import { isValidMotionProp, motion, MotionProps } from "framer-motion";

type Props = {
  transaction: {
    _id?: string;
    text: string;
    amount: number;
  };
  i: number;
  hasTransactionsRendered: boolean;
};

// Create a custom motion component from Flex
export const MotionFlex = motion.custom(
  forwardRef<MotionProps & ChakraProps, "div">((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Flex ref={ref} {...chakraProps} />;
  })
);

const Transaction = ({ transaction, i, hasTransactionsRendered }: Props) => {
  const { deleteTransaction, currencySymbol } = useContext(GlobalContext);
  const color = transaction.amount < 0 ? "red.500" : "green.500";

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
      }}
    >
      <MotionFlex
        bg="rgba(255,255,255,0.9)"
        borderRadius={5}
        py={[4, 3]}
        pl={4}
        pr={2}
        w="100%"
        mb={5}
        align="center"
        justify="space-between"
        boxShadow="8px 8px 8px -4px rgba(41,0,80,0.6)"
        borderRight={
          transaction.amount < 0 ? "5px solid red" : "5px solid green"
        }
        // Mount and exit animations of each card
        opacity="0"
        variants={{
          hidden: (i: number) => ({ opacity: 0, y: -50 * i }),
          // Animation for new items added
          hiddenNew: { opacity: 0, y: -30 },
          visibleNew: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.05,
            },
          },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.75 + i * 0.04,
            },
          }),
          exit: {
            opacity: 0,
            x: -30,
          },
        }}
        // If transactions has rendered, use animations for new items
        initial={hasTransactionsRendered ? "hiddenNew" : "hidden"}
        animate={hasTransactionsRendered ? "visibleNew" : "visible"}
        exit="exit"
        custom={i}
      >
        <Text
          color="gray.700"
          fontWeight="500"
          mr={4}
          wordBreak="break-word"
          w="50%"
        >
          {transaction.text}
        </Text>
        <Flex align="center">
          <Text color={color} fontWeight="500" wordBreak="break-word">
            {currencySymbol ? currencySymbol : "$"}
            {numberWithCommas(Math.abs(transaction.amount))}
          </Text>
          <IconButton
            m="auto"
            ml={3}
            aria-label="Delete Item"
            size={useBreakpointValue(["sm", "md"])}
            variant="ghost"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() =>
              deleteTransaction &&
              transaction._id &&
              deleteTransaction(transaction._id)
            }
          />
        </Flex>
      </MotionFlex>
    </motion.div>
  );
};

export default Transaction;
