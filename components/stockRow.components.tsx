import styled from "styled-components";

export const TableGroup = styled.div`
  padding: 4px 12px;
  background-color: white;
  margin: 9px 0px;
  height: 60px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.025), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
`;

export const TableCellDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: horizontal;
  height: 55px;
  align-items: center;
}
`;

export const SideContent = styled.div<{
  align: string;
  width?: number;
  justify?: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  height: 50px;
`;

// export async function getStock(ticker: string) {
//   try {
//     const response = await axios.get(
//       `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${
//         iex.api_token
//       }`
//     );
//     // GET /stock/{symbol}/quote/{field}
//     // GET /stock/{symbol}/delayed-quote

//     return response.data[0];
//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function handle_dollar_change(
//   ticker: string,
//   stock_data: StockDataType
// ): Promise<[string, string]> {
//   //
//   //Gets yeasterdays stock object
//   const yeasterStockData = await stock.getYeasterdaysClose(
//     ticker,
//     stock_data.date
//   );

//   const yClose = yeasterStockData.previousClose;

//   console.log("1", stock_data);
//   console.log("2", yeasterStockData);

//   const dollar_change: string = (stock_data.close - yClose).toFixed(2);

//   const percentage_calc: string = (
//     (100 * Number(dollar_change)) /
//     yClose
//   ).toFixed(2);

//   return [dollar_change, percentage_calc];
// }
