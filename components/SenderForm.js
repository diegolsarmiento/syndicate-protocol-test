import React, { Component } from 'react';
import { Form, Input, Message, Button, Dropdown } from 'semantic-ui-react';
// import dai from '../abi/dai.';
// import { Router } from 'next/router';
// import Web3 from 'web3';

class SenderForm extends Component {

   state = {
    currencies: [
        { key: 'dai', text: 'DAI', value: 'dai' },
        { key: 'us', text: 'US$', value: 'us' },
        { key: 'usdc', text: 'USDC', value: 'usdc' }
    ],
    selected: 'dai',
    value: '',
    errorMessage: '',
    loading: false
   };

   currencyLabel  =  { key: 'dai', text: 'DAI', value: 'dai' };

    onHandledSubmit = async (event) => {
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

    onHandledDropChange = (event, data) => {
        event.preventDefault();
        this.setState({ selected: data.value });
        this.currencyLabel = this.state.currencies.find(ele => ele.value == data.value);
    }

    render() {
        return (
            <Form onSubmit={this.onHandledSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>ABI Form</label>
                    <Input
                        value={this.state.value}
                        onChange={(event) => this.setState({ value: event.target.value })}
                        label='Address'
                        labelPosition='right' />
                </Form.Field>
                <Form.Field>
                    <Dropdown 
                    options={this.state.currencies}
                    selection 
                    defaultValue={this.state.selected} 
                    onChange={this.onHandledDropChange} />
                </Form.Field>
                <Form.Field>
                    <label>{this.currencyLabel.text} 1.2</label>
                </Form.Field>
                <Message error header='Oh no!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Send
                </Button>
            </Form>
        )
    }
}

export default SenderForm;