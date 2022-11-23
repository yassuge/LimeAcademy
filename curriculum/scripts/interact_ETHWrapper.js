const keys = require("../../keys.json")
const PRIVATE_KEY = keys.PRIVATE_KEY_LOCAL
const API_KEY = keys.INFURA_API_KEY
const NETWORK = "goerli"

const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    await hre.run('compile'); // We are compiling the contracts using subtask
    const [signer] = await ethers.getSigners(); // We are getting the deployer
  
    console.log('Deploying contracts with the account:', signer.address); // We are printing the address of the deployer
    console.log('Account balance:', (await signer.getBalance()).toString()); // We are printing the account balance

    // const wallet = new hre.ethers.Wallet(PRIVATE_KEY, signer);
    const balance = await signer.getBalance();

    console.log(balance.toString())
    // const wrapValue = hre.ethers.utils.parseEther("1")

    // ETHWrapperFactory

    // const ETHWrapperContract = await ETHWrapperFactory.attach("<Your ETHWrapper address>");

    // console.log(ETHWrapperContract.address)

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });