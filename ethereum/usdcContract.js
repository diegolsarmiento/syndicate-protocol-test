import web3 from './web3';
import usdcAbi from './abi/erc20';

const address = process.env.CONTRACT_DEPLOYED_TO;
const usdcContract =  new web3.eth.Contract(usdcAbi,address);

export default usdcContract;
