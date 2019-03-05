import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import CartRemoveModal from './CartRemoveModal';
import { fetchCartProducts, removeCartProduct } from '../helpers/cart';
import { checkoutProducts } from '../actions/cart';

class Cart extends React.Component {
  state = {
    cartRemoveModal: 'STATE_INVISIBLE',
    selectedProductId: undefined
  }

  handleCheckout = () => {
    const { email } = this.props.auth.userDetails;
    const productsToCheckout = fetchCartProducts(email).map((item) => ({
      productQuantity: item.product_quantity,
      productId: item.product_id
    }));
    this.props.dispatch(checkoutProducts(productsToCheckout, email));
  }

  handleClick = (id) => {
    this.setState(() => {
      return {
        cartRemoveModal: 'STATE_VISIBLE',
        selectedProductId: id
      }
    });
  }

  handleCancelModal = () => {
    this.setState(() => {
      return {
        cartRemoveModal: 'STATE_INVISIBLE'
      }
    });
  }

  handleRemoveItem = () => {
    const remove = removeCartProduct(this.props.auth.userDetails.email,
      this.state.selectedProductId);
    if (remove === 'REMOVE_SUCCESS') {
      this.setState(() => {
        return {
          cartRemoveModal: 'STATE_INVISIBLE'
        }
      });
    }
  };
  render() {
    const { email } = this.props.auth.userDetails;
    const products = fetchCartProducts(email) != undefined ? fetchCartProducts(email) : [];
    return (
      <div className="container">
        <div className="wrapper">
          <div className="container">
            <div className="wrapper">
              {products.length != 0 && <span className="tip">Click on item to remove</span>}
              {products.length != 0 && <input type="button" className="confirm checkout" value="checkout" onClick={this.handleCheckout}></input>}
              <div className="items-box">
                {products.map((product) =>
                  <CartItem item={product} handleClick={this.handleClick} key={product.product_id} />
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.cartRemoveModal === 'STATE_VISIBLE' && <CartRemoveModal handleCancel={this.handleCancelModal}
          handleRemoveItem={this.handleRemoveItem} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Cart);

