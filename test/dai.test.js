const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const daiAbi = require('../ethereum/abi/dai');

let accounts;
let daiContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  daiContract =  new web3.eth.Contract(daiAbi,accounts[0]);
});

describe('dai Test', () => {

  it('daiContract exists', () => {
    assert.ok(daiContract);
  });

  it('Address exists', () => {
    assert.ok(accounts[0]);
  });

});
