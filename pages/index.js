import React, { Component } from 'react';
import Layout from '../components/Layout';
import SenderForm from '../components/SenderForm';

class SyndicateWalletIndex extends Component {

    formLabel = 'Balance Form';
    buttonLabel = 'Update Balance';

    render(){
        return(
            <Layout>
                <SenderForm formLabel={this.formLabel}  buttonLabel={this.buttonLabel} formValues={this.formValues}/>
            </Layout>
        )
    }
}

export default SyndicateWalletIndex;