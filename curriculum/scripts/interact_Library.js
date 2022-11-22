const PRIVATE_KEY = "e804168f0f331ae5d48419ca4ad4193e75188ad4c42bb9f009b1f36ade0710ad"
const CONTRACT = "0x752101EDB61AA11E630258a6895c971E6Fe7A3Fc"
const API_KEY = "6e68db481a01433080e0e811ef4b83a9"

const hre = require("hardhat");
const BookLibrary = require('../artifacts/contracts/BookLibrary.sol/BookLibrary.json')

const run = async function() {
    console.log("running interact_Library.js")
    console.log(hre.ethers.version)

    // const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const provider = new hre.ethers.providers.InfuraProvider("goerli", API_KEY)

    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

    // const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider);

    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18))
    console.log(balance.toString())

    // retreive contract
    const contractAddress = CONTRACT
    const libraryContract = new hre.ethers.Contract(contractAddress, BookLibrary.abi, wallet)
    
    // display owner of the contract
    console.log(await libraryContract.owner())

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
    console.log(transactionRentBook)


    const availablePostBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are post borrow: ", availablePostBooks)

    // Return book
    const transactionReturnBook = await libraryContract.returnBook("User_1","Book_0")
    const transactionRetReceipt = await transactionReturnBook.wait();
    if (transactionRetReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful")
        return 
    }
    console.log(transactionRetReceipt)
    const availablePostRetBooks = await libraryContract.getInventory("Book_0")
    console.log("available books of Book_0 are post borrow: ", availablePostRetBooks)
}

run()