import React, { useEffect, useState } from "react";
import { StockRow } from "./stockRow";
import Button from "@mui/material/Button";
import ReactTextTransition from "react-text-transition";
import { fetchCurrentPriceAndChange, QuoteResponse } from "../stock";
import {TextField } from "@mui/material";
import { SwitchTextTrack } from "../mui-treasury/switch-text-track";

export const StockTable = () => {

  const initialFieldValues = {
    ticker: "amzn",
    count: "5",
    give: "20",
  };

  const [stocksValues, setStockValues] = useState<QuoteResponse[]>(localStorage.getItem("dataObject") ? JSON.parse(localStorage.getItem("dataObject") as string) : []);
  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const [totalValue, setTotalValue] = useState(0);
  const [tickerError, setTickerError] = useState("");

  // Adds all stockvalues to localStorage
  useEffect(() => {
    localStorage.setItem("dataObject", JSON.stringify(stocksValues));
  }, [stocksValues]);

  const handleRemoveStock = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    stock: QuoteResponse
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
    const count = data.get("count") as unknown as number;
    const giveInput = data.get("give") as unknown as string;
    const give = giveInput.replace("$", "") as unknown as number;

    try {
        const stock_data = await fetchCurrentPriceAndChange(ticker, count, give, stocksValues);
        
        if (stock_data instanceof Error) {
          console.log("Erroro fetching stock data", stock_data);
          return;
        }
        
        if (stocksValues.find((i) => i.ticker === stock_data.ticker)) {
          const newStocksValues = stocksValues.map((i) => i.ticker === stock_data.ticker ? stock_data : i
          );
          setStockValues(newStocksValues);
        } else {
          setStockValues([...stocksValues, stock_data]);
        }
        setFieldValues(initialFieldValues);
        
        // add to local storage
        localStorage.setItem("dataObject", JSON.stringify(stock_data));
      } catch (error) {
        setTickerError(ticker + " is not a valid ticker");
        console.log("Error fetching stock data", error);
      }
    };
    
    useEffect(() => {
    const handleCalcTotValue = () => {
      var total = 0;
      stocksValues.map((i) => {
        i.purchase.map((j) => {
          total += Number(j.count) * j.give;
        });
      });
      return total;
    };

    const intervalId = setInterval(() => {
      setTotalValue(handleCalcTotValue());
      clearInterval(intervalId);
      console.log("perfomring fetch");
    }, 500);
  }, [stocksValues]);

  interface MyComponentProps {
    width?: number;
    align?: string;
    justify?: string;
    children?: React.ReactNode;
    className?: string
  }

  const FlexComponent: React.FC<MyComponentProps> = ({ width = "50", align = 'flex-start', justify = 'flex-start', className = "", children }) => {
    return (
      <div
        className={`tw-flex tw-flex-col tw-h-[25px] ${className}  tw-${align} tw-${justify} tw-w-${width}`}
      >
        {children}
      </div>
    );
  };

  return (

    <div className="tw-h-full tw-bg-background tw-font-hind">
      <div className="tw-border-2 tw-border-foreground tw-border-dashed tw-rounded-lg tw-p-4 tw-max-w-[900px] tw-mx-auto tw-mt-8 tw-h-full">
        <div className="tw-h-[10%] tw-w-full tw-min-h-[200px] tw-bg-background tw-text-foreground tw-flex tw-flex-row tw-justify-start tw-items-center">
          <p className="tw-mb-0 tw-mr-4">Account total:</p>
          <p className="tw-text-[5rem] tw-m-0 tw-font-bold">
            $
            {`${totalValue.toFixed(1)}`.split("").map((n, i) => (
              <ReactTextTransition
                key={i}
                className="tw-big"
                direction="up"
                inline>
                  {n}
              </ReactTextTransition>
            ))}
          </p>
        </div>
        <br />
        <form onSubmit={handleAddStock}>
          <div className="tw-h-[10%] tw-mb-16 tw-w-full tw-bg-background tw-text-foreground tw-flex tw-flex-row tw-justify-between tw-items-baseline">

            <TextField
              id="ticker"
              name="ticker"
              label="Ticker"
              onChange={(e) => setFieldValues({ ...fieldValues, ticker: e.target.value })}
              value={fieldValues["ticker"]} 
              error={tickerError !== ""}
              helperText={tickerError}
              // primary main as color
              color="secondary"
              sx={{ color: "white", borderColor: "white" }}
            />

            <TextField
              id="count"
              name="count"
              type="number"
              label="Shares"
              color="secondary"
              onChange={(e) => setFieldValues({ ...fieldValues, count: e.target.value })}
              value={fieldValues["count"]} />

            <TextField
              id="give"
              name="give"
              label="Avg. Cost/share"
              color="secondary"
              onChange={(e) => setFieldValues({ ...fieldValues, give: e.target.value })}
              value={
                // fieldValues["give"].includes("$")
                "$" + fieldValues["give"].replace(/\D/g, "")
                // : "$" + fieldValues["give"].replace(/\D/g, "")
              } />
            <Button
              name="add"
              variant="contained"
              type="submit"
              color="secondary"
            >
              Add
            </Button>
          </div>
        </form>

        {/* <FormGroup>
          <FormControlLabel
            onChange={(e) =>
              // e.preventDefault()
              setSimple(!simple)}
            control={<Switch color="info" />}
            label="Simple"
            style={{ color: "white" }} />
        </FormGroup> */}

{stocksValues.length > 0 && 
  <div className="tw-px-3 tw-py-1 tw-my-2  tw-text-foreground tw-font-bold tw-flex tw-justify-between">    
      <div className="tw-flex tw-gap-20 tw-items-center">

        <FlexComponent>
          <p className="tw-m-0">
            Ticker
          </p>
        </FlexComponent>

        <FlexComponent>
          <p className="tw-m-0">Avg. Cost/share</p>
        </FlexComponent>

        <FlexComponent>
          <p className="tw-m-0">All time change</p>
        </FlexComponent>

        <FlexComponent>
          <p className="tw-m-0">Change</p>
        </FlexComponent>
      </div>
    </div>
    }

        {stocksValues.map((row, i) => (
          <><hr /><StockRow
            key={row.ticker}
            stock_value={row}
            handleRemoveStock={handleRemoveStock} /></>
        ))}
      </div>
    </div>
  );
};
