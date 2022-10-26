const MyTokenContract = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setup_chai");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("MyTokenSale", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  it("All token should be empty in first account", async () => {
    const instance = await MyTokenContract.deployed();
    expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(
      new BN(0)
    );
  });

  it("All token should be in the Token Sale contract by default", async () => {
    const instance = await MyTokenContract.deployed();
    const totalSupply = await instance.totalSupply();

    const balanceOfTokenSaleSC = await instance.balanceOf(MyTokenSale.address);

    expect(balanceOfTokenSaleSC).to.be.a.bignumber.equal(new BN(totalSupply));
  });

  it("Can't be possible to buy one token if u are not in white list", async () => {
    const tokenInstance = await MyTokenContract.deployed();
    const tokenSaleInstance = await MyTokenSale.deployed();

    const balanceBeforeAccount = await tokenInstance.balanceOf.call(
      anotherAccount
    );

    const _amount = web3.utils.toWei("1", "wei");

    await expect(
      tokenSaleInstance.sendTransaction({
        from: anotherAccount,
        value: _amount,
      })
    ).to.be.fulfilled;

    const balanceAfterAccount = await tokenInstance.balanceOf.call(
      anotherAccount
    );

    await expect(balanceBeforeAccount.addn(1)).to.be.a.bignumber.equal(
      balanceAfterAccount
    );
  });

  it("Should be possible to buy one token buy simply sending Ether to the smart contract after adding white list", async () => {
    const tokenInstance = await MyTokenContract.deployed();
    const tokenSaleInstance = await MyTokenSale.deployed();
    const KycContractInstance = await KycContract.deployed();

    const balanceBeforeAccount = await tokenInstance.balanceOf.call(
      anotherAccount
    );

    await KycContractInstance.setKyc(anotherAccount);

    const _amount = web3.utils.toWei("1", "wei");

    await expect(
      tokenSaleInstance.sendTransaction({
        from: anotherAccount,
        value: _amount,
      })
    ).to.be.fulfilled;

    const balanceAfterAccount = await tokenInstance.balanceOf.call(
      anotherAccount
    );

    await expect(balanceBeforeAccount.addn(1)).to.be.a.bignumber.equal(
      balanceAfterAccount
    );
  });
});
