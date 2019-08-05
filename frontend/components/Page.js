import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';


const theme = {
    grey: '#3a3a3a',
    offWhite: '#efefef',
    lightgrey: '#e1e1e1',
    red: '#ff0000',
    white: '#fff',
    black: '#000',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

injectGlobal`
    html {
        box-sizing: border-box;
        font-size: 10px;
        
    }
    *, *:before, *:after {
        box-sizing: inherit;
        font-family: "Lato", "Arial", sans-serif;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.6rem;
        line-height: 2;
        #nprogress .bar {
            background: ${theme.lightgrey};
        }
    }

    a, a:hover, a:active, a:visited {
        text-decoration: none;
        color: ${theme.grey};
    }
`;


const StyledPage = styled.div `
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.grey};
`

class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage className="container">
                <Meta />
                <Header />
                {this.props.children} 
                </StyledPage>
            </ThemeProvider>
            
        );
    }
}

export default Page;