import React from 'react';

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
		let id = e.currentTarget.id;
		this.props.onSel(id)
	}

	render(){
		return(
			<div id={this.props.cartInd} onClick={this.handleItemSel}>
				<img src={require('../resources/'+this.props.itemData.img)} />
				<div>{this.props.itemData.name}</div>
				<div>$ {this.props.itemData.price}</div>
				<div>QTY: {this.props.itemCount}</div>
				<div onClick={this.handleCancel}>X</div>
			</div>
		)
	}

}

export default CartItem;