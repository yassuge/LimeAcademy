// Array for the prepared encoded inputs
const inputs = [];

// Array for the decoded results with the balance of each token 
const outputs = [];

const tokenAddresses = [...]

contractAddress = "..."

// Instantiate the Multicall contract with address, ABI and signer/provider:
this.multicallContract = 
new ethers.Contract(contractAddress, 
                    contracts.Multicall.abi, 
                    this.signerOrProvider)

// Get the interface of the contract that tyou want to perform multicall to:
// In our case this is ERC20 contract:

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
   result = await this.multicallContract.callStatic.tryBlockAndAggregate(false, inputs);
} catch(e) {
    console.log(e)
}

// The result returned but the upper function tryBlockAndAggregate needs to be itterated and decoded the same as it was encoded - with the function fragment
// The result array contains elements with returnData property. The balance is again in returnData property.
// The balance is extracted and pushed to the outputs array:
for ( let index = 0; index < result.returnData.length; index++) {
    const balance = tokenInterface.decodeFunctionResult(fragment_balance, result.returnData[index].returnData)
    outputs.push(balance);
}