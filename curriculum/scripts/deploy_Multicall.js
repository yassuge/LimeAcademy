const hre = require("hardhat");
const ethers = hre.ethers;

async function deployBookLibrary() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const Multicall = await ethers.getContractFactory("Multicall"); // 
  const MulticallContract = await Multicall.deploy();
  console.log('Waiting for Multicall deployment...');
  await MulticallContract.deployed();

  console.log('Multicall Contract address: ', MulticallContract.address);
  console.log('Done!');
}

deployBookLibrary().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
