import React from 'react';

class AddConfirmCont extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={this.props.style}>
				Item has been added to your cart!
				<div onClick={this.props.onClose}>OK</div>
			</div>
		)
	}
}

export default AddConfirmCont;