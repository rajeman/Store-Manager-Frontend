import React from 'react';
import { connect } from 'react-redux';
import Product from './Product'
import { fetchProducts } from '../actions/products';

class ProductItems extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProducts())
    }
    render() {
        //console.log(this.props);
        const { products } = this.props.products;
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="items-box">
                        {products.map((product) => {
                            return (
                                <Product key={product.product_id} product = {product}/>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ProductItems); 
