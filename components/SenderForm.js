import React, { Component } from 'react';
import { Form, Input, Message, Button, Dropdown } from 'semantic-ui-react';
import daiContract from '../ethereum/daiContract';
import usdcContract from '../ethereum/usdcContract';
import web3 from '../ethereum/web3';

class SenderForm extends Component {

   state = {
    balance: 0,
    errorMessage: '',
    loading: false,
    formValues: {
        inputLabel:'Address',
        dropDownValues: [
            { key: 'dai', text: 'DAI', value: 'dai' },
            { key: 'usdc', text: 'USDC', value: 'usdc' }
        ],
        dropDownSelected: 'dai',
        currencyLabel: 'ETH'
    }
   };

   onHandledSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    const address = this.state.formValues.inputValue;
    const currency = this.state.formValues.dropDownSelected;
    const contract = this.contractSelected(currency);
    const addressError = 'You should enter a valid ' + this.state.formValues.inputLabel;
    // Assumming addresses are at least 42 chars long
    if(address.length >= 42) {
        this.onFormSubmitted(address, contract);
        this.setState({ loading: false, inputValue: address });
    } else {
        this.setState({ errorMessage: addressError });
        this.setState({ loading: false });
    }
   }

   contractSelected (currency) {
    let contract;
    if (currency === 'usdc') {
        contract = usdcContract;
    } else {
        contract = daiContract;
    }
    return contract;
   }

   onFormSubmitted = async (address, contract) => {
    try {
        const balanceDraft = await  contract.methods.balanceOf(address).call();
        const balanceEther =  web3.utils.fromWei(balanceDraft, 'ether');
        const balance = new Intl.NumberFormat().format(balanceEther);
        this.setState({ loading: false, balance });
    } catch (err) {
        this.setState({ errorMessage: err.message });
        this.setState({ loading: false });
    }
   }

   onHandledDropChange = (event, data) => {
    event.preventDefault();
    this.setState({ selected: data.value, balance: 0, inputValue: '' });
   }

   render() {
        return (
            <Form onSubmit={this.onHandledSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <div className='title'>{this.props.formLabel}</div>
                    <Input
                        value={this.state.formValues.inputValue}
                        onChange={(event) => this.setState({ inputValue: event.target.value })}
                        label={this.state.formValues.inputLabel}
                        labelPosition='right'
                        required />
                </Form.Field>
                <Form.Field>
                    <Dropdown 
                    options={this.state.formValues.dropDownValues || []}
                    selection 
                    defaultValue={this.state.formValues.dropDownSelected} 
                    onChange={this.onHandledDropChange} />
                </Form.Field>
                <Form.Field>
                    <div className='result'>{this.state.formValues.currencyLabel} {this.state.balance}</div>
                </Form.Field>
                <Message error header='Oh no!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading} size='massive'>
                    {this.props.buttonLabel}
                </Button>
            </Form>
        )
    }
}

export default SenderForm;