import React from 'react';
import InvItem from './InvItem.js';

class InventoryCont extends React.Component{
	constructor(props){
		super(props);

		this.handleItemSel = this.handleItemSel.bind(this);
	}

	handleItemSel(ind){
		this.props.onSel(ind);
	}

	render(){
		let renderArr = [];
		if(this.props.invData){
			renderArr = this.props.invData.map(itemObj => 
				<InvItem ind={itemObj.itemInd} img={itemObj.img} itemName={itemObj.itemName} price={itemObj.price} rating={itemObj.rating} onClick={this.handleItemSel}/>
			)
		}
		return(
			<div style={this.props.style}>
				{renderArr}
			</div>
		);
	}
}

export default InventoryCont;