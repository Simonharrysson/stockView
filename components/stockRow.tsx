import React from "react";
import { Icon, Typography } from "@mui/material";
import { StockRowValues } from "../components/stockTable";
import { SideContent, TableGroup, TableCellDiv } from "./stockRow.components";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { FlexDiv } from "./helper.components";
import styled from "styled-components";

type RowProps = {
  stock_value: StockRowValues;
  simple: boolean;
  handleRemoveStock: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    stock: StockRowValues
  ) => void;
};

const ClickLink = styled.a`
  cursor: pointer;
`;

const RowTitle = styled(Typography)`
  font-size: 14px;
`;

export const StockRow = ({
  stock_value,
  handleRemoveStock,
  simple,
}: RowProps) => {
  // console.log(stock)
  // console.log("should this not be full:", stock_value);
  const dollar_change = stock_value.current_price - stock_value.close_price;
  return (
    <TableGroup>
      <TableCellDiv>
        <SideContent align="flex-start">
          <RowTitle color="primary" fontWeight="regular" overflow="hidden">
            {stock_value.company_name}
          </RowTitle>

          <FlexDiv>
            {/* <ClickLink onClick={() => console.log("Add")}>
              <AddOutlinedIcon htmlColor="RGB(0, 255, 0)" />
            </ClickLink> */}
            <RowTitle color="secondary" fontWeight="bold">
              {stock_value.totCount}{" "}
              {stock_value.totCount > 1 ? "STOCKS" : "STOCK"}
            </RowTitle>
            {/* <ClickLink onClick={() => console.log("Remove")}>
              <RemoveOutlinedIcon htmlColor="red" />
            </ClickLink> */}
          </FlexDiv>
        </SideContent>

        <SideContent align="center" justify="center">
          <RowTitle color={"red"}>
            <a
              href=""
              onClick={(event) => handleRemoveStock(event, stock_value)}
            >
              Remove
            </a>
          </RowTitle>
        </SideContent>

        {simple && (
          <SideContent align="flex-start">
            <RowTitle align="left">P/E Ratio</RowTitle>
            <RowTitle align="left">{stock_value.price_to_earning}</RowTitle>
          </SideContent>
        )}

        <SideContent align="flex-start">
          <RowTitle align="left">Avg. Cost/share</RowTitle>
          <RowTitle align="left">${stock_value.avgGive.toFixed(1)}</RowTitle>
        </SideContent>

        <SideContent align="flex-start">
          <RowTitle align="left">All time change</RowTitle>
          <RowTitle align="left">
            {(
              100 *
              (stock_value.current_price / stock_value.totGive - 1)
            ).toFixed(1)}
            %
          </RowTitle>
        </SideContent>

        <SideContent align="flex-end">
          <RowTitle>${stock_value.current_price}</RowTitle>
          <RowTitle color={dollar_change > 0 ? "green" : "red"}>
            ${dollar_change.toFixed(2)} ( $
            {Math.abs(100 * stock_value.change_percent).toFixed(2)}%
            {/* {((100 * dollar_change) / stock_value.current_price).toFixed(2)}% */}
            )
          </RowTitle>
        </SideContent>
      </TableCellDiv>
    </TableGroup>
  );
};
