const hre = require("hardhat");

const run = async function() {
    console.log("running interact.js")
    console.log(hre.ethers.version)

    const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

}

run()