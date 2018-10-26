import React from 'react';

class ReviewComp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let reviewList = "No reviews yet! Add one!";
		let revOption = "Add a review";

		if(this.props.reviewList.length > 0){			
			reviewList = this.props.reviewList.map(revObj => 
				<div>
					<div>{revObj.rating}</div> 
					<div>{revObj.text}</div>
					<div>-User: {revObj.author}</div>
				</div>
			);

			if(this.props.reviewExist){
				revOption = "Edit your review";
				reviewList[0] = <div>
					<div>{revObj.rating}</div> 
					<div>{revObj.text}</div>
					<div>-User: {revObj.author}</div>
				</div>
			}
		}

		return(
			<div>
				<div>
					{reviewList}
				</div>
				<div onClick={this.props.onAdd}>
					{revOption}
				</div>
			</div>
		);
	}
}

export default ReviewComp;