import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
// import dai from '../abi/dai.';
// import { Router } from 'next/router';
// import Web3 from 'web3';

class SenderForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        //const abi = abit(this.props.address);
        this.setState({ loading: true, errorMessage: '' });

        /*
        try {
            const accounts = await Web3.eth.getAccounts();
            await  campaign.methods.getSummary().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether'),
            });
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        */
        this.setState({ loading: false, value: ''});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>ETH Address</label>
                    <Input
                        value={this.state.value}
                        onChange={(event) => this.setState({ value: event.target.value })}
                        label='ether'
                        labelPosition='right' />
                </Form.Field>
                <Message error header='Oh no!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Retreive
                </Button>
            </Form>
        )
    }
}

export default SenderForm;