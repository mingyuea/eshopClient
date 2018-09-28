import React from 'react';
import InvItem from './InvItem.js';
import Style from '../scss/InventoryCont.scss';

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
			renderArr = this.props.invData.map((itemObj, ind) => 
				<InvItem ind={ind} itemData={itemObj} onClick={this.handleItemSel}/>
			)
		}
		return(
			<div style={this.props.style} className={Style.main}>
				{renderArr}
			</div>
		);
	}
}

export default InventoryCont;