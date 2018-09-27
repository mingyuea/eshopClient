import React from 'react';
import CartItem from './CartItem.js';

class CartComp extends React.Component{
	constructor(props){
		super(props);

		this.handleItemCancel = this.handleItemCancel.bind(this);
		this.handleItemSel = this.handleItemSel.bind(this);
	}

	handleItemCancel(ind){
		let itemCode = this.props.cartData[ind].itemcode;
		this.props.onItemCancel(itemCode, ind);
	}

	handleItemSel(ind){
		let itemcode = this.props.cartData[ind].itemcode;
		this.props.onItemSel(itemcode);
	}

	render(){
		let cartRender = "Your cart is empty";
		if(this.props.cartData.length > 0){
			cartRender = this.props.cartData.map((obj, ind) => 
				<CartItem cartInd={ind} itemData={obj.itemData} itemCount={obj.amt} onSel={this.handleItemSel} onCancel={this.handleItemCancel} />)
		}

		return(
			<div>
				Your Cart
				{cartRender}
				<div onClick={this.props.onCartClose}>X</div>
			</div>
		);
	}
}

export default CartComp;