// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token) public ERC20("FarmToken", "FRM") {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function deposit(uint256 _amount) public {
        require(_amount > 0, "The deposited ammount should be greater than 0");

        token.safeTransferFrom(msg.sender, address(this), _amount);

        //minting the FarmToken to the sender of the transaction
        _mint(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) public {
        //burning farmTokens from the sender
        _burn(msg.sender, _amount);

        //transfer GummyTokens deposited on the smart contract to the sender
        token.safeTransfer(msg.sender, _amount);
    }
}