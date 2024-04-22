import {
    Flex,
    Text,
    useColorModeValue,
    Button,
    Wrap,
    WrapItem,
    Center,
    Icon,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Stack,
} from "@chakra-ui/react";
import { IoPencilSharp, IoAddOutline, IoTrashBinSharp, IoTrashSharp } from "react-icons/io5";
import userService from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";

export default function Room() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editRoom, setEditRoom] = useState(false)
    const [addRoom, setAddRoom] = useState(false)
    const [deleteRoom, setDeleteRoom] = useState(false)
    const [rooms, setRooms] = useState([])
    const [gifts, setGifts] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [newRoomName, setNewRoomName] = useState("")
    const [roomName, setRoomName] = useState("")
    const toast = useToast();
    const handleChange = (gid, field, value) => {
        setGifts(prevGifts =>
            prevGifts.map(gift =>
                gift.gid === gid ? { ...gift, [field]: value } : gift
            )
        );
    };
    const handleAddGift = () => {
        const newGift = { gid: Date.now(), name: "", quantity: "", likelihood: "", roomId: roomId };
        setGifts(prevGifts => [...prevGifts, newGift]);
    };

    const handleDeleteGift = (id) => {
        setGifts(prevGifts => prevGifts.filter(gift => gift.gid !== id && gift.id !== id));
    };
    const getAllRoom = async () => {
        let allRoom = await userService.showAllRoom();
        setRooms(allRoom)
    }
    const getGift = async (roomId) => {
        let gifts = await userService.getGiftsByRoom(roomId);
        setRoomId(roomId)
        setGifts(gifts)
    }
    useEffect(() => {
        getAllRoom()
    }, [])
    const submitNewRoom = async () => {
        if (newRoomName !== null) {
            userService.creatNewRoom(newRoomName).then((res) => {
                getAllRoom()
                setNewRoomName("")
                toast({
                    description: res.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }).catch((err) => {
                toast({
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
        } else {
            toast({
                description: "Room Name is empty",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const deleteRoomById = async (id) => {
        if (id !== null) {
            userService.deleteRoom(id).then((res) => {
                getAllRoom();
                toast({
                    description: res.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }).catch((err) => {
                toast({
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
        } else {
            toast({
                description: "id is empty",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const saveGifts = async () => {
        if (gifts !== null) {
            userService.saveGifts(gifts).then((res) => {
                console.log("res", res)
                toast({
                    description: res.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }).catch((err) => {
                toast({
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
        } else {
            toast({
                description: "Please fill in the gifts",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

    }
    const deleteGift = async (id) => {
        if (id !== null) {
            userService.deleteGift(id).then((res) => {
                toast({
                    description: res.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }).catch((err) => {
                toast({
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
        } else {
            toast({
                description: "id is empty",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const closeModal = async () => {
        setEditRoom(false);
        setAddRoom(false);
        setDeleteRoom(false);
        onClose()
    }
    let cardList = [];
    for (let i = 0; i < rooms.length; i++) {
        cardList.push(
            <WrapItem key={i} className="roomCard" alignItems={"center"}> {/* Set the width of each card */}
                <VStack width="100%" height="100%" position="relative">
                    <Flex
                        position="absolute" // Position the button absolutely within Flex
                        top="0" // Align top of the IconButton to the top of the Flex
                        right="0" // Align right of the IconButton to the right of the Flex
                        zIndex="1"
                    >
                        <Button
                            onClick={async () => {
                                await getGift(rooms[i].id)
                                setEditRoom(true)
                                onOpen()
                            }}
                            bg={"transparent"}
                            width="30px"
                            height="30px"
                        >
                            <Icon
                                as={IoPencilSharp}
                                boxSize={5}
                            />
                        </Button>
                        <Button
                            onClick={async () => {
                                setRoomId(rooms[i].id)
                                setRoomName(rooms[i].name)
                                setDeleteRoom(true)
                                onOpen()
                            }}
                            bg={"transparent"}
                            width="30px"
                            height="30px"
                        >
                            <Icon
                                as={IoTrashSharp}
                                boxSize={5}
                            />
                        </Button>
                    </Flex>


                    <Button width={"100%"} height={"100%"} bg={"transparent"}>
                        <Center className="roomText">
                            <Text>{rooms[i].name}</Text>
                        </Center>
                    </Button>
                </VStack>
            </WrapItem >
        );
    }
    /* const { message } = useSelector((state) => state.message); */
    let editRoomGiftModal = (
        <Flex direction="column" gap="4" alignItems={"center"}>
            {gifts.map((gift, index) => (
                <Flex key={gift.gid} gap="1" alignItems={"center"}>
                    <FormControl id={`giftName-${gift.gid}`}>
                        <FormLabel>Gift Name</FormLabel>
                        <Input
                            type="text"
                            value={gift.name}
                            onChange={(e) => handleChange(gift.gid, 'name', e.target.value)}
                        />
                    </FormControl>
                    <FormControl id={`quantity-${gift.gid}`}>
                        <FormLabel>Quantity</FormLabel>
                        <Input
                            type="text"
                            value={gift.quantity}
                            onChange={(e) => handleChange(gift.gid, 'quantity', parseInt(e.target.value))}
                        />
                    </FormControl>
                    <FormControl id={`probability-${gift.gid}`}>
                        <FormLabel>Likelihood</FormLabel>
                        <Input
                            type="text"
                            value={gift.likelihood}
                            onChange={(e) => handleChange(gift.gid, 'likelihood', parseFloat(e.target.value))}
                        />
                    </FormControl>
                    <FormControl width={"150px"} id={`delete-${gift.gid}`}>
                        <FormLabel>Remove</FormLabel>
                        <IconButton
                            icon={<IoTrashBinSharp />}
                            boxSize={10}
                            onClick={() => {

                                let id
                                if (gift?.gid) {
                                    id = gift.gid
                                } else {
                                    id = gift.id
                                    deleteGift(id)
                                }
                                console.log("gift", id)
                                handleDeleteGift(id)
                            }
                            }
                        />
                    </FormControl>
                </Flex>
            ))}
            <IconButton
                icon={<IoAddOutline />}
                boxSize={10}
                onClick={handleAddGift}
            />

        </Flex>
    )
    let addRoomModal = (
        <Stack>
            <FormControl id={``}>
                <FormLabel>Room Name</FormLabel>
                <Input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                />
            </FormControl>
        </Stack>
    )
    let deleteRoomModal = (
        <Stack>
            <Text>
                Are you sure you want to delete this Room {roomName}
            </Text>
        </Stack>
    )
    return (
        <>
            <Flex
                minH={"100vh"}
                height={"auto"}
                width={"100%"}
                pt={"100px"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                px={50}
            >
                <Wrap spacing="5" alignItems={"center"}> {/* Use Wrap to wrap the cards */}
                    {cardList}
                    <WrapItem className="roomCard" alignItems={"center"}> {/* Set the width of each card */}
                        <VStack width="100%" height="100%" position="relative">
                            <Button
                                width={"100%"}
                                height={"100%"}
                                bg={"transparent"}
                                onClick={() => {
                                    setAddRoom(true)
                                    onOpen()
                                }}>
                                <Center className="roomText">
                                    <Icon
                                        as={IoAddOutline}
                                        boxSize={10}
                                    />
                                </Center>
                            </Button>
                        </VStack>
                    </WrapItem >
                </Wrap>
            </Flex >
            <Modal
                size={"5xl"}
                isOpen={isOpen}
                onClose={closeModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{editRoom ? "Edit Gift" : addRoom ? "Add Room" : deleteRoom ? "Delete Room" : ""}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editRoom ? editRoomGiftModal : addRoom ? addRoomModal : deleteRoom ? deleteRoomModal : ""}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={closeModal}>
                            Close
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={() => {
                                if (editRoom) {
                                    saveGifts()
                                } else if (addRoom) {
                                    submitNewRoom()
                                } else if (deleteRoom) {
                                    deleteRoomById(roomId)
                                }
                                closeModal()
                            }}
                        >Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
