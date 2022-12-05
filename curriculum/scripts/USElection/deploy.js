// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = hre.ethers;

async function deployElectionContract() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const USElection = await ethers.getContractFactory("USElection", deployer); // 
  const usElectionContract = await USElection.deploy();
  console.log('Waiting for USElection deployment...');
  await usElectionContract.deployed();

  console.log('USElection Contract address: ', usElectionContract.address);
  console.log('Done!');
}

// module.exports = deployElectionContract;

deployElectionContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
