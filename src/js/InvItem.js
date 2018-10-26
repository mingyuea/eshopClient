import React from 'react';
import Style from '../scss/InvItem.scss';

class InvItem extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		let ind = e.currentTarget.id;
		this.props.onClick(ind);
	}

	render(){
		return(
			<div id={this.props.ind} onClick={this.handleClick} className={Style.main}>
				<img src={require('../resources/'+this.props.itemData.img)} className={Style.itemImg} />
				<div className={Style.nameTxt}>{this.props.itemData.name}</div>
				<div className={Style.priceTxt}>${this.props.itemData.price}</div>
				<div className={Style.ratingTxt}>Rating: {this.props.itemData.rating}/5</div>
			</div>
		)
	}
}

export default InvItem;