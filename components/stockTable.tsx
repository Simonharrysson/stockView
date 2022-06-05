import React, { useEffect, useState } from "react";
import { StockRow } from "./stockRow";
import Button from "@mui/material/Button";
import ReactTextTransition from "react-text-transition";
import {
  initialFieldValues,
  Container,
  FormContainer,
  ValueTotal,
  TotalContainer,
  StyledTextField,
  DailyChangeTotal,
  Content,
} from "./stockTable.components";
import { stock } from "../models/stock";
import axios from "axios";
import useFetch from "react-fetch-hook";
import wiki from "wikijs";

export type StockRowValues = {
  ticker: string;
  company_name: string;
  count: number;
  current_price: number;
  close_price: number;
  give: string;
};

export const StockTable = () => {
  // const { isLoading, error, data } = useFetch("https://www.dogsofthedow.com/dow-jones-industrial-average-companies.html");

  // if (isLoading) console.log("Loading...");
  // if (error) console.log("Error here!");
  // const data: any = {};

  // wiki()
  //   .page("List of S&P 500 companies")
  //   .then((page) => page.tables())
  //   .then((tables) => {
  //     const table = tables[0];
  //     console.log(table);
  //     table.map((i: any) => {
  //       console.log(i);
  //       const symbol: any = table[i]["symbol"].split("}}")[0];
  //       const security = table[i]["security"];
  //       data[symbol] = security;
  //     });
  //     console.log(data);
  //   });

  const [stocksValues, setStockValues] = useState<StockRowValues[]>([]);
  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPercentageChange, setTotalPercentageChange] = useState(0);

  // Sets hooks with localStorage initial data.
  useEffect(() => {
    const initialValue = localStorage.getItem("dataObject");
    if (initialValue) {
      setStockValues(JSON.parse(initialValue));
    }
  }, []);


  // Adds all stockvalues to localStorage
  useEffect(
    () => {
      localStorage.setItem("dataObject", JSON.stringify(stocksValues));
      console.log("Now updated:", stocksValues);
    },
    [stocksValues]
  );

  const handleRemoveStock = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    stock: StockRowValues
  ) => {
    event.preventDefault();
    // console.log(event);
    console.log("removing");

    setStockValues(stocksValues.filter((item) => item.ticker !== stock.ticker));
  };

  // Handels adding new stocks to list.
  const handleAddStock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Set ticker state
    const data = new FormData(event.currentTarget);

    const ticker = data.get("ticker") as string;
    const count = (data.get("count") as unknown) as number;
    const give = data.get("give") as string;

    if (!stocksValues) {
      // Show error
      console.error("Big error here");
      return;
    }

    const stock_data = await stock.getRawStockData(ticker);

    //Calculate the change
    const stockObj: StockRowValues = {
      ticker: ticker,
      count: count,
      current_price: stock_data.latestPrice,
      close_price: stock_data.previousClose,
      give: give,
      company_name: stock_data.companyName,
    };

    setStockValues([...stocksValues, stockObj]);
    setFieldValues(initialFieldValues);
  };

  // calculates the total when stocks change
  useEffect(
    () => {
      const handleCalcTotValue = () => {
        var total = 0;
        stocksValues.map((i) => {
          total += Number(i.count) * i.current_price;
        });
        return total;
      };
      const handleCalcTotChange = () => {
        var change = 0;
        stocksValues.map((i) => {
          change += Number(i.count) * i.current_price;
        });
        return change;
      };
      const intervalId = setInterval(() => {
        setTotalValue(handleCalcTotValue());
        setTotalPercentageChange(handleCalcTotChange());
        clearInterval(intervalId);
      }, 500);
    },
    [stocksValues]
  );

  // const totalChange = calcTotChange();
  const fetchRandomTicker = async () => {
    console.log("fetching...");

    axios
      .get(
        "https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=S%26P_100&redirects"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // const searchQuery = "List of S&P 500 companies";
    const url = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=S%26P_100&redirects`;

    // "https://en.wikipedia.org/w/index.php?action=render&title=List_of_S%26P_500_companies";

    try {
      // ⛔️ TypeError: Failed to fetch
      // 👇️ incorrect or incomplete URL
      const response = await fetch(url, { mode: "no-cors" });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRandomizeStock = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    console.log("randomizgin");
  };

  return (
    //The background
    <Container>
      {/* Actuall content */}
      <Content>
        {/* <p>{JSON.stringify(data, null, 2)} </p> */}
        <TotalContainer>
          <ValueTotal>
            $
            {`${totalValue.toFixed(1)}`.split("").map((n, i) => (
              <ReactTextTransition
                key={i}
                text={n}
                className="big"
                direction="up"
                inline
              />
            ))}
          </ValueTotal>
          <DailyChangeTotal>Up $43 (+2,4%) from yeasterday</DailyChangeTotal>
        </TotalContainer>
        <br />
        <form onSubmit={handleAddStock}>
          <FormContainer>
            {/* <Button
              variant="outlined"
              name="randomize"
              color="neutral"
              onClick={(e) => handleRandomizeStock(e)}
            >
              Randomize
            </Button> */}
            <StyledTextField
              id="ticker"
              name="ticker"
              label="Ticker"
              color="primary"
              onChange={(e) =>
                setFieldValues({ ...fieldValues, ticker: e.target.value })
              }
              value={fieldValues["ticker"]}
            />
            <StyledTextField
              id="count"
              name="count"
              type="number"
              label="Shares"
              color="primary"
              onChange={(e) =>
                setFieldValues({ ...fieldValues, count: e.target.value })
              }
              value={fieldValues["count"]}
            />
            <StyledTextField
              id="give"
              name="give"
              label="Avg. Cost/share"
              color="primary"
              onChange={(e) =>
                setFieldValues({ ...fieldValues, give: e.target.value })
              }
              // a.substring(0, position) + b + a.substring(position);
              value={
                // fieldValues["give"].includes("$")
                "$" + fieldValues["give"].replace(/\D/g, "")
                // : "$" + fieldValues["give"].replace(/\D/g, "")
              }
            />
            <Button name="add" variant="outlined" color="neutral" type="submit">
              Add stock
            </Button>
          </FormContainer>
        </form>

        {stocksValues &&
          stocksValues.map((row, i) => (
            <StockRow
              key={row.ticker}
              stock_value={row}
              handleRemoveStock={handleRemoveStock}
            />
          ))}
      </Content>
    </Container>
  );
};

// Setup data fetch hook
// Set up MUI theme colors
// Stock features
//  1. Value √
//  2. Total portfolio value √
//  3. Total change (value now / close)
//  4. Able to add tickers √
//  5. Find out what conventions should be used
//     and clean up
//  6. Css breaking issue
//  7. Explore/add google ads
//  8. Edit stock list
//  9. On/off switch "simple view" --> Displays markets prices
