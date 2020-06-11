import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { Link } from 'react-router-dom';
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
						<Input type="text" name="email" ref={this.emailRef} />
						<br />
						<br />
						<PasswordLabel>
							<span>Password</span>
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
						/>
						<br />
						<p className="reset-password-button">Forgot password ?</p>
						<br />
						<br />
						<br />
						<Button>SIGN IN</Button>
						<br />
						Don't have an account ?{' '}
						<Link style={{ color: '#009999', marginLeft: 5 }} to="/signup">
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
	color: #676767;
	padding: 2% 5%;
	button {
		outline: 0;
	}
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
			.reset-password-button {
				display: inline-block;
				padding: 0;
				float: right;
				margin: 0;
				background: transparent;
				cursor: pointer;
				color: #479a99;
				font-size: 100%;
				margin-top: 2px;
				text-decoration: underline;
			}
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

const Label = styled.label`
	display: flex;
	color: #676767;
`;
const PasswordLabel = styled.label`
	display: flex;
	justify-content: space-between;
	color: #676767;
`;
