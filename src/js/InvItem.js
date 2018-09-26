import React from 'react';

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
			<div id={this.props.ind} onClick={this.handleClick}>
				<img src={require('../resources/'+this.props.itemData.img)} />
				<div>{this.props.itemData.name}</div>
				<div>$ {this.props.itemData.price}</div>
				<div>{this.props.itemData.rating}</div>
			</div>
		)
	}
}

export default InvItem;