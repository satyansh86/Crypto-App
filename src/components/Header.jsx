import { HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"black"} gap={"10"} >
      <Button m={"2"} variant={"unstyled"} color={"white"}>
        <Link to={"/"}>Home</Link>
      </Button>

      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/coins"}>Coins</Link>
      </Button>

      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/exchange"}>Exchanges</Link>
      </Button>
    </HStack>
  );
};

export default Header;
