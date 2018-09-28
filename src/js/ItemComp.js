import React from 'react';
import Style from '../scss/ItemComp.scss';

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
			<div style={this.props.style} className={Style.main}>
				<div onClick={this.handleCancel} className={Style.close}>X</div>
				<img src={require('../resources/' + this.props.itemData.img)} className={Style.itemImg} />
				<div className={Style.textCont}>
					<div className={Style.itemName}>{this.props.itemData.name}</div>
					<div className={Style.itemPrice}>${this.props.itemData.price}</div>
					<div>{this.props.itemData.rating}</div>
					<div className={Style.itemDescrip}>{this.props.itemData.descrip}</div>
					<div onClick={this.handleAdd} className={Style.addBtn}>Add to Cart</div>
				</div>
			</div>
		);
	}
}

export default ItemComp;