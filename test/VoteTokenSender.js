var VoteTokenSender = artifacts.require("./VoteTokenSender.sol");
var VoteToken = artifacts.require("./VoteToken.sol");
contract('VoteTokenSender',function(accounts){
    var tokenInstance;
    var voteInstance;
    it('initializes the Token Sender contract with correct values',function(){
        return VoteTokenSender.deployed().then(function(instance) {
        tokenInstance = instance;
        return tokenInstance.address;
      }).then(function(_address){
        assert.notEqual(_address,0x0,'has an address');
        return tokenInstance.tokenContract();
      }).then(function(_tokenAddress){
        assert.notEqual(_tokenAddress,0x0,'token contract has an address');
        return tokenInstance.admin();
      }).then(function(_admin){
        assert.equal(_admin,accounts[0],'admin account has correct address');
      });

    });

    it('verifies the sendToken functions working',function(){
      return VoteTokenSender.deployed().then(function(instance){
        voteInstance=instance;
        return VoteToken.deployed();
      }).then(function(instance){
        tokenInstance=instance;
        return tokenInstance.transfer(voteInstance.address,30,{from: accounts[0]});
      }).then(function(){
        return voteInstance.sendToken(accounts[2],{from: accounts[0]});
      }).then(function(){
          return voteInstance.sendToken(accounts[5],{from: accounts[0]});
      }).then(function(){
          return tokenInstance.balanceOf(accounts[5]);
      }).then(function(_balance){
          assert(_balance==1,'transaction is successful');
      });
    });
});
