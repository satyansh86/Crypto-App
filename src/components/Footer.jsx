import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import img from "../assets/125157064.jpg";


// const avatarSrc = "https://avatars.githubusercontent.com/u/92221305?v=4";

const Footer = () => {
  return (
    <Box
      bgColor={"black"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            We are the best crypto trading app in India, we provide our guidance
            at a very cheap price.
          </Text>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={img} />
          <a href="https://github.com/satyansh86" target="_blank">Github</a>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;