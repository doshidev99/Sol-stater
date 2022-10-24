const chai = require("./setup_chai");
const expect = chai.expect;
const BN = web3.utils.BN;

const MyTokenContract = artifacts.require("MyToken");

contract("MyToken", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  // Hooks function
  beforeEach(async () => {
    this.myToken = await MyTokenContract.new(1000000);
  });

  it("Token initial totalSupply ", async () => {
    const instance = await this.myToken;
    const totalSupply = await instance.totalSupply();

    expect(
      instance.balanceOf.call(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });
});
