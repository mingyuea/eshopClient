import React from 'react';

class ItemComp extends React.Component{
	constructor(props){
		super(props);

		this.handleAdd = this.handleAdd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleAdd(){
		this.props.onBuy();
	}

	handleCancel(){
		this.props.onClose();
	}

	render(){
		return(
			<div style={this.props.style}>
				<div onClick={this.handleCancel}>X</div>
				<img src={require('../resources/' + this.props.itemData.img)} />
				<div>{this.props.itemData.name}</div>
				<div>{this.props.itemData.price}</div>
				<div>{this.props.itemData.rating}</div>
				<div>{this.props.itemData.descrip}</div>
				<div onClick={this.handleAdd}>Add to Cart</div>
			</div>
		);
	}
}

export default ItemComp;