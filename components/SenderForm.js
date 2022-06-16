import React, { Component } from 'react';
import { Form, Input, Message, Button, Dropdown } from 'semantic-ui-react';
import daiContract from '../ethereum/daiContract';
import web3 from '../ethereum/web3';

class SenderForm extends Component {

   state = {
    currencies: [
        { key: 'dai', text: 'DAI', value: 'dai' },
        { key: 'us', text: 'US$', value: 'us' },
        { key: 'usdc', text: 'USDC', value: 'usdc' }
    ],
    selected: 'dai',
    value: '',
    balance: 0,
    errorMessage: '',
    loading: false
   };

   currencyLabel  =  { key: 'dai', text: 'DAI', value: 'dai' };

    onHandledSubmit = async (event) => {

        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            const balance = await  daiContract.methods.balanceOf(accounts[0]).call();
            this.setState({ loading: false, balance });
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
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
                    <div className='title'>ABI Form</div>
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
                    <div className='result'>{this.currencyLabel.text} {this.state.balance}</div>
                </Form.Field>
                <Message error header='Oh no!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading} size='massive'>
                    Update Balance
                </Button>
            </Form>
        )
    }
}

export default SenderForm;