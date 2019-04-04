var VoteToken = artifacts.require("./VoteToken.sol");

contract('VoteToken',function(accounts){
    var tokenInstance;
    it('initializes the Token contract with correct values',function(){
        return VoteToken.deployed().then(function(instance) {
        tokenInstance = instance;
        return tokenInstance.address;
      }).then(function(_address){
        assert.notEqual(_address,0x0,'has an address');
        return tokenInstance.balanceOf(accounts[0]);
      }).then(function(adminBalance){
        assert.equal(adminBalance.toNumber(),100,'admin has correct balance');
        return tokenInstance.getTotalSupply();
      }).then(function(_totalSupply){
        assert.equal(_totalSupply,100,'has correct total supply');
      });
    });
});
