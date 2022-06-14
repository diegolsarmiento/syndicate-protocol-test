import React, { Component } from 'react';
//import dai from '../abi/dai.';
import SenderForm from '../components/SenderForm';

class SyndicateWalletIndex extends Component {
    render(){
        return(
           <React.StrictMode>
                <h1>Welcome</h1>
                <SenderForm />
           </React.StrictMode>
        )
    }
}

export default SyndicateWalletIndex;