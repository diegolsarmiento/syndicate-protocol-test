import React, { Component } from 'react';
import { Form, Input, Message, Button, Dropdown } from 'semantic-ui-react';
import daiContract from '../ethereum/dai';
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
    errorMessage: '',
    loading: false
   };

   currencyLabel  =  { key: 'dai', text: 'DAI', value: 'dai' };

    onHandledSubmit = async (event) => {
        event.preventDefault();

        const contract = daiContract(this.props.address);
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            const balance = await  contract.methods.balanceOf(accounts[0]).call();
            this.setState({ value: balance });
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
    
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
                    <div className='result'>{this.currencyLabel.text} 1.2</div>
                </Form.Field>
                <Message error header='Oh no!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading} size='massive'>
                    Send
                </Button>
            </Form>
        )
    }
}

export default SenderForm;