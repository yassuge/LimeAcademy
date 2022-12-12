const hre = require("hardhat");
const BookLibrary = require('../../artifacts/contracts/BookLibrary.sol/BookLibrary.json')
const keys = require ("../../../keys.json")


const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
const PRIVATE_KEY = keys.PRIVATE_KEY_LOCAL
const contractAddress = keys.CONTRACTS["LOCALHOST"]["Library"][0]

// const provider = new hre.ethers.providers.InfuraProvider("goerli", keys.INFURA_API_KEY)
// const PRIVATE_KEY = keys.PRIVATE_KEY
// const contractAddress = keys.CONTRACTS["GOERLI"]["Library"][0]

const run = async function() {
    console.log("running Library/interact.js")
    console.log(hre.ethers.version)

    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

    const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider);
    console.log("the wallet address is: ", wallet.address)

    const balance = await wallet.getBalance();
    console.log("The balance in ETH is: ", hre.ethers.utils.formatEther(balance, 18))

    // retreive contract
    console.log("the BookLibrary address is: ", contractAddress)
    const libraryContract = new hre.ethers.Contract(contractAddress, BookLibrary.abi, wallet)
    
    // display owner of the contract
    console.log("The Owner of LibraryContract is: " ,await libraryContract.owner())

    // add book to inventory
    const transactionBookCreated = await libraryContract.addBook("Book_0", 10)
    const transactionBookCreatedReceipt = await transactionBookCreated.wait()

    // get inventory
    const availableBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are : ", availableBooks)

    // User_0 borrows Book_0
    const transactionRentBook = await libraryContract.borrowBook("User_1","Book_0")
    const transactionReceipt = await transactionRentBook.wait();
    if (transactionReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful")
        return 
    }
    // console.log(transactionRentBook)


    const availablePostBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are post borrow: ", availablePostBooks)

    // Return book
    const transactionReturnBook = await libraryContract.returnBook("User_1","Book_0")
    const transactionRetReceipt = await transactionReturnBook.wait();
    if (transactionRetReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful")
        return 
    }
    // console.log(transactionRetReceipt)

    const availablePostRetBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are post borrow: ", availablePostRetBooks)
}

run()