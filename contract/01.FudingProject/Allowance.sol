// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract Allowance is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) public allowance;
    event AllowanceChanged(
        address indexed _forWho,
        address indexed _byWho,
        uint256 _oldAmount,
        uint256 _newAmount
    );

    function isOwner() internal view returns (bool) {
        return owner() == msg.sender;
    }

    modifier ownerOrWhoIsAllowed(uint256 _amount) {
        require(
            isOwner() || allowance[msg.sender] >= _amount,
            "You not allowed"
        );
        _;
    }

    function addAllowance(address _who, uint256 _amount)
        public
        ownerOrWhoIsAllowed(_amount)
    {
        emit AllowanceChanged(msg.sender, _who, allowance[_who], _amount);
        allowance[_who] = _amount;
    }

    function reduceAllowance(address _who, uint256 _amount)
        public
        ownerOrWhoIsAllowed(_amount)
    {
        emit AllowanceChanged(
            msg.sender,
            _who,
            allowance[_who],
            allowance[_who].sub(_amount)
        );
        allowance[_who] = allowance[_who].sub(_amount);
    }
}
