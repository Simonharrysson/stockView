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
  handleRemoveStock: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    stock: StockRowValues
  ) => void;
};

const ClickLink = styled.a`
  cursor: pointer;
`;

export const StockRow = ({ stock_value, handleRemoveStock }: RowProps) => {
  // console.log(stock)
  // console.log("should this not be full:", stock_value);
  const dollar_change = stock_value.current_price - stock_value.close_price;
  return (
    <TableGroup>
      <TableCellDiv>
        <SideContent align="flex-start" width={200}>
          <Typography color="primary" fontWeight="regular" overflow="hidden">
            {stock_value.company_name}
          </Typography>

          <FlexDiv width={150}>
            <ClickLink onClick={() => console.log("Add")}>
              <AddOutlinedIcon htmlColor="RGB(0, 255, 0)" />
            </ClickLink>
            <Typography color="secondary" fontWeight="bold">
              {stock_value.count} STOCKS
            </Typography>
            <ClickLink onClick={() => console.log("Remove")}>
              <RemoveOutlinedIcon htmlColor="red" />
            </ClickLink>
          </FlexDiv>
        </SideContent>

        <SideContent align="center" width={100} justify="center">
          <Typography>
            <a
              href=""
              onClick={(event) => handleRemoveStock(event, stock_value)}
            >
              Remove
            </a>
          </Typography>
        </SideContent>

        <SideContent align="flex-end" width={150}>
          <Typography>${stock_value.current_price}</Typography>
          <Typography color={dollar_change > 0 ? "green" : "red"}>
            ${dollar_change.toFixed(2)} (
            {((100 * dollar_change) / stock_value.current_price).toFixed(2)}%)
          </Typography>
        </SideContent>
      </TableCellDiv>
    </TableGroup>
  );
};
