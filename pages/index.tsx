import Head from "next/head";
import { StockTable } from "../components/stockTable";
import * as React from "react";
import styled from "styled-components";

const Base = styled.div`
  height: 100%;
  width: 100%;
`;

const Home = () => {
  return (
    <html>
      <Head>
        <title>StockView</title>
        <meta name="description" content="Simple stock viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
        <StockTable />
      </body>
    </html>
  );
};

export default Home;
