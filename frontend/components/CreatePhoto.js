import React, { Component } from 'react';
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const CREATE_PHOTO_MUTATION = gql `
    mutation CREATE_PHOTO_MUTATION(
        $photo: String!
    ) {
        createVhook(
            photo: $photo
        ) {
            id
        }
    }
`;

class CreatePhoto extends Component {
    state = {
        photo: '',
    };
    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [name]: val});    
    };

    uploadFile = async (e) => {
        console.log('Uploading File...');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'allhooks');

        const res = await fetch('https://api.cloudinary.com/v1_1/duqtxsa5w/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        console.log(file);
        this.setState({
            photo: file.secure_url,

        })
    }

    render() {
        return (
            <Mutation mutation={CREATE_PHOTO_MUTATION} variables={this.state}>
                {(createPhoto, {loading, error}) => (   
            <Form onSubmit={async (e) => {
                //Stop the form from submitting
                e.preventDefault();
                //Call the mutation
                const res = await createPhoto();
                //Redirect to page
                console.log(res);
                Router.push({
                    pathname: '/v_hooks',
                    query: { id: res.data.createPhoto.id}
                })
            }}>
                <Error error={error}/>
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="file">
                        Photo
                        <input type="file" 
                        id="file" 
                        name="file" 
                        required 
                        onChange={this.uploadFile} />  
                        {this.state.photo && <img src={this.state.photo} /> }
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
            </Form>
             )}
            </Mutation>
        );
    }
}

export default CreatePhoto;
export { CREATE_PHOTO_MUTATION };