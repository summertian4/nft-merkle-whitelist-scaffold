/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const {
   RINKEBY_API_URL,
   ROPSTEN_API_URL,
   POLYGON_API_URL,
   MAINNET_API_URL,
   PUBLISHER_PRIVATE_KEY,
   SCAN_API_KEY
} = process.env;
module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "mumbai",
   networks: {
      hardhat: {},
      rinkeby: {
         url: RINKEBY_API_URL,
         accounts: [PUBLISHER_PRIVATE_KEY],
         gasPrice: 1000000000, // 1 gwei
      },
      mainnet: {
         url: MAINNET_API_URL,
         accounts: [PUBLISHER_PRIVATE_KEY],
         gasPrice: 55000000000, // 55 gwei
      },
      polygon: {
         url: POLYGON_API_URL,
         accounts: [PUBLISHER_PRIVATE_KEY]
      },
      mumbai: {
         url: POLYGON_API_URL,
         accounts: [PUBLISHER_PRIVATE_KEY]
      },
      ropsten: {
         url: ROPSTEN_API_URL,
         accounts: [PUBLISHER_PRIVATE_KEY]
      }
   },
   etherscan: {
      // Your API key for Etherscan / polygonscan...
      // Obtain one at https://etherscan.io/ or https://polygonscan.com ...
      apiKey: {
         polygon: SCAN_API_KEY,
         polygonMumbai: SCAN_API_KEY
      }
   }
}
