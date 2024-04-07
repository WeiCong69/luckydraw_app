import {
  HStack,
  Box,
  Heading,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  RadioGroup,
  Radio,
  Select,
} from "@chakra-ui/react";

export default function FormSample() {
  return (
    <VStack
      minH={"120vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Heading>Form Sample</Heading>
      <Box bg="white" p="50" boxShadow="xl" width="fit-content" mx={10}>
        <FormControl>
          <HStack>
            <FormLabel>Sample</FormLabel>
            <Input type="text" />
            <FormLabel>Sample</FormLabel>
            <Input type="text" />
            <FormLabel>Sample</FormLabel>
            <Input type="text" />
          </HStack>

          <FormLabel as="legend">Favorite Naruto Character</FormLabel>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px">
              <Radio value="Sasuke">Sasuke</Radio>
              <Radio value="Nagato">Nagato</Radio>
              <Radio value="Itachi">Itachi</Radio>
              <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
            </HStack>
          </RadioGroup>
          <FormLabel>Country</FormLabel>
          <Select placeholder="Select country">
            <option>United Arab Emirates</option>
            <option>Nigeria</option>
          </Select>
          <FormLabel>Sample</FormLabel>
          <Input type="text" />
          <FormHelperText>We'll never share your text.</FormHelperText>
          <FormLabel>Sample</FormLabel>
          <Input type="text" />
          <FormHelperText>We'll never share your text.</FormHelperText>
          <FormLabel>Sample</FormLabel>
          <Input type="text" />
          <FormHelperText>We'll never share your text.</FormHelperText>
          <FormLabel>Sample</FormLabel>
          <Input type="text" />
          <FormHelperText>We'll never share your text.</FormHelperText>
          <FormLabel>Sample</FormLabel>
          <Input type="text" />
          <FormHelperText>We'll never share your text.</FormHelperText>
        </FormControl>
      </Box>
    </VStack>
  );
}
