const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const daiContract = require('../ethereum/abi/dai.js');

let accounts;
let abi;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  abi = await new web3.eth.Contract(daiContract, accounts[0]);
});

describe('abis', () => {
  it('deploys an abi', () => {
    assert.ok(abi.options.address);
  });

  /*
  it('Testing Approvers', async () => {
    await abi.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });

    // Approvers is the mapping that requires the address and return a boolean
    // Assets verifies is true or false
    const isContributor = await abi.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
  */

});
