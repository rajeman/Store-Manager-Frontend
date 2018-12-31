import React from 'react';
import { connect } from 'react-redux';
import { createProduct, setProductError } from '../actions/products';

class ProductCreateForm extends React.Component {
    componentDidMount(){
		this.props.dispatch(setProductError(''));
	}
    render() {
		const { productCreate, productCreateError} = this.props.products;
        const onFormSubmit = (e) => {
           //console.log(this.props);
            e.preventDefault();
            const name = e.target.elements.pname.value.trim();
			const quantity = e.target.elements.pquantity.value;
			const price = e.target.elements.pprice.value;
			const minInvent = e.target.elements.pinventory.value;
            this.props.dispatch(createProduct(name, quantity, price, minInvent));
		} 
        return (
            <div className="cont">
			<section>
				<div id="user-form">
					<div className="container">
						<form onSubmit={onFormSubmit} >
							<h3>New Product</h3>
							<div>
								<label>Name:</label>
								<br/>
								<input type="text"  placeholder="Enter Product Name" name="pname" required></input>
							</div>
							<div>
								<label>Quantity:</label>
								<br/>
								<input type="number"  placeholder="Enter Product Quantity" name="pquantity" required></input>
							</div>
							<div>
								<label>Price:</label>
								<br/>
								<input type="text"  placeholder="Enter Product Price" name="pprice" required></input>
							</div>
							<div>
								<label>Minimum Inventory:</label>
								<br/>
								<input type="text"  placeholder="Enter Minimum Inventory" name="pinventory" required></input>
							</div>
							<button type="submit">Create</button>
							<br/>	
                                <div className="not-registered">
                                    {productCreate === 'STATE_CREATE_FAILED' && <span className="pop-up">{productCreateError}</span>}
                                    {productCreate === 'STATE_CREATING' && <span className="lds-hourglass"></span>}
                                </div>			
						</form>
					</div>
				</div>
			</section>	
		</div>
        );

    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProductCreateForm); 

