import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from '../components/Cart';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import CartCount from '../components/CartCount';


const Nav = () => (
        <User>
            {({data: { me }}) => (
                <NavStyles data-test="nav">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/contact">
                        <a>Contact</a>
                    </Link>
                    {me && (
                        <>
                        <Link href="/orders">
                        <a>Orders</a>
                        </Link>
                        <Link href="/me">
                            <a>Account</a>
                        </Link>
                        <Link href="/upload">
                            <a>Upload</a>
                        </Link>
                        <Signout />
                        <Mutation mutation={TOGGLE_CART_MUTATION}>
                            {(toggleCart) => (
                                <button onClick={toggleCart}>My Cart
                                    <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
                                </button>
                            )}
                        </Mutation>
                        
                        </>
                    )}
                    
                    {!me && (
                        <>
                        <Link href="/signup">
                        <a>Log in</a>
                        </Link>
                        </>
                    )}
                    
                </NavStyles>
            )}
        </User>
        
);

export default Nav;