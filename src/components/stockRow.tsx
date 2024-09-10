import React, { useState } from "react";
// import { SideContent, TableGroup, TableCellDiv } from "./stockRow.components";
import { QuoteResponse, purchase } from "../stock";
import ArrowUpwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Slide } from "@mui/material";

type RowProps = {
  stock_value: QuoteResponse;
  handleRemoveStock: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    stock: QuoteResponse
  ) => void;
};

export const StockRow = ({
  stock_value: stock,
  handleRemoveStock,
}: RowProps) => {

  interface MyComponentProps {
    width?: number;
    align: string;
    justify?: string;
    children?: React.ReactNode;
    className?: string;
  }
  
  const FlexComponent: React.FC<MyComponentProps> = ({ width = 0, align = 'flex-start', className, justify = 'flex-center', children }) => {
    return (
      <div
        className={`tw-flex tw-flex-col tw-flex-1 tw-${align} ${className} tw-items-start tw-${justify} tw-w-[${width}]`}
      >
        {children}
      </div>
    );
  };

  const [arrowDown, setArrowDown] = useState(true);

  const handleFlipArrow = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setArrowDown(!arrowDown);
  };

  
  return (
    <div className="tw-px-3 tw-py-1 tw-bg-background tw-text-foreground tw-my-2 tw-rounded">    
    <div className="tw-flex tw-justify-between">

      <div className="tw-bg-background tw-flex tw-w-[80%] tw-justify-between tw-h-[45px] tw-items-center">

        <FlexComponent align="tw-flex-start">
          <p className="tw-m-0 tw-font-bold">
            {stock.ticker.toUpperCase()}
          </p>

          <div className="tw-flex">
            <p className="tw-m-0">
              {stock.count}{" "}
              {stock.count > 1 ? "STOCKS" : "STOCK"}
            </p>
          </div>

        </FlexComponent>

        <FlexComponent align="flex-start">
          <p className="tw-m-0left">${(stock.total / stock.count).toFixed(2)}</p>
        </FlexComponent>

        <FlexComponent align="tw-flex-start">
          <p className="tw-m-0">
            {stock.totalChange}% {stock.totalChange > 0 ? "UP" : "DOWN"}           
          </p>
        </FlexComponent>

        <FlexComponent align="tw-m-0 tw-flex-end">
          <p className="tw-m-0 tw-text-l tw-font-medium tw-text-right">${Number(stock.price).toFixed(2)}</p>
          <p className="tw-m-0" color={(stock.percent_change) > 0 ? "green" : "red"}>
            ${Number(stock.percent_change).toFixed(2)} ( $
            {Math.abs(100 * Number(stock.percent_change)).toFixed(2)}%
            )
          </p>
        </FlexComponent>

      </div>

      <div>
        <a
          href=""
          onClick={(event) => handleRemoveStock(event, stock)}
        >
          <DeleteIcon color="secondary" />
        </a>
        <a
          href=""
          onClick={(e) => handleFlipArrow(e)}
          className="tw-flex-none"
        >
          <ArrowUpwardIcon className={`${arrowDown ? "tw-rotate-180" : ""} tw-transition-transform`} color="secondary" />
        </a>
      </div>
      </div>
      
      <div className={`tw-bg-primary tw-mt-2 tw-rounded-lg tw-transition-all tw-justify-between tw-w-[80%] ${!arrowDown ? ``: "tw-h-0"}`}>
      {stock.purchase.map((purchase: purchase, i: number) => (
        <div className={`tw-transition-none tw-p-2 ${!arrowDown ? "tw-visible" : "tw-hidden"} tw-flex tw-flex-row tw-gap-10`}>
          <p className="tw-m-0 tw-italic">#{i+1}</p>
          <p className="tw-m-0">Count: {purchase.count}</p>
          <p className="tw-m-0">Purchase Price: ${purchase.give}</p>
        </div>
      ))}
      </div>
 
    </div>
  );
};