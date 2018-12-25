import React from 'react';

export default class ProductCreateForm extends React.Component {

	render() {

		return (
			<div className="cont">
				<section>
					<div id="user-form">
						<div className="container">
							<form method="post" onsubmit="return doModify();">
								<h3>Modify Form</h3>
								<div>
									<label>Name:</label>
									<br />
									<input type="text" placeholder="Enter Product Name" id="pname" pattern=".{3,}" required title="Name must be at least 3 characters"></input>
								</div>
								<div>
									<label>Quantity:</label>
									<br />
									<input type="text" placeholder="Enter Product Quantity" id="pquantity" pattern="^\+?[1-9][\d]*$" required title="Quantity must be a positive integer"></input>
								</div>
								<div>
									<label>Price:</label>
									<br />
									<input type="text" placeholder="Enter Product Price" id="pprice" pattern="^\+?[1-9][\d]*$" required title="Price must be a positive integer"></input>
								</div>

								<div className="not-registered">
									<span className="pop-up"></span>
									<span className="lds-hourglass"></span>
								</div>
								<button type="submit">Modify</button>
								<br />
							</form>
						</div>
					</div>
				</section>
			</div>
		);

	}
}


