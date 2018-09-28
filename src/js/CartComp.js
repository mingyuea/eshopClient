import React from 'react';
import CartItem from './CartItem.js';
import Style from  '../scss/CartComp.scss';

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
		let backBtn = "< Exit Cart";
		if(this.props.cartData.length > 0){
			cartRender = this.props.cartData.map((obj, ind) => 
				<CartItem cartInd={ind} itemData={obj.itemData} itemCount={obj.amt} onSel={this.handleItemSel} onCancel={this.handleItemCancel} />)
		}

		return(
			<div className={Style.main}>
				<div onClick={this.props.onCartClose} className={Style.closeBtn}>{backBtn}</div>
				<div className={Style.listCont}>
					{cartRender}
				</div>
			</div>
		);
	}
}

export default CartComp;