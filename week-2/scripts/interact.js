const hre = require("hardhat");
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json')

const run = async function() {
    console.log("running interact.js")
    console.log(hre.ethers.version)

    const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18))
    console.log(balance.toString())

    const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
    const electionContract = new hre.ethers.Contract(contractAddress, USElection.abi, wallet)
    console.log(electionContract)

    // const USElectionFactory = await hre.ethers.getContractFactory("USElection");
    // const electionContract_2 = await USElectionFactory.attach("0xc9707E1e496C12f1Fa83AFbbA8735DA697cdBf64");
    // console.log(electionContract_2)


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