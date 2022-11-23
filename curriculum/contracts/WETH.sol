// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract WETH is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Wrapped ETH", "WETH") {}
}

contract ETHWrapper {
    WETH public WETHToken;

    constructor() {
        WETHToken = new WETH();
    }
}
