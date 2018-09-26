import React from 'react';

class CartCancelComp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		<div style={this.props.style}>
			Are you sure you want to remove {this.props.item} from the cart?
			<div onClick={this.props.onRemove}>Remove</div>
			<div onClick={this.props.onCancel}>Cancel</div>
		</div>
	}
}

export default CartCancelComp;