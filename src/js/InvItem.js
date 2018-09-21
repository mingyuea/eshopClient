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
				<div><img src={this.props.img} /></div>
				<div>{this.props.itemName}</div>
				<div>{this.props.price}</div>
				<div>{this.props.rating}</div>
			</div>
		)
	}
}

export default InvItem;