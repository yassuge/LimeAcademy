require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.17",
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async (taskArguments, hre, runSuper) => {
        const deployElectionContract = require("./scripts/deploy");
        await deployElectionContract(taskArguments);
    });

subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
      console.log(taskArgs.message);
    });