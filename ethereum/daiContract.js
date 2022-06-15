import web3 from './web3';
import daiAbi from './abi/dai';

const address = process.env.CONTRACT_DEPLOYED_TO;
const daiContract =  new web3.eth.Contract(daiAbi,address);

export default daiContract;
