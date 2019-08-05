import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_VHOOKS_QUERY } from './V_hooks';

const DELETE_VHOOK_MUTATION = gql `
    mutation DELETE_VHOOK_MUTATION($id: ID!) {
        deleteVhook(id: $id) {
            id
        }
    }
`;


class DeleteVhook extends Component {
    update = (cache, payload) => {
        //manually update cache
        const data = cache.readQuery({query: ALL_VHOOKS_QUERY});
        console.log(data);
        // filter deleted item out of page
        data.vhooks = data.vhooks.filter(vhook => vhook.id !== payload.data.deleteVhook.id);
        // put the items back
        cache.writeQuery({query: ALL_VHOOKS_QUERY, data});
    }
    render() {
        return (
            <Mutation 
                mutation={DELETE_VHOOK_MUTATION} 
                variables={{id: this.props.id}}
                update = {this.update}>
                {(deleteVhook, {error}) => (
                    <button onClick={() => {
                        if(confirm('Sure you want to delete?')){
                            deleteVhook();
                        }
                    }}>Delete</button>
                )}  
            </Mutation>
            
        );
    }
}

export default DeleteVhook;