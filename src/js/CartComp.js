import React from 'react';

class CartComp extends React.Component{
	constructor(props){
		super(props);

	}

	render(){

		return(
			<div>
				CART!
				<div onClick={this.props.onCartClose}>X</div>
			</div>
		);
	}
}

export default CartComp;