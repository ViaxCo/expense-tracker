import { Flex, Spinner } from "@chakra-ui/react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import { GlobalContext } from "./context/GlobalState";
import { useContext, useEffect, useRef } from "react";
import { MotionFlex } from "./components/Transaction";
import SelectCurrency from "./components/SelectCurrency";

const App = () => {
  const { isLoading, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions && getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Flex direction="column" align="center" p={8} ref={containerRef}>
      <Header />
      {isLoading ? (
        <Spinner
          color="gray.100"
          size="xl"
          thickness="4px"
          position="absolute"
          top="-15%"
          left="0"
          bottom="0"
          right="0"
          margin="auto"
        />
      ) : (
        <>
          <Flex direction="column" align="center" maxW={["320px", "400px"]}>
            <SelectCurrency />
            <MotionFlex
              direction="column"
              align="center"
              px={4}
              py={5}
              minW={[null, "350px"]}
              maxW={["320px", "400px"]}
              borderRadius={7}
              className="f-glass"
              // Mount animation
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
              }}
            >
              <Balance />
              <IncomeExpenses />
            </MotionFlex>
            <TransactionList />
          </Flex>
          <AddTransaction containerRef={containerRef} />
        </>
      )}
    </Flex>
    /* <a href="https://www.freepik.com/vectors/background">
        Background vector created by freepik - www.freepik.com
      </a> */
  );
};

export default App;
