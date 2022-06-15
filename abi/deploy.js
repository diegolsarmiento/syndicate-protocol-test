// Load environment variables.
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledDai = require('./build/dai.json');
const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const network = process.env.RINKEBY_ENDPOINT;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: network
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting deployment from account', accounts[0]);
  //console.log('Data', '0x' + compiledDai.evm.bytecode.object);
  //console.log('Gas Estimates', compiledDai.evm.gasEstimates.creation.totalCost);

  const result = await new web3.eth.Contract(compiledDai.abi)
    .deploy({ data: '0x' + compiledDai.evm.bytecode.object })
    .send({ gas: '1500000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
