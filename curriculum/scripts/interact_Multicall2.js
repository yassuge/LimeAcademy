const PRIVATE_KEY = "e804168f0f331ae5d48419ca4ad4193e75188ad4c42bb9f009b1f36ade0710ad"
const CONTRACT = "0x752101EDB61AA11E630258a6895c971E6Fe7A3Fc"
const API_KEY = "6e68db481a01433080e0e811ef4b83a9"

const hre = require("hardhat");
const ethers = hre.ethers;

const tokenAddresses = ["0xFfb99f4A02712C909d8F7cC44e67C87Ea1E71E83"]
contractAddress = "0x5ba1e12693dc8f9c48aad8770482f4739beed696"
userAddress = "0x397640289149b7e1493f850fd6959Ce1eb103159"

const Multicall = require('../artifacts/contracts/Multicall2.sol/Multicall.json')
const erc20 = require('../abi/ethereum.json')
const run = async function() {


    // Array for the prepared encoded inputs
    const inputs = [];

    // Array for the decoded results with the balance of each token 
    const outputs = [];

    // Instantiate the Multicall contract with address, ABI and signer/provider:
    const [signer] = await ethers.getSigners()

    multicallContract = 
    new ethers.Contract(contractAddress, 
                        Multicall.abi, 
                        signer)

    // Get the interface of the contract that tyou want to perform multicall to:
    // In our case this is ERC20 contract:
    erc20ABI = erc20.abi
    const tokenInterface = new ethers.utils.Interface(erc20ABI);

    //Get the function signature/fragment:
    const fragment_balance = tokenInterface.getFunction('balanceOf');

    let result;

    // Iterate over the address of the tokens and encode the function call with the signature of the function and input param that it receives:
    // In our case the 'balanceOf' receives address as input param and we need to pass it:
    for (let tokenAddress in tokenAddresses) { 
        inputs.push({ target: tokenAddresses, callData: tokenInterface.encodeFunctionData(fragment_balance, [userAddress]) })
    }
    
    // We are passing the inputs array with the prepared calls that will be executed through the Multicall contract and iterated on the blockchain withing the smart contract.
    try {
       result = await multicallContract.tryBlockAndAggregate(false, inputs);
    } catch(e) {
        console.log(e)
    }

    console.log(result)

    // The result returned but the upper function tryBlockAndAggregate needs to be itterated and decoded the same as it was encoded - with the function fragment
    // The result array contains elements with returnData property. The balance is again in returnData property.
    // The balance is extracted and pushed to the outputs array:
    for ( let index = 0; index < result.returnData.length; index++) {
        const balance = tokenInterface.decodeFunctionResult(fragment_balance, result.returnData[index].returnData)
        outputs.push(balance);
    }
}

run()
