import React from 'react';
import ReactDOM from 'react-dom';
import Style from '../scss/Root.scss';
import InitGreet from './InitGreet';
import Login from './Login.js';
import InventoryCont from './InventoryCont.js';
import ItemComp from './ItemComp.js';
import CartComp from './CartComp.js';
import CartCancelComp from './CartCancelComp.js';
import AddConfirmCont from './AddConfirmCont.js';

class Root extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			"fetchUrl": "http://localhost:5000",
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
			"dispName": "",
			"inventoryData": [
				{
					"ind": 0,
					"itemcode": "p1",
					"itemName": "Casual Pants",
					"price": 18,
					"img": "p1.jpg",
					"descrip": "A pair of nice, casual pants, for doing casual stuff",
					"rating": "3.5"
				},
				{
					"ind": 1,
					"itemcode": "p2",
					"itemName": "Some Other Casual Pants",
					"price": 21.99,
					"img": "p2.jpg",
					"descrip": "A better pair of nice, casual pants, for doing casual stuff",
					"rating": "4"
				}
			],
			"inventoryDisp": {display: 'block'},
			"itemDisp": {display: 'none'},
			"addDisp": {display: 'none'},
			"currItemView": null,
			"tmpCart": [],
			"tmpCartCount": 0,
			"viewCart": [],
			"cartCancelCode": "",
			"cartCancelName": "",
			"cartCancelInd": null,
			"cartCancelDisp": {display: 'none'}
		}


		this.handleInitSel = this.handleInitSel.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handlePass2Change = this.handlePass2Change.bind(this);
		this.handleInitCancel = this.handleInitCancel.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

		this.getInventory = this.getInventory.bind(this);
		this.handleInvItemSel = this.handleInvItemSel.bind(this);
		this.handleItemBuy = this.handleItemBuy.bind(this);
		this.addConfirmClose = this.addConfirmClose.bind(this);
		this.handleItemClose = this.handleItemClose.bind(this);
		this.showCart = this.showCart.bind(this);

		this.handleCartItemCancel = this.handleCartItemCancel.bind(this);
		this.handleCartItemClose = this.handleCartItemClose.bind(this);
		this.handleCartItemRemove = this.handleCartItemRemove.bind(this);
		this.handleCartClose = this.handleCartClose.bind(this);

		this.handleLogout = this.handleLogout.bind(this);
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
				"anon": true,
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

	handleInitCancel(){  //handles cancel on the login/signup page
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
				let url = this.state.fetchUrl + '/auth/signup';
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
					mode: 'cors',
					body: JSON.stringify(signupObj),
					credentials: 'include',
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
							"dispName": dispName, 
							"anon": false
						});
					}
				});
			}
		}
		else{ //this controls the login function
			let url = this.state.fetchUrl + '/auth/login';
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
				mode: 'cors',
				body: JSON.stringify(loginObj),
				credentials: 'include',
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
						"loadingMsg": null,
						"anon": false
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

	getInventory(){
		let url = this.state.fetchUrl + '/operations/inventory';

		fetch(url)
		.then(res => res.json())
		.then(data => this.setState({
			"inventoryData": data
		}));
	}

	handleInvItemSel(ind){

		this.setState({
			"currItemView": ind,
			"inventoryDisp": {display: 'none'},
			"itemDisp": {display: 'block'},
		});
	}

	handleItemBuy(){
		let itemind = this.state.currItemView;
		let itemData = this.state.inventoryData[itemind];
		let itemcode = itemData.itemcode;
		let tmpCart = this.state.tmpCart;

		if(this.state.anon){
		//THIS IS A PLACEHOLDER FOR THE BACKEND			
			let itemCount = this.state.tmpCartCount;
			let itemPresent = false;
			let itemInd = null;

			for(let i = 0; i < itemCount; i++){
				if(tmpCart[i].itemcode == itemcode){
					itemPresent = true;
					itemInd = i;
				}
			}
			if(itemPresent){
				tmpCart[itemInd].amt += 1;
			}
			else{
				let newItem = {
					"itemcode": itemcode,
					"amt": 1,
					"itemData": itemData
				};
				tmpCart.push(newItem);
				itemCount += 1;
			}
			
			this.setState({
				"tmpCart": tmpCart,
				"addDisp": {display: 'block'},
				"tmpCartCount": itemCount
			});
		/**PLACEHOLDER ENDS HERE**/
		}
		else{
			let reqBody = {
				"itemcode": itemcode,
				"itemAmt": 1
			}
			let url = this.state.fetchUrl + '/operations/addcart'
			fetch(url, {
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify(reqBody),
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
			})
			.then(res => res.json())
			.then(data => this.setState({
				"tmpCartCount": data.itemCount,
				"addDisp": {display: 'block'}	
			}));
		}
	}

	addConfirmClose(){
		this.setState({
			"addDisp": {display: 'none'}
		});
	}

	handleItemClose(){
		this.setState({
			"currItemView": null,
			"inventoryDisp": {display: 'block'},
			"itemDisp": {display: 'none'}
		});
	}

	showCart(){
		if(this.state.anon){
			let tmpData = this.state.tmpCart;

			this.setState({
				"viewCart": tmpData,
				"renderPhase": 2
			})
		}
		else{
			let url = this.state.fetchUrl + '/operations/cart'
			fetch(url, {
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
			})
			.then(res => res.json())
			.then(data => this.setState({
				"viewCart": data,
				"renderPhase": 2
			}))
		}
	}

	handleCartItemCancel(code, ind){
		let itemName = this.state.viewCart[ind].itemData.name;

		this.setState({
			"cartCancelCode": code,
			"cartCancelName": itemName,
			"cartCancelInd": ind,
			"cartCancelDisp": {display: 'block'}
		});
	}

	handleCartItemClose(){
		this.setState({
			"cartCancelCode": "",
			"cartCancelName": "",
			"cartCancelInd": "",
			"cartCancelDisp": {display: 'none'}
		});
	}

	handleCartItemRemove(){
		if(this.state.anon){
			let tmpCart = this.state.tmpCart;
			let cartInd = this.state.cartCancelInd;

			tmpCart.splice(cartInd, 1);

			this.setState({
				"tmpCart": tmpCart
			});

			this.handleCartItemClose();
		}
		else{
			let tmpArr = this.state.viewCart;
			let url = this.state.fetchUrl + '/operations/remove';
			let reqBody = {
				"itemCode": this.state.cartCancelCode
			};

			tmpArr.splice(this.state.cartCancelInd, 1);
			
			fetch(url, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(reqBody),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => this.setState({
					"viewCart": tmpArr
				})
			)

			this.handleCartItemClose();
		}
	}

	handleCartClose(){
		this.handleCartItemClose();

		this.setState({
			"renderPhase": 1
		});
	}

	handleLogout(){
		let url = this.state.fetchUrl + '/auth/logout';
		fetch(url, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			header: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.logout){
				this.setState({
					"currName": null,
					"renderPhase": 0,
					"currItemView": null,
					"inventoryDisp": {display: 'block'},
					"itemDisp": {display: 'none'},
				});
			}
		});

		this.handleInitCancel();
	}

	componentDidMount(){
		let url = this.state.fetchUrl + '/auth/init';
		fetch(url, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			header: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.signedIn){
				this.setState({
					"currName": data.username,
					"renderPhase": 1
				})
			}
		});
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
			renderBlock = [
				<div onClick={this.handleLogout}>Logout</div>,
				<div onClick={this.showCart}>CART</div>,
				<div onClick={this.getInventory}>Update Inventory</div>,
				<InventoryCont style={this.state.inventoryDisp} invData={this.state.inventoryData} onSel={this.handleInvItemSel} />
				];

			if(this.state.currItemView){
				renderBlock.push(<ItemComp itemData={this.state.inventoryData[this.state.currItemView]} onBuy={this.handleItemBuy} onClose={this.handleItemClose} />);
				renderBlock.push(<AddConfirmCont style={this.state.addDisp} itemName={this.state.inventoryData[this.state.currItemView].itemName} onClose={this.addConfirmClose} />)
			}
		}
		else if(this.state.renderPhase == 2){
			renderBlock = [
				<div onClick={this.handleLogout}>Logout</div>,
				<CartCancelComp style={this.state.cartCancelDisp} itemName={this.state.cartCancelName} onRemove={this.handleCartItemRemove} onCancel={this.handleCartItemClose} />,
				<CartComp onCartClose={this.handleCartClose} cartData={this.state.viewCart} onItemCancel={this.handleCartItemCancel} />
			]
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

wrapper ? ReactDOM.render(<Root />, wrapper) : false;