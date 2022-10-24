"use strict"
const chai = require("chai");
const Web3 = require("web3");

const BN = Web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

const chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

module.exports = chai;
