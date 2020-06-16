import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { Link, withRouter } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';

import { device } from '../../exportables/exportables';
import ResetPasswordPopup from './components/ResetPasswordPopup';
import { apiUrl } from '../calls/apis';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPasswordVisible: false,
			errors: {
				emailErrMsg: null,
				passwordErrMsg: null,
				loginErrMsg: null,
				nAttempt: 0,
			},
			isPopupVisible: false,
		};
		this.emailRef = createRef();
		this.passwordRef = createRef();
		if (this.props.authObj.isAuthenticated)
			this.props.history.push('/dashboard');
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	validateEmail(mail) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		return false;
	}

	saveAuthTokenInSession = token => {
		window.sessionStorage.setItem('token', token);
	};

	handleSubmit = e => {
		e.preventDefault();
		const email = this.emailRef.current.value;
		const password = this.passwordRef.current.value;
		/**
		 * Two scenario for email validation.
		 * - no email provided
		 * - invalid email format
		 */
		if (!email.length) {
			this.setState({
				errors: { ...this.state.errors, emailErrMsg: 'Email required' },
			});
			return;
		}
		if (!this.validateEmail(email)) {
			this.setState({
				errors: { ...this.state.errors, emailErrMsg: 'Invalid email address' },
			});
			return;
		}

		// Validate no password
		if (!password.length) {
			this.setState({
				errors: {
					...this.state.errors,
					passwordErrMsg: 'Password required',
					emailErrMsg: null,
					loginErrMsg: null,
				},
			});
			return;
		}

		let data = {
			email,
			password,
		};

		apiUrl.post('/account/login', data).then(({data, status})=> {
			if (status === 200 && data.token) {
				this.setState(
					prevState => {
						return {
							...prevState,
							errors: {
								...prevState.errors,
								passwordErrMsg: null,
								emailErrMsg: null,
								loginErrMsg: null,
								nAttempt: 0,
							},
						};
					},
					() => {					
						this.saveAuthTokenInSession(data.token);
						this.props.authObj.authenticate(true);
						this.props.history.push('/dashboard');
					}
				);
			} else {
				if (this.state.errors.nAttempt < 5)
					this.setState(prevState => {
						let attempt = prevState.errors.nAttempt + 1;
						return {
							...prevState,
							errors: {
								...prevState.errors,
								passwordErrMsg: null,
								emailErrMsg: null,
								nAttempt: attempt,
								loginErrMsg: `Email or Password incorrect, ${attempt} of 5 attempts remaining`,
							},
						};
					});
				else
					this.setState(prevState => {
						return {
							...prevState,
							errors: {
								...prevState.errors,
								passwordErrMsg: null,
								emailErrMsg: null,
								loginErrMsg: `Your account blocked for 1 day`,
							},
						};
					});
			}
		});
	};

	renderErrorMessage = msg => {
		if (!msg?.length) return null;
		return <span style={{ color: 'red' }}>{msg}</span>;
	};

	renderResetPasswordPopup = (isVisible, email) => {
		if (!isVisible) return <></>;
		return (
			<ResetPasswordPopup
				email={email}
				isPopupVisible={isVisible}
				togglePopup={this.togglePopup}
			/>
		);
	};

	togglePopup = () => {
		this.setState({ isPopupVisible: !this.state.isPopupVisible });
	};

	render() {
		const { handleSubmit, renderErrorMessage, emailRef, passwordRef } = this;
		const { isPasswordVisible, errors } = this.state;
		const passwordFieldName = isPasswordVisible ? 'text' : 'password';
		const email = emailRef?.current?.value ? emailRef.current.value : null;
		const { isPopupVisible } = this.state;

		return (
			<Styles>
				<div className="logo-holder">
					<img src={hypaiq} alt="Hypaiq" />
				</div>
				<div className="content-box">
					<h1 className="first-row-title">Sign into your</h1>
					<h1 className="second-row-title">Account</h1>
					<form onSubmit={handleSubmit}>
						<br />
						<Label>Email {renderErrorMessage(errors.emailErrMsg)}</Label>
						<Input type="text" name="email" ref={emailRef} />
						<br />
						<br />
						<PasswordLabel>
							Password
							<span>
								{renderErrorMessage(errors.passwordErrMsg)}
								<FaEyeSlash
									style={{ marginLeft: 5, cursor: 'pointer' }}
									color={isPasswordVisible ? '#ccc' : ''}
									onClick={() =>
										this.setState({
											isPasswordVisible: !isPasswordVisible,
										})
									}
								/>
							</span>
						</PasswordLabel>
						<Input type={passwordFieldName} name="password" ref={passwordRef} />
						<br />
						<p className="reset-password-button" onClick={this.togglePopup}>
							Forgot password ?
						</p>
						<br />
						<p style={{ fontSize: '85%', textAlign: 'center' }}>
							{renderErrorMessage(errors.loginErrMsg)}
						</p>
						<Button>SIGN IN</Button>
						<br />
						Don't have an account ?
						<Link style={{ color: '#009999', marginLeft: 5 }} to="/signup">
							Sign up
						</Link>
					</form>
				</div>

				{this.renderResetPasswordPopup(isPopupVisible, email)}
			</Styles>
		);
	}
}

export default withRouter(Signin);

const Styles = styled.div`
	color: #676767;
	padding: 2% 5%;
	position: relative;
	button {
		border: 0;
	}
	input {
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
	justify-content: space-between;
`;
const PasswordLabel = styled.label`
	display: flex;
	justify-content: space-between;
	color: #676767;
`;
