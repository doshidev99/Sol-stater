// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
    mapping(address => bool) allowed;

    function setKyc(address _address) public onlyOwner {
        allowed[_address] = true;
    }

    function removeKyc(address _address) public onlyOwner {
        allowed[_address] = false;
    }

    function kycCompleted(address _address) public view returns (bool) {
        return allowed[_address];
    }
}
