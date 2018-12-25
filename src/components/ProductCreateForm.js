import React from 'react';

export default class ProductCreateForm extends React.Component {

    render() {

        return (
            <div className="cont">
			<section>
				<div id="user-form">
					<div className="container">
						<form method="post">
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
							<button type="submit">Create</button>
							<br/>				
						</form>
					</div>
				</div>
			</section>	
		</div>
        );

    }
}


