require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const keys = require("../keys.json")

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const INFURA_API_KEY = keys.INFURA_API_KEY;

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const PRIVATE_KEY = keys.PRIVATE_KEY;
const PRIVATE_KEY_LOCAL = keys.PRIVATE_KEY_LOCAL


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    localhost: {
      url:'http://127.0.0.1:8545/',
      accounts: [PRIVATE_KEY_LOCAL]
    }
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at <https://etherscan.io/>
    apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY"
  }

};

task("deploy-testnets", "Deploys contract on a provided network")
  .setAction(async (taskArguments, hre, runSuper) => {
    const deployElectionContract = require("./scripts/deploy_USElection");
    await deployElectionContract(taskArguments);
  });

task("deploy-LimeToken", "Deploys the contract", async (taskArgs, hre) => {
  const LimeToken = await hre.ethers.getContractFactory("LimeToken");
  const lime = await LimeToken.deploy();

  await lime.deployed();

  console.log("LimeCoin deployed to:", lime.address);
});
