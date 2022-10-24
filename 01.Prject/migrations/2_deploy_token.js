const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");

module.exports = async function (deployer) {
  console.log("deployer...");
  const INITIAL_SUPPLY = 1000000;

  const accounts = await web3.eth.getAccounts();

  await deployer.deploy(MyToken, INITIAL_SUPPLY);
  await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address);

  const tokenInstance = await MyToken.deployed();
  const balanceOfMyToken = await tokenInstance.balanceOf(MyToken.address);
  const balanceOfDeployer = await tokenInstance.balanceOf(accounts[0]);

  console.log("--------BEFORE - transfer----------");
  console.log("balanceOfMyToken BEFORE: ", balanceOfMyToken.toString());
  console.log("balanceOfDeployer BEFORE: ", balanceOfDeployer.toString());
  console.log("-------------------------");

  await tokenInstance.transfer(MyTokenSale.address, INITIAL_SUPPLY);

  const balanceOfMyTokenSaleAfter = await tokenInstance.balanceOf(MyTokenSale.address);
  const balanceOfDeployerAfter = await tokenInstance.balanceOf(accounts[0]);

  console.log("balanceOfMyTokenSaleAfter AFTER: ", balanceOfMyTokenSaleAfter.toString());
  console.log("balanceOfDeployer AFTER: ", balanceOfDeployerAfter.toString());
  console.log("--------AFTER - transfer----------");
};
