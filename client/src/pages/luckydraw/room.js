import {
    Flex,
    Text,
    useColorModeValue,
    Button,
    Wrap,
    WrapItem,
    Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export default function Room() {
    let cardList = [];
    for (let i = 0; i < 5; i++) {
        cardList.push(
            <WrapItem key={i} className="roomCard" alignItems={"center"}> {/* Set the width of each card */}
                <Button width={"100%"} height={"100%"} bg={"transparent"}>
                    <Center className="roomText">
                        <Text>HI</Text>
                    </Center>
                </Button>
            </WrapItem>
        );
    }
    /* const { message } = useSelector((state) => state.message); */

    return (
        <Flex
            minH={"100vh"}
            height={"auto"}
            width={"100%"}
            pt={"100px"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            px={50}
        >
            {/* <Container bg='purple.600' color='white'> */}
            {/* <Flex px={8} alignItems='center'> */}
            {/* {cardList} */}
            <Wrap spacing="5" alignItems={"center"}> {/* Use Wrap to wrap the cards */}
                {cardList}
            </Wrap>
            {/* </Flex> */}

            {/* </Container> */}

        </Flex >
    );
}
