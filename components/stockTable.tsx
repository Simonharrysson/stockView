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
// import axios from "axios";
// import useFetch from "react-fetch-hook";
// import wiki from "wikijs";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export type StockRowValues = {
  ticker: string;
  company_name: string;
  price_to_earning: number;
  current_price: number;
  close_price: number;
  change_percent: number;

  totCount: number;
  avgGive: number;
  totGive: number;
};

export const StockTable = () => {
  const [stocksValues, setStockValues] = useState<StockRowValues[]>([]);
  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPercentageChange, setTotalPercentageChange] = useState(0);

  const [simple, setSimple] = useState(false);

  // Sets hooks with localStorage initial data.
  useEffect(() => {
    const initialValue = localStorage.getItem("dataObject");
    if (initialValue) {
      setStockValues(JSON.parse(initialValue));
    }
  }, []);

  useEffect(() => {
    const initialValue = localStorage.getItem("simpleView");
    if (initialValue) {
      setSimple(JSON.parse(initialValue));
    }
  }, []);

  // Adds all stockvalues to localStorage
  useEffect(() => {
    localStorage.setItem("dataObject", JSON.stringify(stocksValues));
    console.log("Now updated:", stocksValues);
  }, [stocksValues]);

  useEffect(() => {
    localStorage.setItem("simpleView", JSON.stringify(!simple));
  }, [simple]);

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
    let creatingNew = true;

    const ticker = data.get("ticker") as string;
    const count = data.get("count") as unknown as number;
    const giveInput = data.get("give") as unknown as string;
    const give = giveInput.replace("$", "") as unknown as number;

    if (!stocksValues) {
      // Show error
      console.error("Big error here");
      return;
    }

    stocksValues.map((stock, i) => {
      if (stock.ticker == ticker) {
        creatingNew = false;

        const updateSO = stock;

        updateSO.totCount = +count + +updateSO.totCount;
        updateSO.totGive = +give + +updateSO.totGive;

        updateSO.avgGive = updateSO.totGive / updateSO.totCount;

        //Setting the updated value to the useState
        const updatedStockValues = stocksValues;
        updatedStockValues[i] = updateSO;

        setStockValues([...updatedStockValues]);
      }
    });

    if (!creatingNew) {
      return;
    }

    const stock_data = await stock.getRawStockData(ticker);

    //Calculate the change
    const stockObj: StockRowValues = {
      ticker: ticker,
      current_price: stock_data.latestPrice,
      //Latest price is correct, previous close is not
      close_price: stock_data.previousClose,
      change_percent: stock_data.changePercent,

      totGive: give,
      totCount: count,
      avgGive: give / count,
      // purchases: [[count: number, give: number]];
      company_name: stock_data.companyName,
      price_to_earning: stock_data.peRatio,
    };

    setStockValues([...stocksValues, stockObj]);
    setFieldValues(initialFieldValues);
  };

  // calculates the total when stocks change
  useEffect(() => {
    const handleCalcTotValue = () => {
      var total = 0;
      stocksValues.map((i) => {
        total += Number(i.totCount) * i.current_price;
      });
      return total;
    };
    const handleCalcTotChange = () => {
      var change = 0;
      stocksValues.map((i) => {
        change += Number(i.totCount) * i.current_price;
      });
      return change;
    };

    const intervalId = setInterval(() => {
      setTotalValue(handleCalcTotValue());
      setTotalPercentageChange(handleCalcTotChange());
      clearInterval(intervalId);
    }, 500);
  }, [stocksValues]);

  const handleRandomizeStock = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    console.log("randomizgin");
  };

  return (
    //The background
    <main>
      <Container>
        <Content>
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
              <Button
                name="add"
                variant="outlined"
                color="neutral"
                type="submit"
              >
                Add
              </Button>
            </FormContainer>
          </form>

          <FormGroup>
            <FormControlLabel
              onChange={(e) =>
                // e.preventDefault()
                setSimple(!simple)
              }
              control={<Switch color="info" />}
              label="Simple"
              style={{ color: "white" }}
            />
          </FormGroup>

          {stocksValues &&
            stocksValues.map((row, i) => (
              <StockRow
                key={row.ticker}
                stock_value={row}
                handleRemoveStock={handleRemoveStock}
                simple={simple}
              />
            ))}
        </Content>
      </Container>
    </main>
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
//  9. On/off switch "simple view" --> Displays markets prices √
