import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { Link, Redirect } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { device } from '../../exportables/exportables';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPasswordVisible: false,
		};
		this.emailRef = createRef();
		this.passwordRef = createRef();
	}

	handleSubmit = e => {
		e.preventDefault();
		let data = {
			email: this.emailRef.current.value,
			password: this.passwordRef.current.value,
		};
		if (data.email === 'demo@mail.com' && data.password === 'Demo@mail') {
			this.props.authObj.authenticate(true);
			this.props.history.push('/dashboard');
		}
	};

	render() {
		const passwordFieldName = this.state.isPasswordVisible
			? 'text'
			: 'password';

		return (
			<Styles>
				<div className="logo-holder">
					<img src={hypaiq} alt="Hypaiq" />
				</div>
				<div className="content-box">
					<h1 className="first-row-title">Sign into your</h1>
					<h1 className="second-row-title">Account</h1>
					<form onSubmit={this.handleSubmit}>
						<br />
						<Label>Email</Label>
						<Input type="text" name="email" required ref={this.emailRef} />
						<br />
						<br />
						<PasswordLabel>
							<span>Password</span>{' '}
							<FaEyeSlash
								color={this.state.isPasswordVisible ? '#ccc' : ''}
								onClick={() =>
									this.setState({
										isPasswordVisible: !this.state.isPasswordVisible,
									})
								}
							/>
						</PasswordLabel>
						<Input
							type={passwordFieldName}
							name="password"
							ref={this.passwordRef}
							required
						/>
						<br />
						<Link
							style={{
								fontSize: 15,
								color: '#009999',
								color: '#888',
								cursor: 'not-allowed',
								textDecoration: 'underline',
								float: 'right',
							}}
						>
							Forgot password?
						</Link>
						<br />
						<br />
						<br />
						<Button>SIGN IN</Button>
						<br />
						Don't have an account ?{' '}
						<Link
							style={{ color: '#009999', textDecoration: 'none' }}
							to="/signup"
						>
							Sign up
						</Link>
					</form>
				</div>
			</Styles>
		);
	}
}

export default Signin;

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

const Container = styled.div({
	width: '40%',
	maxWidth: 376,
	borderWidth: 1,
	margin: 'auto',
	flexDirection: 'row',
	borderColor: 'black',
});

const Hypa = styled.p({
	fontSize: 80,
	marginLeft: '3%',
});
const Iq = styled.p({
	fontSize: 80,
	color: ' #00e6e6',
});
const Button = styled.button({
	width: '100%',
	height: '40px',
	borderRadius: 5,
	backgroundColor: ' #009999',
	borderWidth: 0,
	marginTop: 5,
	marginBottom: 20,
	color: '#FFFFFF',
	fontSize: 18,
	fontWeight: 'bold',
	cursor: 'pointer',
});

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
const AgreeText = styled.p({
	fontSize: 12,
	marginTop: 0,
	color: '#090909',
});
const Checkbox = styled.input({
	borderColor: '#009999',
});
const Greentext = styled.p({
	fontSize: 12,
	color: '#009999',
});
const Label = styled.label`
	display: flex;
	color: #676767;
`;
const PasswordLabel = styled.label`
	display: flex;
	justify-content: space-between;
	color: #676767;
`;
const Mediumtext = styled.p({
	fontSize: 20,
});
const ForgotPass = styled.p({
	fontSize: 18,
	color: '#009999',
	textDecoration: 'underline',
	alignItems: 'flex-end',
	display: 'flex',
});
const Logo = styled.img({
	marginLeft: '55px',
	marginTop: '52px',
});
