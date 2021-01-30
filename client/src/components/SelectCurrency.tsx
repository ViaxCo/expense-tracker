import { Select } from "@chakra-ui/react";
// @ts-ignore (no types)
import currencyToSymbolMap from "currency-symbol-map/map";
import { motion } from "framer-motion";
import { ChangeEvent, useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const SelectCurrency = () => {
  const { currencySymbol, setCurrencySymbol } = useContext(GlobalContext);

  const currentCurrency = getKeyByValue(currencyToSymbolMap, currencySymbol);
  // Keep the current currency in state
  const [currencyState, setCurrencyState] = useState(
    currentCurrency ? currentCurrency : "USD"
  );

  // Currencies like: NGN, USD, EUR etc...
  const currencies = [];
  // Loop through the currencyToSymbolMap object and push each "key" into the currencies array
  for (let currency in currencyToSymbolMap) {
    currencies.push(currency);
  }
  // Currency symbols like: $, £, € etc...
  const symbols = [];
  // Loop through the currencyToSymbolMap object and push each "value" into the symbols array
  for (let symbol in currencyToSymbolMap) {
    symbols.push(currencyToSymbolMap[symbol]);
  }
  return (
    <motion.div
      // Mount animation
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 2.5,
      }}
    >
      <Select
        color="gray.400"
        borderColor="gray.400"
        _hover={{ color: "gray.300", borderColor: "gray.300" }}
        focusBorderColor="gray.400"
        w="80px"
        m="auto"
        mb={10}
        size="sm"
        cursor="pointer"
        borderRadius={6}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setCurrencyState(e.target.value);
          setCurrencySymbol && setCurrencySymbol(e.target.value);
        }}
        value={currencyState}
      >
        {currencies.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
    </motion.div>
  );
};

export default SelectCurrency;

// Function to get the "key" in an object, by passing the object and the value
const getKeyByValue = (object: any, value: any) => {
  return Object.keys(object).find(key => object[key] === value);
};
