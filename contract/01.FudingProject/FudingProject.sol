// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "./Allowance.sol";

contract FudingProject is Allowance {
    uint256 public countFallback;
    uint256 public countReceive;

    event MoneySend(address indexed _to, uint256 _amount);
    event MoneyReceived(address indexed _to, uint256 _amount);

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawMoney(address payable _to, uint256 _amount)
        public
        ownerOrWhoIsAllowed(_amount)
    {
        if (!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        emit MoneySend(_to, _amount);

        _to.transfer(_amount);
    }

    function renounceOwnership() public view override onlyOwner {
        revert("Can't renounceOwnership!");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
        countReceive++;
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        countFallback++;
    }
}
