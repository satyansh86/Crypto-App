import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import {
  Container,
  HStack,
  Button,
  Select,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

import currencySymbols, { getCurrencyKeys } from "./currencySymbols"; 


export const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  

  const currencyKeys = getCurrencyKeys(); 

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Select
            maxW={28}
            m="2"
            borderRadius="lg"
            px="1"
            py="1"
            bg="gray.100"
            cursor="pointer"
            _focus={{ outline: "none" }}
            border="1px"
            borderColor="black"
            
            value={currency}
            
            onChange={(e) =>
               setCurrency(e.target.value)
            }
          >
            {currencyKeys.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>



          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbols[currency]}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => {
              return (
                <Button
                  key={index}
                  bgColor={"black"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};
