import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  forwardRef,
  ChakraProps,
  Button,
  FormHelperText,
  useNumberInput,
  useMediaQuery,
  HStack,
} from "@chakra-ui/react";
import {
  isValidMotionProp,
  motion,
  MotionProps,
  useAnimation,
  useCycle,
} from "framer-motion";
import {
  ChangeEvent,
  useState,
  useContext,
  FormEvent,
  useRef,
  RefObject,
} from "react";
import { GlobalContext } from "../context/GlobalState";

type Props = {
  containerRef: RefObject<HTMLDivElement>;
};

// Create a custom motion component from Box
const MotionForm = motion.custom(
  forwardRef<MotionProps & ChakraProps, "form">((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box as="form" ref={ref} {...chakraProps} />;
  })
);
// Create a custom motion component from IconButton
const MotionIconButton = motion.custom(
  forwardRef<MotionProps & ChakraProps, "button">((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <IconButton aria-label="Add Item" ref={ref} {...chakraProps} />;
  })
);

const AddTransaction = ({ containerRef }: Props) => {
  const { addTransaction } = useContext(GlobalContext);
  // Form input state
  const [text, setText] = useState("");
  const [amount, setAmount] = useState<number | string>(0);
  // Form animation state
  const [animate, cycle] = useCycle(
    { opacity: 0, transform: "scale(0)" },
    { opacity: 1, transform: "scale(1)" }
  );
  // Button animation state
  const [animate2, cycle2] = useCycle({ rotate: 0 }, { rotate: -135 });
  // Button animation controls
  const controls = useAnimation();
  const variants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.85,
        type: "spring",
        duration: 0.1,
        velocity: 9,
        mass: 3,
        damping: 15,
        stiffness: 140,
      },
    },
  };
  controls.start("visible");
  controls.start(animate2);
  // Overlay div for blur effect
  const divRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: +amount,
    };
    // Cycle form animation
    cycle();
    // Cycle button animation
    cycle2();
    // Toggle overlay div appearance
    const div = divRef.current;
    div!.classList.toggle("overlay-shown");
    addTransaction && (await addTransaction(newTransaction));
    // Scroll to the newest added item
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    // Reset form
    setText("");
    setAmount(0);
  };

  // Hook to allow display of Different number inputs at different screen widths
  // For SSR, the better option would be: <NumberInput display={["none, block"]}/><MobileNumberInput display={["block,none"]}/>
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({ defaultValue: 0 });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <>
      <MotionIconButton
        borderRadius="50%"
        minW={16}
        minH={16}
        colorScheme="teal"
        boxShadow="3px 3px 10px -2px rgba(41,0,80,0.3)"
        fontSize="xl"
        icon={<AddIcon />}
        position="fixed"
        zIndex={10}
        bottom={2}
        onClick={() => {
          cycle();
          cycle2();
          const div = divRef.current;
          div!.classList.toggle("overlay-shown");
        }}
        // Animation
        opacity={0}
        variants={variants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.1 }}
      />
      <div
        className="overlay"
        ref={divRef}
        onClick={() => {
          // Cycle form animation
          cycle();
          // Cycle button animation
          cycle2();
          // Toggle overlay div appearance
          const div = divRef.current;
          div!.classList.toggle("overlay-shown");
        }}
      />
      <MotionForm
        onSubmit={handleSubmit}
        bg="white"
        w="100%"
        maxW={["320px", "340px"]}
        // Set display table to make height responsive
        display="table"
        p={5}
        position="fixed"
        m="auto"
        right="0"
        left="0"
        top={180}
        zIndex={20}
        borderRadius={5}
        // Animation
        initial={{
          opacity: 0,
          transform: "scale(0)",
        }}
        animate={animate}
        transition={{ type: "spring", duration: 0.6, bounce: 0.35 }}
      >
        <FormControl mb={4}>
          <FormLabel color="gray.700">Item</FormLabel>
          <Input
            type="text"
            placeholder="Enter item..."
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            isRequired={true}
            autoComplete="off"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel color="gray.700">Amount</FormLabel>
          {isLargerThan768 ? (
            <NumberInput
              defaultValue={0}
              value={amount}
              onChange={value => setAmount(value)}
              pattern="^[-+]?[0-9]\d*(\.\d+)?$"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          ) : (
            <HStack maxW="100%">
              <Button
                {...inc}
                onClick={() => setAmount(prev => +prev + 1)}
                w="17.5%"
              >
                +
              </Button>
              <Input
                {...input}
                value={amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
                pattern="^[-+]?[0-9]\d*(\.\d+)?$"
                w="65%"
              />
              <Button
                {...dec}
                onClick={() => {
                  setAmount(prev => +prev - 1);
                  amount > 0 && setAmount(+amount * -1);
                }}
                w="17.5%"
              >
                -
              </Button>
            </HStack>
          )}

          <FormHelperText>
            (negative - expense, positive - income)
          </FormHelperText>
        </FormControl>
        <Button colorScheme="green" type="submit">
          Add Transaction
        </Button>
      </MotionForm>
    </>
  );
};

export default AddTransaction;
