const keys = require ("../../../keys.json")
const hre = require("hardhat");
const USElection = require('../../artifacts/contracts/USElection.sol/USElection.json')

// const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
// const PRIVATE_KEY = keys.PRIVATE_KEY_LOCAL
// const contractAddress = keys.CONTRACTS["LOCALHOST"]["USElection"][0]

const provider = new hre.ethers.providers.InfuraProvider("goerli", keys.INFURA_API_KEY)
const PRIVATE_KEY = keys.PRIVATE_KEY
const contractAddress = keys.CONTRACTS["GOERLI"]["USElection"][0]

const run = async function() {
    console.log("running interact.js")
    console.log(hre.ethers.version)

    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

    const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider);

    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18))
    console.log(balance.toString())
    
    console.log(contractAddress)
    const electionContract = new hre.ethers.Contract(contractAddress, USElection.abi, wallet)
    // console.log(electionContract)

    const hasEnded = await electionContract.electionEnded()
    console.log("The election has ended:", hasEnded)

    const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio")
    console.log("Have results for Ohio:", haveResultsForOhio)

    // sending transactions
    const transactionOhio = await electionContract.submitStateResult(["titi", 250, 150, 24])
    const transactionReceipt = await transactionOhio.wait();
    if (transactionReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful")
        return 
    }

    const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("titi")
    console.log("Results submitted for titi", resultsSubmittedOhioNew)

    const currentLeader = await electionContract.currentLeader()
    console.log("Current leader", currentLeader)
}

run()