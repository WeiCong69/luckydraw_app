// import styles from '@/styles/Home.module.css'
import { Heading, Flex } from "@chakra-ui/react";
import useDocumentTitle from "./components/useDocumentTitle";

export default function Home() {
  useDocumentTitle("404 - Not Found");
  return (
    <>
      <main>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Heading colorScheme="blue">404 - Not Found</Heading>
        </Flex>
      </main>
    </>
  );
}
