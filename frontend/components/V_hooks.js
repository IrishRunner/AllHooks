import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import formatMoney from '../lib/formatMoney';
import DeleteVhook from './DeleteVhook';
import User from './User';
import AddToCart from '../components/AddToCart';
import PleaseSignIn from './PleaseSignIn';

const TableDetails = styled.div `
    width:100%;
    background: ${props => props.theme.lightgrey};
    color:black;
    line-height: 1.8em;
    font-family: Arial;
    font-weight: 400;
    margin: 2% 0%; 
    text-align: center;
    font-size: 2rem;
`

const ALL_VHOOKS_QUERY = gql `
    query ALL_VHOOKS_QUERY {
        vhooks {
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
`




class V_hooks extends Component {
    render() {
        return (
            <div>
            <TableDetails>
                
                    <p>Hooks are bundled, twist tied, and sold in resealable bags for easy use.</p>
                    <p>Thicker wire diameters and additional lengths available.</p>
                    <p>See table below for hooks' approximate holding capacity </p>
            
            </TableDetails>
            <User>
                {({ data: { me }}) => (
            <table className="table">
                <thead>
                    <th>Part No.</th>
                    <th>Wire Diam</th>
                    <th>Length</th>
                    <th>Arch diam</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </thead>
             
                <Query query={ ALL_VHOOKS_QUERY }>
                    {({data, error, loading}) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return <tbody>
                            {data.vhooks.map(vhook => 
                                <tr>
                                    <td>{vhook.part_no}</td>
                                    <td>{vhook.wire_diam}</td>
                                    <td>{vhook.length}</td>
                                    <td>{vhook.arch_diam}</td>
                                    <td>{vhook.qty_bag}</td>
                                    <td>{formatMoney(vhook.price_bag)}</td>
                                    {me && (
                                        <>
                                        <td><AddToCart id={vhook.id} /></td>
                                        <td><Link href={{ pathname: 'edit', query: {id: vhook.id}}}><a>Edit</a></Link></td>
                                        <td><Link href={{ pathname: 'delete', query: {id: vhook.id}}}><a>Delete</a></Link></td>
                                        </>
                                    )}
                                    
                                </tr>
                            )}
                        </tbody>
                    }}    
                </Query>
            </table>
            )}
            </User>>
            </div>
        );
    }
}

export default V_hooks;
export { ALL_VHOOKS_QUERY };