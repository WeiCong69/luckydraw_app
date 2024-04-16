import {
    Text,
    Wrap,
    WrapItem,
    Stack,
    IconButton,
    Box,
    Image
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
    IoChevronBack,
} from "react-icons/io5";
import { useState, useEffect } from "react";
import gift from "../../assets/gift.png"
import { FullScreen, useFullScreenHandle } from "react-full-screen";


export default function SpankRoom() {

    const [highlightedCard, setHighlightedCard] = useState(null);
    const [buttonHit, setButtonHit] = useState(true);
    const handle = useFullScreenHandle();


    useEffect(() => {
        const animationDuration = 5000; // 5 seconds total duration
        const intervalDuration = 100; // Duration of each highlight phase

        // Function to randomly highlight a card
        const randomizeHighlight = () => {
            // Randomly pick a card to highlight
            const randomCardIndex = Math.floor(Math.random() * 10);
            setHighlightedCard(randomCardIndex);
        };
        // Start the interval
        const interval = setInterval(randomizeHighlight, intervalDuration);
        // Set a timeout to clear the interval after 5 seconds, stopping the animation
        const timeout = setTimeout(() => {
            clearInterval(interval);
            setHighlightedCard(null); // Optionally, you can set this to a specific card to indicate a "winner"
        }, animationDuration);
        // Cleanup function to clear interval and timeout if the component unmounts
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [buttonHit]);

    let cardList = [];
    for (let i = 0; i < 10; i++) {
        cardList.push(
            <WrapItem
                key={i}
                id={i + "cardItem"}
                height="250px"
                width="300px"
                // boxShadow="0 0 40px yellow"
                boxShadow={i === highlightedCard ? "0 0 40px yellow" : "none"}
                bg="blackAlpha.500"
                borderRadius="10px"
                justify="center"
                align="center"
            > {/* Set the width of each card */}
                <Box justify="center" align="center">
                    <Image src={gift} width={"150px"} height={"150px"} />
                    <Text textShadow='0 0 10px white' color="white">Earbudsss Earbudsss Earbudsss Earbudsss Earbudsss</Text>
                </Box>
            </WrapItem>
        );
    }

    return (
        <FullScreen handle={handle}>
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
                // onClick={handle.enter}
                />
                <Wrap spacing="3" alignItems={"center"} justify={"center"}> {/* Use Wrap to wrap the cards */}
                    {cardList}
                </Wrap>
            </Stack >
        </FullScreen>
    );
}
