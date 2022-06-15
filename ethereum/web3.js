import Web3 from 'web3';

let web3;
const network = process.env.RINKEBY_ENDPOINT;

/*
    This check is for nextJS error 
    'Window is not defined' on the server
*/

if(typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
    // Assuming Metamask is running
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
} else {
    // We are on the server or Metamask is not running
    const provider = new Web3.providers.HttpProvider(network);
    web3 = new Web3(provider);
}

export default web3;