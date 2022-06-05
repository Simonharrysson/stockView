import axios from "axios";
import { iex } from "../config/iex";

export interface Stock {
  average: number;
  close: number;
  date: string;
  high: number;
  label: string;
  low: number;
  minute: string;
  notional: number;
  numberOfTrades: number;
  open: number;
  volume: number;
  dollar_change: number | null;
  percent_change: number | null;
}

//setStock: React.Dispatch<React.SetStateAction<Stock | undefined>>,
export async function useGetStock(ticker: string) {
  try {
    const response = await axios.get(
      `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${
        iex.api_token
      }`
    );
    // GET /stock/{symbol}/quote/{field}
    // GET /stock/{symbol}/delayed-quote

    return response.data[0];
  } catch (error) {
    console.log(error);
  }
}
