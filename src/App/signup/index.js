import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { device } from '../../exportables/exportables'

let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailRef: React.createRef(),
			passwordRef: React.createRef(),
			emailError: null,
			lengthError: null,
			SpecialError: null,
			numberError: null,
			uppError: null,
			charColor: '#b3b3b3',
			lengthColor: '#b3b3b3',
			specialColor: '#b3b3b3',
			numberColor: '#b3b3b3',
			uppColor: '#b3b3b3',
			showpassword: false,
			checked: false,
		};
	}

	componentDidUpdate() {
		this.state.emailRef.current.value = this.state.email;
		this.state.passwordRef.current.value = this.state.password;
	}
	showpassword = () => {
		this.setState({
			showpassword: !this.state.showpassword,
			password: this.state.passwordRef.current.value,
			email: this.state.emailRef.current.value,
		});
	};
	check = () => {
		this.setState({
			checked: !this.state.checked,
			password: this.state.passwordRef.current.value,
			email: this.state.emailRef.current.value,
		});
	};
	handleSubmit = event => {
		event.preventDefault();
		var err = false;
		this.setState({
			email: this.state.emailRef.current.value,
			password: this.state.passwordRef.current.value,
		});
		if (emailValidate.test(this.state.emailRef.current.value) === false) {
			this.setState({
				emailError: true,
			});
			err = true;
		} else {
			this.setState({
				emailError: false,
			});
		}
		if (this.state.passwordRef.current.value.length < 8) {
			this.setState({
				lengthError: true,
				charColor: '#ff0000',
			});
			err = true;
		} else {
			this.setState({
				lengthError: false,
				charColor: '#33cc33',
			});
		}
		if (this.state.passwordRef.current.value.search(/[0-9]/) < 0) {
			this.setState({
				numberError: true,
				numberColor: '#ff0000',
			});
			err = true;
		} else {
			this.setState({
				numberError: false,
				numberColor: '#33cc33',
			});
		}
		if (this.state.passwordRef.current.value.search(/[A-Z]/) < 0) {
			this.setState({
				uppError: true,
				uppColor: '#ff0000',
			});
			err = true;
		} else {
			this.setState({
				uppError: false,
				uppColor: '#33cc33',
			});
		}
		if (this.state.passwordRef.current.value.search(/[!#$%&@? ]/) < 0) {
			this.setState({
				SpecialError: true,
				specialColor: '#ff0000',
			});
			err = true;
		} else {
			this.setState({
				SpecialError: false,
				specialColor: '#33cc33',
			});
		}
		if (!err & this.state.checked) {
			var createCORSRequest = (method, url) => {
				var xhr = new XMLHttpRequest();
				if ('withCredentials' in xhr) {
					// Most browsers.
					xhr.open(method, url, true);
				} else if (typeof window.XDomainRequest != 'undefined') {
					// IE8 & IE9
					xhr = new window.XDomainRequest();
					xhr.open(method, url);
				} else {
					// CORS not supported.
					xhr = null;
				}
				return xhr;
			};
			var url = 'http://34.253.224.180:18306/register/index';
			var method = 'POST';
			var xhr = createCORSRequest(method, url);

			xhr.onload = res => {
				this.props.history.push('/dashboard');
				console.log(res);
			};

			xhr.onerror = function () {
				// Error code goes here.
			};

			xhr.send({ email: 'demo@gmail.com', password: 'Demo@123' });
		}
	};

	render() {
		const Input = styled.input`
	width: 100%;
	border-radius: 5px;
	height: 40px;
	border: 1px solid #ccc;
	padding: 0px;
	outline: 0px;
	font-size: 16px;
	padding: 10px;
	box-sizing: border-box;
	margin-top: 3px;
`;

		const Container = styled.div({
			width: '40%',
			maxWidth: 376,
			borderWidth: 1,
			margin: 'auto',
			flexDirection: 'row',
			borderColor: 'black',
		});
		const Button = styled.button({
			width: '100%',
			borderRadius: 5,
			backgroundColor: ' #009999',
			borderWidth: 0,
			marginTop: 5,
			marginBottom: 20,
		});
		const Buttontext = styled.p({
			color: '#FFFFFF',
		});
		const BlueH1 = styled.h1({
			margin: 0,
			fontSize: 50,
			color: '#000066',
			fontWeight: 'bolder',
		});
		const GreenH1 = styled.h1({
			fontSize: 60,
			margin: 0,
			fontWeight: 'normal',
			color: '#009999',
		});
		const AgreeText = styled.p({
			fontSize: 12,
			margin: 0,
			color: '#090909',
		});
		const Checkbox = styled.input({
			borderColor: '#009999',
			width: "15px"
		});

		const Label = styled.p({
			margin: 0,
		});
		const Mediumtext = styled.p({
			margin: 0
		});

		const Logo = styled.img({
			marginLeft: '55px',
			marginTop: '52px',
		});
		const Chardiv = styled.div({
			backgroundColor: this.state.charColor,
			height: '1vh',
			width: '60px',
			borderRadius: 5,
		});
		const Numdiv = styled.div({
			backgroundColor: this.state.numberColor,
			height: '1vh',
			width: '60px',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Spcldiv = styled.div({
			backgroundColor: this.state.specialColor,
			height: '1vh',
			width: '60px',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Uppdiv = styled.div({
			backgroundColor: this.state.uppColor,
			height: '1vh',
			width: '60px',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Errortext = styled.p({
			color: '#ff0000',
			margin: 0,
		});
		return (
			<Styles>
				<Logo src={hypaiq} />
				<div className="content-box">
					<BlueH1 className="second-row-title">Create a</BlueH1>
					<GreenH1 className="first-row-title">Free Account</GreenH1>
					<p >Hypal is a - multi line invitation text goes here</p>
					<form onSubmit={this.handleSubmit} id="SIGINFORM">
						<br />
						<div
							style={{
								flexDirection: 'row',
								display: 'flex',
								justifyContent: 'space-between',
								width: '90%',
							}}
						>
							<Label>Email</Label>
							{this.state.emailError ? (
								<Errortext>invalid email format</Errortext>
							) : null}
						</div>
						<Input
							ref={this.state.emailRef}
							name="email"
							id="email"
							className=""
							required
						/>
						<br />
						<br />
						<div
							style={{
								flexDirection: 'row',
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Label>Password</Label>
							{this.state.uppError ||
								this.state.numberError ||
								this.state.SpecialError ||
								this.state.lengthError ? (
									<Errortext>Strong password required</Errortext>
								) : null}
							<IconContext.Provider
								value={{ style: { fontSize: '15', color: '#000000' } }}
							>
								<div>
									<FaEyeSlash onClick={this.showpassword} />
								</div>
							</IconContext.Provider>
						</div>
						<Input
							id="password"
							ref={this.state.passwordRef}
							name="password"
							className=""
							required
							type={this.state.showpassword ? 'text' : 'password'}
						/>
						<br />

						<AgreeText>At least:</AgreeText>
						<AgreeText>
							8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1
							uppercase,&nbsp;&nbsp;&nbsp;1 special character
							</AgreeText>
						<div style={{ flexDirection: 'row', display: 'flex' }}>
							<Chardiv /> <Numdiv /> <Uppdiv />
							<Spcldiv />
						</div>
						<br />
						<div
							style={{
								color: '#009999',
								textDecoration: 'none',
								flexDirection: "row",
								display: "flex"
							}}
						>
							<Checkbox
								type="checkbox"
								checked={this.state.checked}
								onChange={this.check}
							></Checkbox>
							<AgreeText>I have read and agree to the </AgreeText>
							<Link
								style={{
									fontSize: 12,
									color: '#009999',
									textDecoration: 'none',
								}}
								to="/user-agreement"
							>
								&nbsp;HypalQ User Agreement
								</Link>
							<br />
						</div>

						<Button className="button" title="Log in" type={'submit'}>
							<Buttontext>Sign Up</Buttontext>
						</Button>
						<br />

						Already have an account?  <Link
							style={{ color: '#009999', textDecoration: 'none' }}
							to="/"
						>
							Sign in
						</Link>
					</form>
				</div>
			</Styles>
		);
	}
}
export default withRouter(Signup);
const Styles = styled.div`
	padding: 2% 5%;
	.logo-holder {
		margin-bottom: 20px;
		img {
			width: 27.5%;
			max-width: 250px;
		}
	}
	.content-box {
		max-width: 350px;
		margin: 0px auto;
		.first-row-title {
			font-size: calc(1em + 2.5vw);
			margin: 0;
			font-weight: normal;
			color: #009999;
		}
		.second-row-title {
			margin: 0;
			font-size: calc(1em + 2.5vw);
			color: #000066;
			font-weight: bolder;
		}
		form {
			margin: 100px 0;
		}
	}

	@media ${device.tablet} {
		padding: 0;
		.logo-holder {
			text-align: center;
			padding: 4% 0;
			img {
				width: 35%;
			}
		}
		.content-box {
			width: 85%;
			margin: auto;
			margin-top: 2em;
			.first-row-title {
				font-size: 12vw;
				margin: 0;
				font-weight: normal;
				color: #009999;
			}
			.second-row-title {
				margin: 0;
				font-size: 12vw;
				color: #000066;
				font-weight: bolder;
			}
			form {
				margin: 50px 0;
			}
		}
	}
`;
