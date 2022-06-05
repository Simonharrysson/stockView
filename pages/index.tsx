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
    <Base>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Simple stock viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main> */}
      <body>
        <StockTable />
      </body>
      {/* </main> */}

      <footer>{/* <h4>Footer</h4> */}</footer>
    </Base>
  );
};

export default Home;
