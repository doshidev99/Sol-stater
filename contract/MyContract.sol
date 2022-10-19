// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./Owned.sol";

contract MyContract {
    string public myString = "hello";
}

contract IntegerExample {
    uint256 public myUint;

    function setNewValue(uint256 _myUint) public {
        myUint = _myUint;
    }
}

contract RollOverExample {
    uint8 public myUint8;

    function decrement() public {
        myUint8--;
    }

    function increment() public {
        myUint8++;
    }
}

contract BooleanExample {
    bool public myBool;

    function setNewBool(bool _myBool) public {
        myBool = _myBool;
    }

    function negateBool() public {
        myBool = !myBool;
    }

    function retreive() public view returns (bool) {
        return myBool;
    }
}

contract StringExample {
    string public myString = "Hello brother";

    function setNewString(string memory _newString) public {
        myString = _newString;
    }
}

contract SendMoneyExample {
    uint256 public balanceReceive;

    function receiveMoney() public payable {
        balanceReceive += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withDraw() public {
        // address payable to = msg.sender;
        // to.transfer(getBalance());
    }
}

contract SimpleMapping {
    mapping(uint256 => bool) public myMapping;

    function setValue(uint256 _index) public {
        myMapping[_index] = true;
    }
}

contract MappingStructExample {
    mapping(address => Balance) public balanceReceive;

    struct Payment {
        uint256 amount;
        uint256 timestamp;
    }

    struct Balance {
        uint256 totalBalance;
        uint256 numPayments;
        mapping(uint256 => Payment) payments;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function sendMoney() public payable {
        balanceReceive[msg.sender].totalBalance += msg.value;

        // create payment ~ Payment structor -> memory temporary storage variable
        Payment memory payment = Payment(msg.value, block.timestamp);
        // save info payment n + 1 with current time
        balanceReceive[msg.sender].payments[
            balanceReceive[msg.sender].numPayments
        ] = payment;

        balanceReceive[msg.sender].numPayments++;
    }

    function withDrawMoney(address payable _to, uint256 _amount) public {
        require(
            balanceReceive[msg.sender].totalBalance >= _amount,
            "Not enought funds!"
        );
        balanceReceive[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }
}

contract ExceptionExample {
    mapping(address => uint256) public balanceReceive;

    mapping(address => uint64) public balanceReceiveAssert;

    function receiveMoneyAssert() public payable {
        // assert(balanceReceiveAssert[msg.sender] + uint64(msg.value) >= balanceReceiveAssert[msg.sender]);
        balanceReceiveAssert[msg.sender] += uint64(msg.value);
    }

    function receiveMoney() public payable {
        balanceReceive[msg.sender] += msg.value;
    }

    function withDrawMoney(address payable _to, uint256 _amount) public {
        // if(balanceReceive[msg.sender] >= _amount) {
        //     balanceReceive[msg.sender] -= _amount;
        //     _to.transfer(_amount);
        // }

        require(
            balanceReceive[msg.sender] >= _amount,
            "You don't have enough ether!"
        );
        balanceReceive[msg.sender] -= _amount;
        _to.transfer(_amount);
    }
}

contract FunctionsExample {
    mapping(address => uint256) public balanceReceive;

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function converWeiToEth(uint256 _amountOfWei)
        public
        pure
        returns (uint256)
    {
        return _amountOfWei / 1 ether;
    }

    function receiveMoney() public payable {
        assert(
            balanceReceive[msg.sender] + msg.value >= balanceReceive[msg.sender]
        );
        balanceReceive[msg.sender] += msg.value;
    }

    function withDrawMoney(address payable _to, uint256 _amount) public {
        require(
            balanceReceive[msg.sender] >= _amount,
            "You don't have enought ether!"
        );
        balanceReceive[msg.sender] -= _amount;
        _to.transfer(_amount);
    }

    fallback() external payable {
        receiveMoney();
    }
}

contract InheritanceModifierExample is Owned {
    mapping(address => uint256) public tokenBalance;
    uint256 tokenPrice = 1 ether;
    uint256 initialToken = 100;

    constructor() public {
        // owner = msg.sender
        tokenBalance[owner] = initialToken;
    }

    function createNewToken() public onlyOwner {
        // tokenBalance[owner]--; // work
        tokenBalance[owner] += 10; // not work
    }

    function burnToken() public onlyOwner {
        tokenBalance[owner]--;
    }

    function purchaseToken() public payable {
        // mod operator
        require(
            (tokenBalance[owner] * tokenPrice) / msg.value > 0,
            "Not enough tokens"
        );
        tokenBalance[owner] -= msg.value / tokenPrice;
        tokenBalance[msg.sender] += msg.value / tokenPrice;
    }

    function sendToken(address _to, uint256 _amount) public {
        require(tokenBalance[msg.sender] >= _amount, "Not enough tokens");

        assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);

        assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]);

        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;
    }
}

contract EventExample {
    mapping(address => uint256) public tokenBalance;

    event TokenSent(address _from, address _to, uint256 _amount);

    constructor() public {
        tokenBalance[msg.sender] = 1000;
    }

    function sendToken(address _to, uint256 _amount) public returns (bool) {
        require(tokenBalance[msg.sender] >= _amount, "Not enought token!");

        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;

        emit TokenSent(msg.sender, _to, _amount);

        return true;
    }
}

contract ABIExample {
    string public myString = "hello APT!";

    function setNewValue(string memory _newValue) public {
        myString = _newValue;
    }
}
