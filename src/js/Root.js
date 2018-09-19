import React from 'react';
import ReactDOM from 'react-dom';
import Style from '../scss/Root.scss';
import InitGreet from './InitGreet';
import Login from './Login.js';

class Root extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			"renderPhase": 0,
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"loginErr": "",
			"initStyle": {display: 'block'},
			"loginStyle": {display: 'none'},
			"isSignUp": false,
			"loadingMsg": null,
			"currName": "",
			"dispName": ""
		}


		this.handleInitSel = this.handleInitSel.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handlePass2Change = this.handlePass2Change.bind(this);
		this.handleInitCancel = this.handleInitCancel.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleInitSel(choice){  //handles choice of login/signup/anon
		this.setState({
			initStyle: {display: 'none'}
		});

		if(choice == "login"){
			this.setState({
				"loginStyle": {display: 'block'}
			});
		}
		else if(choice == "signup"){
			this.setState({
				"loginStyle": {display: 'block'},
				"isSignUp": true
			});
		}
		else{    //anonymous usage
			this.setState({
				"dispName": "Your",
				"renderPhase": 1
			});
		}
	}

	handleUserChange(input){ //handles username input
		this.setState({
			"uInput": input
		});
	}

	handlePassChange(input){ //handles password input
		this.setState({
			"pInput": input
		});
	}

	handlePass2Change(input){ //handles password confirmation input
		this.setState({
			"p2Input": input
		});
	}

	handleInitCancel(whichStyle){  //handles cancel on the login/signup page
		let stateObj = {
			"initStyle": {display: 'block'},
			"loginStyle": {display: 'none'},
			"loginErr": null,
			"loadingMsg": null,
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"isSignUp": false
		};

		this.setState(stateObj);
	}

	handleLogin(){
		if(this.state.isSignUp){ //filters out signup issues on client-side
			if(this.state.pInput != this.state.p2Input){
				this.setState({
					"loginErr": "Passwords must match"
				});
			}
			else if(this.state.uInput.length == 0){
				this.setState({
					"loginErr": "You must have a username"
				});
			}
			else if(this.state.pInput.length == 0){
				this.setState({
					"loginErr": "Password cannot be empty"
				});
			}
			else if(this.state.pInput.length < 6){
				this.setState({
					"loginErr": "Password must be at least 6 characters long"
				});
			}
			else{  //this controls the signup function if no prev problems
				let url = this.state.fetchUrl + '/signup';
				let signupObj = {
					'username': this.state.uInput,
					'password': this.state.pInput
				};

				this.setState({  //displays loading while fetching
					"loadingMsg": "Loading...",
					"loginErr": ""
				});

				fetch(url, {
					method: 'POST',
					body: JSON.stringify(signupObj),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(data => {
					if(data.actionSuccess){
						return true;
					}
					else{
						this.setState({
							"loginErr": data.error,
							"loadingMsg": ""
						});
						return false;
					}
				})
				.then(result => {
					if(result){
						let dispName = this.state.uInput;
						this.setState({
							"renderPhase": 1,
							"pInput": "",
							"p2Input": "",
							"isSignUp": false,
							"currName": this.state.uInput,
							"dispName": dispName
						});
					}
				})
				.then(() => {
					this.handleListSel("AAPL", 0, '1m');
				});
			}
		}
		else{ //this controls the login function
			let url = this.state.fetchUrl + '/login';
			let loginObj = {
				'username': this.state.uInput,
				'password': this.state.pInput,
			};

			this.setState({  //displays loading while fetching
				"loadingMsg": "Loading...",
				"loginErr": ""
			});

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(loginObj),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(resObj => {
				if(resObj.actionSuccess){
					let dispName = this.state.uInput;
					this.setState({
						"renderPhase": 1,
						"pInput": "",
						"p2Input": "",
						"isSignUp": false,
						"currName": this.state.uInput,
						"dispName": dispName,
						"loadingMsg": null
					});
				}
				else{
					this.setState({
						"loginErr": resObj.error,
						"loadingMsg": null
					});

					return false;
				}
			})
		}
	}


	render() {
		let renderBlock;
		if(this.state.renderPhase == 0){
			renderBlock = <div className={Style.initCont} style={this.state.initContStyle}>
					<InitGreet style={this.state.initStyle} handleInitSel={this.handleInitSel} />
					<Login style={this.state.loginStyle} username={this.state.uInput} password={this.state.pInput} onUChange={this.handleUserChange} onPChange={this.handlePassChange} onP2Change={this.handlePass2Change} onCancel={this.handleInitCancel} onSubmit={this.handleLogin} signup={this.state.isSignUp} loading={this.state.loadingMsg} err={this.state.loginErr} />
				</div>;
		}
		else if(this.state.renderPhase == 1){
			renderBlock = "works!";
		}

		return(
			<div className={Style.mainCont}>
				{renderBlock}
			</div>
		);
	}
}

export default Root;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(wrapper, <Root />) : false;