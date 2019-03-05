import React from 'react';
import { connect } from 'react-redux';
import { modifyProduct, setModifyError, fetchProduct } from '../actions/products';

class ProductModifyForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(setModifyError(''));
    this.props.dispatch(fetchProduct(this.props.id));
  }

  render() {
    const { product, productModify, productModifyError } = this.props.products;
    const onFormSubmit = (e) => {
      e.preventDefault();
      const name = e.target.elements.pname.value.trim();
      const quantity = e.target.elements.pquantity.value;
      const price = e.target.elements.pprice.value;
      const minInvent = e.target.elements.pinventory.value;
      this.props.dispatch(modifyProduct(name, quantity, price, minInvent, this.props.id));
    }
    if (product[0]) {
      return (
        <div className="cont">
          <section>
            <div id="user-form">
              <div className="container">
                <form onSubmit={onFormSubmit}>
                  <h3>Modify Product</h3>
                  <div>
                    <label>Name:</label>
                    <br />
                    <input type="text" placeholder="Enter Product Name" name="pname" pattern=".{3,}" required title="Name must be at least 3 characters" defaultValue={product[0].product_name} ></input>
                  </div>
                  <div>
                    <label>Quantity:</label>
                    <br />
                    <input type="text" placeholder="Enter Product Quantity" name="pquantity" pattern="^\+?[1-9][\d]*$" required title="Quantity must be a positive integer" defaultValue={product[0].product_quantity}></input>
                  </div>
                  <div>
                    <label>Price:</label>
                    <br />
                    <input type="text" placeholder="Enter Product Price" name="pprice" pattern="^\+?[1-9][\d]*$" required title="Price must be a positive integer" defaultValue={product[0].product_price}></input>
                  </div>

                  <div>
                    <label>Minimum Inventory:</label>
                    <br />
                    <input type="text" placeholder="Enter Minimum Inventory" name="pinventory" required defaultValue={product[0].minimum_inventory}></input>
                  </div>
                  <button type="submit">Modify</button>
                  <br />
                  <div className="not-registered">
                    {productModify === 'STATE_MODIFY_FAILED' && <span className="pop-up">{productModifyError}</span>}
                    {productModify === 'STATE_MODIFYING' && <span className="lds-hourglass"></span>}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProductModifyForm);


