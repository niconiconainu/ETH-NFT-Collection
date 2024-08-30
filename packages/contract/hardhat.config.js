// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "YOUR_ALCHEMY_API_URL" || "",
      accounts: "YOUR_PRIVATE_ACCOUNT_KEY" ? ["YOUR_PRIVATE_ACCOUNT_KEY"] : [],
    },
  },
};