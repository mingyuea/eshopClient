import React from 'react';

class CartItem extends React.Component{
	constructor(props){
		super(props);

		this.handleCancel = this.handleCancel.bind(this);
	}

	handleCancel(e){
		let id = e.currentTarget.parentNode.id;
		this.props.onCancel(id);
	}

	render(){
		return(
			<div id={this.props.cartInd}>
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