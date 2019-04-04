pragma solidity ^0.4.25;
import "./VoteToken.sol";
contract VoteTokenSender{
      address public admin;
      VoteToken public tokenContract;
      mapping(bytes32=>bool) public isRegistered;
      constructor(VoteToken _tokenContract) public{
          tokenContract=_tokenContract;
          admin=msg.sender;
      }
      function sendToken(address _to) public returns(bool){
          require(admin==msg.sender);
          require(isRegistered[registerReceiver(_to)]==false);
          require(tokenContract.transfer(_to,1));
          isRegistered[registerReceiver(_to)]=true;
          return true;
      }
      function registerReceiver(address _to) public returns(bytes32){
          return keccak256(_to);
      }

}
