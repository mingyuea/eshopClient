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
import SearchComp from './SearchComp.js';

class Root extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			"fetchUrl": "http://comenv.exz7bpncky.us-west-1.elasticbeanstalk.com",
			"renderPhase": 0,
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"loginErr": "",
			"initStyle": {display: 'block'},
			"loginStyle": {display: 'none'},
			"initOption": "Signup/Login",
			"isSignUp": false,
			"loadingMsg": null,
			"currName": "",
			"dispName": "",
			"inventoryData": [
				{
					"ind": 0,
					"itemcode": "cas1",
					"itemName": "White Casual Shirt",
					"price": 14,
					"img": "cas1.jpg",
					"descrip": "A nice, casual buttoned shirt",
					"rating": "4.1"
				},
				{
					"ind": 1,
					"itemcode": "cas2",
					"itemName": "Black Casual Shirt",
					"price": 14,
					"img": "cas2.jpg",
					"descrip": "A black casual buttoned shirt",
					"rating": "4.5"
				}
			],
			"inventoryDisp": {display: 'flex'},
			"itemDisp": {display: 'none'},
			"addDisp": {display: 'none'},
			"searchIn": "",
			"inputDisp": {display: "inline-block"},
			"searchDisp": {display: 'none'},
			"currItemView": null,
			"tmpCart": [],
			"tmpCartCount": null,
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
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleBackInv = this.handleBackInv.bind(this);
		this.handleInvItemSel = this.handleInvItemSel.bind(this);
		this.handleItemBuy = this.handleItemBuy.bind(this);
		this.addConfirmClose = this.addConfirmClose.bind(this);
		this.handleItemClose = this.handleItemClose.bind(this);
		this.showCart = this.showCart.bind(this);

		this.handleCartItemSelect = this.handleCartItemSelect.bind(this);
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
				"renderPhase": 1,
				"initOption": "Signup/Login"
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

				fetch(url, {  //handles signup POST
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
							"initOption": "Logout",
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
						"initOption": "Logout",
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
			"inventoryData": data,
			"inputDisp": {display: 'inline-block'},
		}));
	}

	handleSearchChange(val){
		this.setState({
			"searchIn": val
		});
	}

	handleSearchSubmit(){
		let url = this.state.fetchUrl + '/operations/search';
		let reqBody = {
			"searchIn": this.state.searchIn
		}

		fetch(url, {
			method: "POST",
			body: JSON.stringify(reqBody),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => this.setState({
			"inventoryData": data
		}));

		this.setState({
			"inventoryDisp": {display: 'flex'},
			"itemDisp": {display: 'none'},
			"addDisp": {display: 'none'},
			"searchDisp": {display: 'inline-block'},
			"currItemView": null
		});
	}

	handleBackInv(){
		this.getInventory();

		this.setState({
			"itemDisp": {display: 'none'},
			"addDisp": {display: 'none'},
			"searchDisp": {display: 'none'},
			"currItemView": null,
			"searchIn": ""
		});
	}

	handleInvItemSel(ind){
		this.setState({
			"currItemView": ind,
			"inventoryDisp": {display: 'none'},
			"itemDisp": {display: 'block'},
			"searchDisp": {display: 'none'},
			"inputDisp": {display: 'none'}
		});
	}

	handleItemBuy(){
		let itemind = Number(this.state.currItemView);
		let itemData = this.state.inventoryData[itemind];
		let itemcode = itemData["itemcode"];
		let tmpCart = this.state.tmpCart;
		
		if(this.state.anon){
		//THIS IS A PLACEHOLDER FOR THE BACKEND			
			let itemCount = this.state.tmpCartCount;
			let itemPresent = false;
			let cartInd = null;

			for(let i = 0; i < itemCount; i++){
				if(tmpCart[i].itemcode == itemcode){
					itemPresent = true;
					cartInd = i;
				}
			}
			if(itemPresent){
				tmpCart[cartInd].amt += 1;
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
			"inventoryDisp": {display: 'flex'},
			"itemDisp": {display: 'none'},
			"inputDisp": {display: 'inline-block'},
			"addDisp": {display: 'none'}
		});
	}

	showCart(){
		if(this.state.anon){
			let tmpData = this.state.tmpCart;

			this.setState({
				"viewCart": tmpData,
				"renderPhase": 2,
				"addDisp": {display: 'none'}
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
			.then(data => {
				let itemCount = data.length;

				this.setState({
					"viewCart": data,
					"renderPhase": 2,
					"addDisp": {display: 'none'},
					"tmpCartCount": itemCount
				})
			})
		}
	}

	handleCartItemSelect(itemcode){
		let invLen = this.state.inventoryData.length;
		let inv = this.state.inventoryData;
		let viewInd = null;

		for(let i = 0; i < invLen; i++){
			if(inv[i]["itemcode"] == itemcode){
				viewInd = i;
				break;
			}
		}
		this.setState({
			"renderPhase": 1
		});

		this.handleInvItemSel(String(viewInd));
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
			let tmpCartCount = this.state.tmpCartCount;

			tmpCart.splice(cartInd, 1);
			tmpCartCount -= 1;

			if(tmpCartCount == 0){
				tmpCartCount = null
			}

			this.setState({
				"tmpCart": tmpCart,
				"tmpCartCount": tmpCartCount
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
		if(this.state.anon){
			this.handleInitCancel();
			this.setState({
				"renderPhase": 0,
				"currItemView": null,
				"inventoryDisp": {display: 'flex'},
				"itemDisp": {display: 'none'},
				"addDisp": {display: 'none'},
				"tmpCart": [],
				"tmpCartCount": null,
				"viewCart": [],
				"cartCancelCode": "",
				"cartCancelName": "",
				"cartCancelInd": null,
				"cartCancelDisp": {display: 'none'}
			});
		}
		else{
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
						"inventoryDisp": {display: 'flex'},
						"itemDisp": {display: 'none'},
						"addDisp": {display: 'none'},
						"initOption": "Logout",
						"tmpCartCount": null,
						"tmpCart": [],
						"viewCart": [],
						"cartCancelCode": "",
						"cartCancelName": "",
						"cartCancelInd": null,
						"cartCancelDisp": {display: 'none'}

					});
				}
			});

			this.handleInitCancel();
		}
	}

	componentDidMount(){
		this.getInventory();

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
					"renderPhase": 1,
					"initOption": "Logout"
				});	
			}
		});
	}


	render() {
		let renderBlock;
		let returnMsg = "< Back to the shop";

		if(this.state.renderPhase == 0){
			renderBlock = <div className={Style.initCont} style={this.state.initContStyle}>
					<InitGreet style={this.state.initStyle} handleInitSel={this.handleInitSel} />
					<Login style={this.state.loginStyle} username={this.state.uInput} password={this.state.pInput} onUChange={this.handleUserChange} onPChange={this.handlePassChange} onP2Change={this.handlePass2Change} onCancel={this.handleInitCancel} onSubmit={this.handleLogin} signup={this.state.isSignUp} loading={this.state.loadingMsg} err={this.state.loginErr} />
				</div>;
		}
		else if(this.state.renderPhase == 1){
			renderBlock = [
				<div className={Style.phaseHeader}><div className={Style.headerTxt}>The Shop</div></div>,
				<div onClick={this.handleLogout} className={Style.logout}>{this.state.initOption}</div>,
				<div onClick={this.showCart} className={Style.cart}>CART {this.state.tmpCartCount}</div>,
				<div style={this.state.searchDisp} className={Style.searchToggle} onClick={this.handleBackInv}>{returnMsg}</div>,
				<SearchComp style={this.state.inputDisp} searchIn={this.state.searchIn} onChange={this.handleSearchChange} onSearch={this.handleSearchSubmit} />,
				<InventoryCont style={this.state.inventoryDisp} invData={this.state.inventoryData} onSel={this.handleInvItemSel} />
				];

			if(this.state.currItemView){
				renderBlock.push(<ItemComp itemData={this.state.inventoryData[Number(this.state.currItemView)]} onBuy={this.handleItemBuy} onClose={this.handleItemClose} />);
				renderBlock.push(<AddConfirmCont style={this.state.addDisp} onClose={this.addConfirmClose} />)
			}
		}
		else if(this.state.renderPhase == 2){
			renderBlock = [
				<div className={Style.phaseHeader}><div className={Style.headerTxt}>Your Cart</div></div>,
				<div onClick={this.handleLogout} className={Style.logout}>{this.state.initOption}</div>,
				<CartCancelComp style={this.state.cartCancelDisp} itemName={this.state.cartCancelName} onRemove={this.handleCartItemRemove} onCancel={this.handleCartItemClose} />,
				<CartComp onCartClose={this.handleCartClose} cartData={this.state.viewCart} onItemCancel={this.handleCartItemCancel} onItemSel={this.handleCartItemSelect} />
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