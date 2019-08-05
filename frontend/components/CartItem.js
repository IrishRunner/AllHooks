import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveFromCart from '../components/RemoveFromCart';
const CartItemStyles = styled.li ``;

const CartItem = ({ cartItem }) =>
<CartItemStyles>
    <table className="table">
        <tr>
            <td>{cartItem.vhook.part_no} </td>
            <td>{formatMoney(cartItem.vhook.price_bag * cartItem.quantity)}</td>
            <td>{cartItem.quantity} &times; {formatMoney(cartItem.vhook.price_bag)} per bag </td>
        </tr>
    </table>
    <RemoveFromCart id={cartItem.id} />
</CartItemStyles>;

CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired,
};

export default CartItem;