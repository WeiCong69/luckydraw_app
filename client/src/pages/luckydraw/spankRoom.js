import {
    Flex,
    Button,
    Stack,
    IconButton,
    Icon,
    Link,
} from "@chakra-ui/react";
import {
    IoChevronBack,
    IoLink
} from "react-icons/io5";

export default function SpankRoom() {

    return (
        <Stack
            height={"100%"}
            width={"100%"}
            justify={"center"}
            align={"center"}
            bg="#002784"
            zIndex={11}
            position={"fixed"}
            spacing='100px'
        >
            <IconButton
                colorScheme='transparent'
                aria-label='Back'
                fontSize={{ base: "25px", lg: "50px" }}
                icon={<IoChevronBack />}
                position="absolute"
                top={{ base: "15px", lg: "30" }}
                left={{ base: "15px", lg: "30px" }}
                onClick={() => console.log("wtf")}
            />
            <Button
                width={{ base: "150px", md: "200px", lg: "500px" }}
                height={{ base: "150px", md: "200px", lg: "500px" }}
                borderRadius={{ base: "75px", md: "100px", lg: "300px" }}
                boxShadow='0 0 20px yellow'
                bg="#0122c7"
                _hover={{ bg: '#0122c70' }}
                // onClick={() => console.log("wtf")}
                _active={{
                    bg: '#0122c7',
                    transform: 'scale(0.58)',
                }}
            />
            <Flex align="center" justify="center" gap="2">
                <Icon color='white' as={IoLink} />
                <Link color='white' textShadow='0 0 5px white' href='#'>https://fuck</Link>
            </Flex>


        </Stack >
    );
}
