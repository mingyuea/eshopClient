import React from 'react';
import Style from '../scss/CartItem.scss';

class CartItem extends React.Component{
	constructor(props){
		super(props);

		this.handleCancel = this.handleCancel.bind(this);
		this.handleItemSel = this.handleItemSel.bind(this);
	}

	handleCancel(e){
		let id = e.currentTarget.parentNode.id;
		this.props.onCancel(id);
	}

	handleItemSel(e){
		let id = e.currentTarget.parentNode.id;
		this.props.onSel(id)
	}

	render(){
		return(
			<div id={this.props.cartInd} className={Style.mainCont}>
				<img src={require('../resources/'+this.props.itemData.img)} className={Style.img} />
				<div className={Style.textCont} onClick={this.handleItemSel}>
					<div className={Style.itemName}>{this.props.itemData.name}</div>
					<div className={Style.itemQty}>QTY: {this.props.itemCount}</div>
					<div className={Style.itemPrice}>${this.props.itemData.price}</div>								
				</div>
				<div className={Style.itemCancel}onClick={this.handleCancel}>X</div>
			</div>
		)
	}

}

export default CartItem;