const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("HelloWorld", function () {
  const message = "Hello World";

  it("Should return the right message", async function () {
    const helloWorld = await ethers.getContractFactory("HelloWorld");
    const contract = await helloWorld.deploy(message);
    await contract.deployed();
    expect(await contract.message()).to.equal(message);
  });
});
