import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import formatMoney from '../lib/formatMoney';


const ALL_CHOOKS_QUERY = gql `
    query ALL_CHOOKS_QUERY {
        chooks {
            part_no
            wire_diam
            length
            arch_diam
            qty_bag
            price_bag
            price_bag_10bags
        }    
    }
`


class C_hooks extends Component {
    render() {
        return (
            <table className="table">
                <thead>
                    <th>Part No.</th>
                    <th>Wire Diam</th>
                    <th>Length</th>
                    <th>Arch diam</th>
                    <th>Qty</th>
                    <th>Price/Bag</th>
                    <th>Price/Bag (10 Bags)</th>
                </thead>
             
                <Query query={ ALL_CHOOKS_QUERY }>
                    {({data, error, loading}) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return <tbody>
                            {data.chooks.map(chook => 
                                <tr>
                                    <td>{chook.part_no}</td>
                                    <td>{chook.wire_diam}</td>
                                    <td>{chook.length}</td>
                                    <td>{chook.arch_diam}</td>
                                    <td>{chook.qty_bag}</td>
                                    <td>{formatMoney(chook.price_bag)}</td>
                                    <td>{formatMoney(chook.price_bag_10bags)}</td>
                                </tr>
                            )}
                        </tbody>
                    }}    
                </Query>
            </table>
        );
    }
}

export default C_hooks;
export { ALL_CHOOKS_QUERY };