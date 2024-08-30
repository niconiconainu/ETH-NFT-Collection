// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Xj-41rkIzeKAQ36ST1JjkYmVziUIzY51" || "",
      accounts: "81169f1eb8079e07135711eefebeec27f68df01de632ed7691c716952b66e825" ? ["81169f1eb8079e07135711eefebeec27f68df01de632ed7691c716952b66e825"] : [],
      // url: "YOUR_ALCHEMY_API_URL" || "",
      // accounts: "YOUR_PRIVATE_ACCOUNT_KEY" ? ["YOUR_PRIVATE_ACCOUNT_KEY"] : [],
    },
  },
};