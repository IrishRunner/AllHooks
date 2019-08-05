import React, { Component } from 'react';
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const CREATE_VHOOK_MUTATION = gql `
    mutation CREATE_VHOOK_MUTATION(
        $part_no: String!
        $wire_diam: Float!
        $length: String!
        $arch_diam: String!
        $qty_bag: Int!
        $price_bag: Int!
        $price_bag_10bags: Int!
    ) {
        createVhook(
            part_no: $part_no
            wire_diam: $wire_diam
            length: $length
            arch_diam: $arch_diam
            qty_bag: $qty_bag
            price_bag: $price_bag
            price_bag_10bags: $price_bag_10bags
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        part_no: '',
        wire_diam: 0,
        length: '',
        arch_diam: '',
        qty_bag: 0,
        price_bag: 0,
        price_bag_10bags: 0,
    };
    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [name]: val});    
    };

    render() {
        return (
            <Mutation mutation={CREATE_VHOOK_MUTATION} variables={this.state}>
                {(createVhook, {loading, error}) => (   
            <Form onSubmit={async (e) => {
                //Stop the form from submitting
                e.preventDefault();
                //Call the mutation
                const res = await createVhook();
                //Redirect to page
                console.log(res);
                Router.push({
                    pathname: '/v_hooks',
                    query: { id: res.data.createVhook.id}
                })
            }}>
                <Error error={error}/>
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="part_no">
                        Part Number 
                        <input type="text" 
                        id="part_no" 
                        name="part_no" 
                        placeholder="e.g. HC400-02" 
                        required 
                        value={this.state.part_no} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="wire_diam">
                        Wire Diameter 
                        <input type="number" 
                        id="wire_diam" 
                        name="wire_diam" 
                        placeholder="e.g. 0.044" 
                        required 
                        value={this.state.wire_diam} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="length">
                        Length 
                        <input type="text" 
                        id="length" 
                        name="length" 
                        placeholder="2-1/2" 
                        required 
                        value={this.state.length} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="arch_diam">
                        Arch Diameter 
                        <input type="text" 
                        id="arch_diam" 
                        name="arch_diam" 
                        placeholder="e.g. 5/8" 
                        required 
                        value={this.state.arch_diam} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="qty_bag">
                        Qty per Bag
                        <input type="number" 
                        id="qty_bag" 
                        name="qty_bag" 
                        placeholder="e.g. 1000" 
                        required 
                        value={this.state.qty_bag} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="price_bag">
                        Price Per Bag
                        <input type="number" 
                        id="price_bag" 
                        name="price_bag" 
                        placeholder="e.g. 2900" 
                        required 
                        value={this.state.price_bag} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="price_bag_10bags">
                        Price Per Bag (10 Bags)
                        <input type="number" 
                        id="price_bag_10number" 
                        name="price_bag_10bags" 
                        placeholder="e.g. 2500" 
                        reqnumberd 
                        value={this.state.price_bag_10bags} 
                        onChange={this.handleChange} />  
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
            </Form>
             )}
            </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_VHOOK_MUTATION };