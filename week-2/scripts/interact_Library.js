const hre = require("hardhat");
const BookLibrary = require('../artifacts/contracts/BookLibrary.sol/BookLibrary.json')

const run = async function() {
    console.log("running interact_Library.js")
    console.log(hre.ethers.version)

    const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    // const provider = new hre.ethers.providers.InfuraProvider("goerli", "API_KEY")

    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    // const wallet = new hre.ethers.Wallet("PRIVATE_KEY", provider);

    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18))
    console.log(balance.toString())

    const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508"
    const libraryContract = new hre.ethers.Contract(contractAddress, BookLibrary.abi, wallet)
    // console.log(libraryContract)

    console.log(await libraryContract.owner())

    // const transactionBookCreated = await libraryContract.addBook("Book_0", 10)
    // console.log(transactionBookCreated)

    const availableBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are : ", availableBooks)

    const transactionRentBook = await libraryContract.borrowBook("User_6","Book_0")
    const transactionReceipt = await transactionRentBook.wait();
    if (transactionReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful")
        return 
    }
    console.log(transactionRentBook)


    const availablePostBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are post borrow: ", availablePostBooks)

    // Return book
    const transactionReturnBook = await libraryContract.returnBook("User_5","Book_0")
    const transactionRetReceipt = await transactionReturnBook.wait();
    if (transactionRetReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful")
        return 
    }
    console.log(transactionRetReceipt)
    const availablePostRetBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are post borrow: ", availablePostRetBooks)


    // const hasEnded = await electionContract.electionEnded()
    // console.log("The election has ended:", hasEnded)

    // const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio")
    // console.log("Have results for Ohio:", haveResultsForOhio)

    // // sending transactions
    // const transactionOhio = await electionContract.submitStateResult(["titi", 250, 150, 24])
    // const transactionReceipt = await transactionOhio.wait();
    // if (transactionReceipt.status != 1) { // 1 means success
    //     console.log("Transaction was not successful")
    //     return 
    // }

    // const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("titi")
    // console.log("Results submitted for titi", resultsSubmittedOhioNew)

    // const currentLeader = await electionContract.currentLeader()
    // console.log("Current leader", currentLeader)

}

run()