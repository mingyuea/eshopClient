import React from 'react';
import Style from '../scss/AddConfirmCont.scss';

class AddConfirmCont extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={this.props.style} className={Style.wrapper}>
				<div className={Style.boxCont}>
					<div className={Style.textCont}>Item has been added to your cart!</div>
					<div onClick={this.props.onClose} className={Style.btn}>OK</div>
				</div>
			</div>
		)
	}
}

export default AddConfirmCont;