require("dotenv").config()

// change this based on the network
var API_URL = ""
if (process.env.NETWORK == "MAINNET") {
  API_URL = process.env.MAINNET_API_URL
} else if (process.env.NETWORK == "POLYGON") {
  API_URL = process.env.POLYGON_API_URL
}
const PUBLISHER_ADDRESS = process.env.PUBLISHER_ADDRESS
const PUBLISHER_PRIVATE_KEY = process.env.PUBLISHER_PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/SampleNFT.sol/SampleNFT.json")
const contractAddress = process.env.CONTRACT_ADDRESS

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(nonce, numberToMint) {
  //the transaction
  const tx = {
    'from': PUBLISHER_ADDRESS,
    'to': contractAddress,
    'nonce': nonce,
    'gasPrice': 900000000, // edit the gas price
    'gas': 200000, // set the gas
    'data': nftContract.methods.publicMint(numberToMint).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PUBLISHER_PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

async function mintNFTs() {
  let nonce = await web3.eth.getTransactionCount(PUBLISHER_ADDRESS, 'latest'); //get latest nonce
  mintNFT(nonce, 1)
  // nonce += 1
  console.log(`Minting is complete! Minted 1 tokens`);
}

mintNFTs()