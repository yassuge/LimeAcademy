// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = hre.ethers;

async function deployBookLibrary() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const BookLibrary = await ethers.getContractFactory("BookLibrary"); // 
  const bookLibraryContract = await BookLibrary.deploy();
  console.log('Waiting for BookLibrary deployment...');
  await bookLibraryContract.deployed();

  console.log('BookLibrary Contract address: ', bookLibraryContract.address);
  console.log('Done!');
}

// module.exports = deployBookLibrary;

deployBookLibrary().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
