const VoteToken = artifacts.require("./VoteToken.sol");
const VoteTokenSender=artifacts.require("./VoteTokenSender.sol");

module.exports = function(deployer) {
  deployer.deploy(VoteToken,100).then(function(){
        return deployer.deploy(VoteTokenSender,VoteToken.address);
  });
};
