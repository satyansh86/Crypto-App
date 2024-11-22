import {
    Box,
    Container,
    Select,
    VStack,
    Text,
    Image,
    Stat,
    StatLabel,
    StatNumber,
    StatArrow,
    StatHelpText,
    Badge,
    Progress,
    HStack,
    Button,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import Loader from "./Loader";
  import axios from "axios";
  import { useParams } from "react-router-dom";
  import { server } from "../main";
  import ErrorComponent from "./ErrorComponent";
  import currencySymbols, { getCurrencyKeys } from "./currencySymbols";
  
  import Chart from "./Chart";
  
  export const CoinDetails = () => {
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const [days, setDays] = useState("24h");
    const [chartArr, setChartArr] = useState([]);
  
    const currencyKeys = getCurrencyKeys();
    const params = useParams();
  
    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  
    const switchChartStats = (key) => {
      switch (key) {
        case "24h":
          setDays("24h");
          setLoading(true);
          break;
        case "7d":
          setDays("7d");
          setLoading(true);
          break;
        case "14d":
          setDays("14d");
          setLoading(true);
          break;
        case "30d":
          setDays("30d");
          setLoading(true);
          break;
        case "60d":
          setDays("60d");
          setLoading(true);
          break;
        case "200d":
          setDays("200d");
          setLoading(true);
          break;
        case "1y":
          setDays("365d");
          setLoading(true);
          break;
        case "max":
          setDays("max");
          setLoading(true);
          break;
  
        default:
          setDays("24h");
          setLoading(true);
          break;
      }
    };
  
    useEffect(() => {
      const fetchCoin = async () => {
        try {
          const { data } = await axios.get(`${server}/coins/${params.id}`);
  
          const { data: chartData } = await axios.get(
            `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
          );
  
          // console.log(data);
          // console.log(chartData.prices)
          setCoin(data);
          setChartArr(chartData.prices);
          setLoading(false);
          console.log(data);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchCoin();
    }, [params.id, currency, days]);
  
    if (error) <ErrorComponent message={"Error while fetching coin details"} />;
  
    return (
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box width={"full"} borderWidth={1} overflowX={"auto"}>
              <Chart arr={chartArr} currency={currency} days={days} />
            </Box>
  
            {/* button for chart */}
            <HStack p={"4"} overflowX={"auto"}>
              {btns.map((i) => (
                <Button
                  disabled={days === i}
                  key={i}
                  onClick={() => switchChartStats(i)}
                >
                  {i}
                </Button>
              ))}
            </HStack>
  
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
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencyKeys.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
  
            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                Last Updated On{" "}
                {Date(coin.market_data["last_updated"]).split("G")[0]}
              </Text>
  
              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />
  
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
  
                <StatNumber>
                  {currencySymbols[currency]}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
  
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
  
              <Badge
                fontSize={"2xl"}
                bgColor={"black"}
                color={"white"}
                p={"3"}
                borderRadius={"3"}
              >{`#${coin.market_cap_rank}`}</Badge>
  
              <CustomBar
                high={`${currencySymbols[currency]} ${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbols[currency]} ${coin.market_data.low_24h[currency]}`}
              />
  
              <Box w={"full"} p={"4"}>
                <Item title={"Max Supply"} value={coin.market_data.max_supply?coin.market_data.max_supply:"NA"} />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbols[currency]} ${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbols[currency]} ${coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbols[currency]} ${coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    );
  };
  
  const Item = ({ title, value }) => {
    return (
      <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
          {title}
        </Text>
        <Text>{value}</Text>
      </HStack>
    );
  };
  
  const CustomBar = ({ high, low }) => {
    return (
      <VStack w={"full"}>
        <Progress value={50} colorScheme="teal" w={"full"} />
        <HStack w={"full"} justifyContent={"space-between"}>
          <Badge children={low} colorScheme="red" />
          <Text fontSize={"sm"}>24H Range</Text>
          <Badge children={high} colorScheme="green" />
        </HStack>
      </VStack>
    );
  };
  