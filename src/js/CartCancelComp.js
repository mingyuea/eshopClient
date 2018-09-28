import React from 'react';
import Style from '../scss/CartCancelComp.scss';

class CartCancelComp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={this.props.style} className={Style.wrapper}>
				<div className={Style.boxCont}>
					<div  className={Style.textCont}>Are you sure you want to remove {this.props.itemName} from the cart?</div>
					<div className={Style.btn} onClick={this.props.onRemove}>Remove</div>
					<div className={Style.btn} onClick={this.props.onCancel}>Cancel</div>
				</div>
			</div>
		)
	}
}

export default CartCancelComp;