// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract LimeToken is ERC20PresetMinterPauser {

constructor() ERC20PresetMinterPauser("LimeToken", "LMT") {

}

}