import web3 from './web3';
import daiAbi from './abi/dai';

const dai = (address) => {
  return new web3.eth.Contract(
    daiAbi,
    address);
};
export default dai;
