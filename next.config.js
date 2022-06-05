/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  // env: {
  //   api_token: "pk_e31de88a0ce041a98962e8a01cb4003f",
  //   base_url: "https://cloud.iexapis.com/",
  // },
  serverRuntimeConfig: {
    // Will only be available on the server side
    api_token: "pk_e31de88a0ce041a98962e8a01cb4003f",
    // secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    base_url: "https://cloud.iexapis.com/",
  },
  // target: "node",
};
