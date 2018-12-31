import React from 'react';

export default class CartAddModal extends React.Component{
    state = {
        quantity: undefined
    };
    handleQuantityChange = (e)=>{
        const quantity = e.target.value
        this.setState(() => {
            return {
                quantity
            };
        });
    }
    render() {
        return (
            <div id="dialog-background-window">
            <div id="dialog-box">
                <div id="content-header">Add Item to cart?</div>
                <div id="cart-item-quantity">
                    <label>Quantity:</label>
                    <input type="number" id="product-quantity" pattern="^\+?[1-9][\d]*$" required title="Quantity must be a positive integer" onChange = {this.handleQuantityChange}></input>
                </div>
                <div className="options-button">
                    <input id="cancel-button" className="cancel" type="button" value="Cancel" onClick={this.props.handleRemoveModal}></input>
                    <input id="cart-button" className="confirm" type="button" value="Confirm" onClick = {()=>{
                        this.props.handleAddItem(this.state.quantity)
                    }}></input>
                </div>
            </div>
    
        </div>
    )
    }
}
   
