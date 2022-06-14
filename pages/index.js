import React, { Component } from 'react';
//import dai from '../abi/dai.';
import Layout from '../components/Layout';
import SenderForm from '../components/SenderForm';

class SyndicateWalletIndex extends Component {

    /*
    static async getInitialProps() {
        const daiWallet = await dai.methods.getSummary().call();
        return { daiWallet };
    }
    */

    render(){
        return(
            <Layout>
                <SenderForm />
            </Layout>
        )
    }
}

export default SyndicateWalletIndex;