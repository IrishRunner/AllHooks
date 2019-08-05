import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      vhooks {
        id
        part_no
        wire_diam
        length
        arch_diam
        qty_bag
        price_bag
        price_bag_10bags
        quantity
      }
    }
  }
`;

class Order extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const order = data.order;
          return (
            <OrderStyles data-test="order">
              <Head>
                <title>All Hooks - Order {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{this.props.id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true })}</span>
              </p>
              <p>
                <span>Order Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count</span>
                <span>{order.vhooks.length}</span>
              </p>
              <div className="items">
                {order.vhooks.map(vhook => (
                  <div className="order-item" key={vhook.id}>
                    <div className="item-details">
                      <h2>{vhook.part_no}</h2>
                      <p>Qty: {vhook.quantity}</p>
                      <p>Each: {formatMoney(vhook.price_bag)}</p>
                      <p>SubTotal: {formatMoney(vhook.price_bag * vhook.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
export { SINGLE_ORDER_QUERY };
