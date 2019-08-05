import React, { Component } from 'react';
import { Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql `
    query SINGLE_ITEM_QUERY($id: ID!){
        vhook(where: { id: $id}) {
            id
            part_no
            wire_diam
            length
            arch_diam
            qty_bag
            price_bag
            price_bag_10bags
        }
    }
`;


const UPDATE_VHOOK_MUTATION = gql `
    mutation UPDATE_VHOOK_MUTATION(
        $id: ID!,
        $part_no: String,
        $wire_diam: Float,
        $length: String,
        $arch_diam: String,
        $qty_bag: Int,
        $price_bag: Int,
        $price_bag_10bags: Int
    ) {
        updateVhook(
            id: $id, 
            part_no: $part_no,
            wire_diam: $wire_diam,
            length: $length,
            arch_diam: $arch_diam,
            qty_bag: $qty_bag,
            price_bag: $price_bag,
            price_bag_10bags: $price_bag_10bags
        ) {
            id
            part_no
            wire_diam
            length
            arch_diam
            qty_bag
            price_bag
            price_bag_10bags
        }
    }
`;

class UpdateVhook extends Component {
    state = {
    };
    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [name]: val});    
    };

    updateVhook = async (e, updateVhookMutation)=> {
        e.preventDefault();
        console.log('Updating Item!');
        console.log(this.state);
        const res = await updateVhookMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });
        console.log('Updated!!!');
    };

    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables ={{
                id: this.props.id
            }}>
                {({data, loading})=> {
                    if(loading) return <p>Loading...</p>
                    if(!data.vhook) return <p>No item found for ID{this.props.id}</p>
                    return (   
            <Mutation mutation={UPDATE_VHOOK_MUTATION} variables={this.state}>
                {(updateVhook, {loading, error}) => (   
            <Form onSubmit={e => this.updateVhook(e, updateVhook)}>
                <Error error={error}/>
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="part_no">
                        Part Number 
                        <input type="text" 
                        id="part_no" 
                        name="part_no" 
                        placeholder="e.g. HC400-02" 
                        required 
                        defaultValue={data.vhook.part_no} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="wire_diam">
                        Wire Diameter 
                        <input type="number" 
                        id="wire_diam" 
                        name="wire_diam" 
                        placeholder="e.g. 0.044" 
                        required 
                        defaultValue={data.vhook.wire_diam} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="length">
                        Length 
                        <input type="text" 
                        id="length" 
                        name="length" 
                        placeholder="2-1/2" 
                        required 
                        defaultValue={data.vhook.length} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="arch_diam">
                        Arch Diameter 
                        <input type="text" 
                        id="arch_diam" 
                        name="arch_diam" 
                        placeholder="e.g. 5/8" 
                        required 
                        defaultValue={data.vhook.arch_diam} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="qty_bag">
                        Qty per Bag
                        <input type="number" 
                        id="qty_bag" 
                        name="qty_bag" 
                        placeholder="e.g. 1000" 
                        required 
                        defaultValue={data.vhook.qty_bag} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="price_bag">
                        Price Per Bag
                        <input type="number" 
                        id="price_bag" 
                        name="price_bag" 
                        placeholder="e.g. 2900" 
                        required 
                        defaultValue={data.vhook.price_bag} 
                        onChange={this.handleChange} />  
                    </label>
                    <label htmlFor="price_bag_10bags">
                        Price Per Bag (10 Bags)
                        <input type="number" 
                        id="price_bag_10number" 
                        name="price_bag_10bags" 
                        placeholder="e.g. 2500" 
                        reqnumberd 
                        defaultValue={data.vhook.price_bag_10bags} 
                        onChange={this.handleChange} />  
                    </label>
                    <button type="submit">Save Changes</button>
                </fieldset>
            </Form>
             )}
            </Mutation>
                 )
                }}
            </Query>
        );
    }
}

export default UpdateVhook;
export { UPDATE_VHOOK_MUTATION };