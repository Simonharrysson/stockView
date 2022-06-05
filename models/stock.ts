import { iex } from "../config/iex";
import axios from "axios";
import { StockRowValues } from "../components/stockTable";

export interface SstockDataType {
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
}

export interface RawStockData {
  avgTotalVolume: number;
  calculationPrice: string;
  change: number;
  changePercent: number;
  close: number;
  closeSource: string;
  closeTime: string;
  companyName: string;
  currency: string;
  delayedPrice: any;
  delayedPriceTime: any;
  extendedChange: any;
  extendedChangePercent: any;
  extendedPrice: any;
  extendedPriceTime: any;
  high: any;
  highSource: any;
  highTime: any;
  iexAskPrice: number;
  iexAskSize: number;
  iexBidPrice: number;
  iexBidSize: number;
  iexClose: number;
  iexCloseTime: number;
  iexLastUpdated: number;
  iexMarketPercent: number;
  iexOpen: number;
  iexOpenTime: number;
  iexRealtimePrice: number;
  iexRealtimeSize: number;
  iexVolume: number;
  lastTradeTime: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume: any;
  low: any;
  lowSource: any;
  lowTime: any;
  marketCap: number;
  oddLotDelayedPrice: any;
  oddLotDelayedPriceTime: any;
  open: any;
  openTime: any;
  openSource: string;
  peRatio: number;
  previousClose: number;
  previousVolume: number;
  primaryExchange: string;
  symbol: string;
  volume: any;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: false;
}

// type MyHandler = (message: RawStockData) => void;

export const stock = {
  formatDate: (date: string | number | Date) => {
    return new Date(date)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
  },
  getRawStockData: async (ticker: string) => {
    return await fetch(stock.latestPriceURL(ticker))
      .then((response) => response.json())
      .then((data) => {
        const stockData: RawStockData = data;
        console.log("what is this then:", stockData);
        return stockData;
      });
    //stock.formatPriceData(data)
  },

  //https://cloud.iexapis.com/stable/stock/msft/quote?token=pk_e31de88a0ce041a98962e8a01cb4003f
  latestPriceURL: (ticker: string) => {
    console.log(
      `${iex.base_url}/stock/${ticker}/quote/?token=${iex.api_token}`
    );
    return `${iex.base_url}/stock/${ticker}/quote/?token=${iex.api_token}`;

    // return `${
    //   iex.base_url
    // }/stick/${ticker}/intraday-prices?chartLast=1${date}&token=${
    //   iex.api_token
    // }`;
  },

  // formatPriceData: (data: any) => {
  //   const stockData: RawStockData = data[data.length - 1];
  //   const formattedData: StockRowValues = {
  //     ticker: stockData.symbol,
  //     company_name: stockData.companyName,
  //     count: 1000,
  //     current_price: stockData.iexRealtimePrice,
  //     close_price: 1000,
  //     give: "1000",
  //   };

  //   return formattedData;
  // },

  getYeasterdaysClose: async (ticker: string, date: string) => {
    return await stock
      .getLastTradingDate(date)
      .then(async (data: any) => {
        const yeasterDaysDate = data[0].date;

        const yeasterdayCloseURL = stock.yeasterdayCloseURL(
          ticker,
          yeasterDaysDate
        );

        const response = await axios.get(yeasterdayCloseURL);

        const yeasterDaysStockData = response.data[0] as RawStockData;

        return yeasterDaysStockData;
      })
      .catch((err) => {
        throw Error("Could not get last trading date.");
      });
  },

  getLastTradingDate: async (date: string | number | Date) => {
    //Ger bara ett datum
    const lastTradingDay = stock.formatDate(date);

    const url = `${
      iex.base_url
    }/ref-data/us/dates/trade/last/1/${lastTradingDay}?token=${iex.api_token}`;
    // console.log("print this pleas", await fetch(url).then((res) => res.json()));
    return await fetch(url).then((res) => res.json());
  },

  yeasterdayCloseURL: (ticker: any, date?: any) => {
    const newDate = new Date();
    const lastTradingDate = stock.formatDate(date ? date : newDate);

    return `${
      iex.base_url
    }/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradingDate}&token=${
      iex.api_token
    }`;
  },
};
