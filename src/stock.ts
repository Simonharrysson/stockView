import { client } from "./config/config";

interface FiftyTwoWeek {
  low: string;
  high: string;
  low_change: string;
  high_change: string;
  low_change_percent: string;
  high_change_percent: string;
  range: string;
}

export interface QuoteResponse {
  name: string;
  exchange: string;
  mic_code: string;
  currency: string;
  datetime: string;
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: number;
  volume: string;
  previous_close: string;
  change: string;
  percent_change: number;
  average_volume: string;
  is_market_open: boolean;
  fifty_two_week: FiftyTwoWeek;
  
  purchase: purchase[];
  total: number;
  count: number;
  ticker: string;
  price: number;
  totalChange: number;
}

export interface purchase {
  count: number;
  give: number;
}

// Function to fetch current price and daily change
export async function fetchCurrentPriceAndChange(symbol: string, count: number, give: number, stocks: QuoteResponse[]): Promise<QuoteResponse | Error> {

  const params = {
      symbol: symbol,
      interval: "1day",
      outputsize: 1, 
    };
  
  try {
    const price_data = await client.price(params);
    const data = await client.quote(params);

    // check if data returned error
    if (data.status === "error") {
      throw new Error(data.message);
    }

    const new_purchase: purchase = {
      count: count,
      give: give,
    };
    
    data["ticker"] = symbol;
    data["price"] = price_data.price;
    
    const old_stock = stocks.find((i) => i.ticker === symbol);

    data["purchase"] = [new_purchase];

    if (old_stock) {
      return updateOldStock(old_stock, data, new_purchase);
    } else {
      const totalInvestment = count * give; 
      
      // Calculate the current value based on the current price
      const currentValue = count * data.price;

      // Calculate the total change (current value - cost basis)
      const totalChange = currentValue - totalInvestment;
    
      const percentageChange = (totalChange / totalInvestment) * 100;
      data["totalChange"] = percentageChange.toFixed(2);

      data["total"] = Number(count * give);
      data["count"] = count;
      return data;
    }
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const stock = {
  formatDate: (date: string | number | Date) => {
    return new Date(date)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
  },

};

function updateOldStock(old_stock: QuoteResponse, data: any, new_purchase: purchase): QuoteResponse {
  const old_purchase = old_stock["purchase"];

  data["purchase"] = old_purchase ? [...old_purchase, new_purchase] : [new_purchase];

  data["total"] = old_stock.total + Number(new_purchase.count * new_purchase.give);
  data["count"] = Number(Number(old_stock.count) + Number(new_purchase.count));

  const totalInvestment = data["purchase"].reduce((sum: number, purchase: purchase) => {
    return sum + (purchase.count * purchase.give);
  }, 0);

  // Calculate the current value based on the current price
  const currentValue = data.count * data.price;

  // Calculate the total change (current value - cost basis)
  const totalChange = currentValue - totalInvestment;

  const percentageChange = (totalChange / totalInvestment) * 100;
  data["totalChange"] = percentageChange.toFixed(2);

  return data;
}

