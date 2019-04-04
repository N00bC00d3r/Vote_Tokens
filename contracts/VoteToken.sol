pragma solidity ^0.4.25;

contract VoteToken{
    uint256 private totalSupply;
    mapping(address=>uint256) private balance;
    event Transfer(
      address _from,
      address _to,
      uint256 value
      );


    constructor(uint256 _totalSupply) public{
        totalSupply=_totalSupply;
        balance[msg.sender]=_totalSupply;
    }

    function balanceOf(address owner) public view returns(uint256){
        return balance[owner];
    }

    function transfer(address _to,uint256 _value) public returns(bool){
        require(_value<=balance[msg.sender]);
        balance[msg.sender]=balance[msg.sender]-(_value);
        balance[_to]=balance[_to]+(_value);
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    function getTotalSupply() public view returns(uint256){
        return totalSupply;
    }

}
