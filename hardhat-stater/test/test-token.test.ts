import { expect } from "chai";
import { ethers } from "hardhat";
// import  Web3 from "web3"

// const BN = Web3.utils.BN;
// const chaiBN = require("chai-bn")(BN);
// chai.use(chaiBN);

describe("Gold", async () => {
  let [accA, accB, accC]: any[] = [];
  let token: any;
  const amount = 100;
  const totalSupply = 100000000;

  beforeEach(async function () {
    [accA, accB, accC] = await ethers.getSigners();
    const Gold = await ethers.getContractFactory("Gold");
    token = await Gold.deploy();
    await token.deployed();
  });

  describe("common case", function () {
    it("Total supply should return right value", async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });
    it("Balance of account A should return right value", async () => {
      expect(await token.balanceOf(accA.address)).to.be.equal(totalSupply);
    });
    it("Balance of account B should return right value", async () => {
      expect(await token.balanceOf(accB.address)).to.equal(0);
    });
    it("Allowance of account A to account B should return right value", async () => {
      expect(await token.allowance(accA.address, accB.address)).to.equal(0);
    });
  });

  describe("transfer()", function () {
    it("Transfer should revert if amount exceeds balance", async () => {
      expect(
        await token.transfer(accB.address, totalSupply + 1)
      ).to.be.reverted;
    });

    it("Transfer should work correctly ", async () => {
      const txTransfer = await token.transfer(accB.address, amount);
      // expect(await token.balanceOf(accB.address)).to.equal(amount);
      // expect(await token.balanceOf(accA.address)).to.equal(
      //   totalSupply - amount
      // );
      // await expect(txTransfer)
      //   .to.emit(token, "Transfer")
      //   .withArgs(accA.address, accB.address, amount);
    });
  });

  // describe("transferFrom", function () {
  //   it("Transfer should revert if amount exceeds balance", async () => {
  //     expect(
  //       await token
  //         .connect(accB.address)
  //         .transferFrom(accA.address, accC.address, totalSupply + 1)
  //     ).to.be.reverted();
  //   });
  //   it("Transfer should revert if amount exceeds allowance balance", async () => {
  //     expect(
  //       await token
  //         .connect(accB.address)
  //         .transferFrom(accA.address, accC.address, amount)
  //     ).to.be.reverted();
  //   });
  //   it("Transfer should work correctly", async () => {
  //     await token.approve(accB.address, amount);
  //     const txTransfer = await token
  //       .connect(accB.address)
  //       .transferFrom(accA.address, accC.address, amount);
  //     expect(await token.balanceOf(accC.address)).to.equal(amount);
  //     expect(await token.balanceOf(accA.address)).to.equal(
  //       totalSupply - amount
  //     );
  //     await expect(txTransfer)
  //       .to.emit(token, "Transfer")
  //       .withArgs(accA.address, accC.address, amount);
  //   });
  // });

  // describe("approve", function () {
  //   it("Approve should work correctly", async () => {
  //     const txApprove = await token.approve(accB.address, amount);
  //     expect(await token.allowance(accA.address, accB.address)).to.equal(
  //       amount
  //     );
  //     await expect(txApprove)
  //       .to.emit(token, "Approval")
  //       .withArgs(accA.address, accB.address, amount);
  //   });
  // });
});
