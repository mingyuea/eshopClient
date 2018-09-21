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
				<div><img src={this.props.itemData.img} /></div>
				<div>{this.props.itemData.itemName}</div>
				<div>{this.props.itemData.price}</div>
				<div>{this.props.itemData.rating}</div>
				<div>{this.props.itemData.descr}</div>
				<div onClick={this.handleAdd}>Add to Cart</div>
			</div>
		);
	}
}

export default ItemComp;