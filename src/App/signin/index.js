import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { Link, withRouter } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';

import { device } from '../../exportables/exportables';
import ResetPasswordPopup from './components/ResetPasswordPopup';
import { apiUrl } from '../calls/apis';
import axios from 'axios';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPasswordVisible: false,
			errors: {
				emailErrMsg: null,
				passwordErrMsg: null,
				loginErrMsg: null,
			},
			isPopupVisible: false,
			styles: {
				title1_colour: '#009999',
				title1_font_size: '60px',
				title2_colour: '#000066',
				title2_font_size: '50px',
				error_text_colour: '#ff0000',
				label_text_colour: '#676767',
				check_box_border_colour: '#009999',
				button_bg_colour: '#009999',
				button_text_colour: '#ffffff',
				button_text_font: '18px',
				password_passive_colour: '#b3b3b3',
				password_active_colour: '#33cc33',
				password_error_colour: '#ff0000',
				green_text_colour: '#009999',
				icon_passive_colour: '#ccc',
				input_font_size: '16px',
				input_border_colour: '#ccc',
				reset_password_button_colour: '#479a99',
			},
			email: '',
			password: '',
		};

		if (this.props.authObj.isAuthenticated)
			this.props.history.push('/dashboard');
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		let email = this.props.location.email ? this.props.location.email : '';
		this.setState({ email });
		axios.get('http://34.253.224.180:18306/v1/uiobjects/styles').then(res => {
			this.setState({
				styles: { ...this.state.styles, ...res.data },
			});
		});
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

	handleInput = target => {
		this.setState({ [target.name]: target.value });
	};

	handleShowPassword = () => {
		this.setState(
			{ isPasswordVisible: !this.state.isPasswordVisible },
			() => () => console.log('d', this.state)
		);
	};

	handleSubmit = e => {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
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
		let tempEmail = email;

		apiUrl
			.post('/account/login', data)
			.then(({ data, status }) => {
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
								},
							};
						},
						() => {
							window.sessionStorage.setItem('email', tempEmail);
							this.saveAuthTokenInSession(data.token);
							this.props.authObj.authenticate(true);
							this.props.history.push('/dashboard');
						}
					);
				}
			})
			.catch(err => {
				this.setState(prevState => {
					return {
						...prevState,
						errors: {
							...prevState.errors,
							passwordErrMsg: null,
							emailErrMsg: null,
							loginErrMsg: err.response.data.message,
						},
					};
				});
			});
	};

	ResetPassword = email => {
		this.togglePopup();
		window.sessionStorage.setItem('email', email);
		this.props.history.push('/reset');
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
				resetPassword={this.ResetPassword}
				styles={this.state.styles}
			/>
		);
	};
	togglePopup = () => {
		this.setState({ isPopupVisible: !this.state.isPopupVisible });
	};
	signup = () => {
		this.props.history.push({ pathname: '/signup', email: this.state.email });
	};
	render() {
		const title1_colour = '#009999';
		const title1_font_size = '';
		const title2_colour = '#000066';
		const title2_font_size = '';
		const error_text_colour = '#ff0000';
		const label_text_colour = '#676767';
		const button_colour = '#009999';
		const button_text_colour = '#ffffff';
		const reset_password_button_colour = '#479a99';
		const input_font_size = '16px';
		const button_text_font_size = '18';

		const {
			handleInput,
			handleShowPassword,
			handleSubmit,
			renderErrorMessage,
		} = this;
		const {
			isPasswordVisible,
			errors,
			email,
			password,
			isPopupVisible,
		} = this.state;
		const passwordFieldName = isPasswordVisible ? 'text' : 'password';

		const Button = styled.button({
			width: '100%',
			height: '40px',
			borderRadius: 5,
			backgroundColor: this.state.styles.button_bg_colour,
			borderWidth: 0,
			marginTop: 5,
			marginBottom: 20,
			color: this.state.styles.button_text_colour,
			fontSize: this.state.styles.button_text_font_size,
			fontWeight: 'bold',
			cursor: 'pointer',
		});
		const Label = styled.label`
			display: flex;
			color: ${label_text_colour};
			justify-content: space-between;
		`;
		const PasswordLabel = styled.label`
			display: flex;
			justify-content: space-between;
			color: ${label_text_colour};
		`;
		const width = window.innerWidth;

		return (
			<Styles theme={this.state.styles} width={width}>
				<div className="logo-holder">
					<img src={hypaiq} alt="Hypaiq" />
				</div>
				<div className="content-box">
					<h1 className="first-row-title">Sign into your</h1>
					<h1 className="second-row-title">Account</h1>
					<form onSubmit={handleSubmit}>
						<br />
						<Label>Email {renderErrorMessage(errors.emailErrMsg)}</Label>
						<input
							type="text"
							name="email"
							defaultValue={email}
							autoComplete="off"
							onChange={({ target }) => handleInput(target)}
						/>
						<br />
						<br />
						<PasswordLabel>
							Password
							<span>
								{renderErrorMessage(errors.passwordErrMsg)}
								<FaEyeSlash
									style={{ marginLeft: 5, cursor: 'pointer' }}
									color={isPasswordVisible ? '#ccc' : ''}
									onClick={handleShowPassword}
								/>
							</span>
						</PasswordLabel>
						<input
							type={passwordFieldName}
							name="password"
							defaultValue={password}
							onChange={({ target }) => handleInput(target)}
						/>
						<br />
						<p className="reset-password-button" onClick={this.togglePopup}>
							Forgot password ?
						</p>
						<br />
						<p
							style={{
								fontSize: '85%',
								textAlign: 'center',
								marginTop: '20px',
								marginBottom: '20px',
							}}
						>
							{renderErrorMessage(errors.loginErrMsg)}
						</p>
						<Button>SIGN IN</Button>
						<br />
						Don't have an account ?
						<span
							style={{
								color: '#009999',
								marginLeft: 5,
								cursor: 'pointer',
								textDecoration: 'underline',
							}}
							to="/"
							onClick={this.signup}
						>
							Sign up
						</span>
					</form>
				</div>

				{this.renderResetPasswordPopup(isPopupVisible, email)}
			</Styles>
		);
	}
}

export default withRouter(Signin);

const getResponsiveFontSize = (sizeinpx, width) => {
	let fontSize = parseInt(sizeinpx.substr(0, 2));
	let result = (fontSize / width) * 80 + 'vw';
	return result;
};
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
		border: 1px solid ${props => props.theme.input_border_colour};
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
			font-size: ${props =>
				getResponsiveFontSize(props.theme.title1_font_size, props.width)};
			margin: 0;
			font-weight: normal;
			color: ${props => props.theme.title1_colour};
		}
		.second-row-title {
			margin: 0;
			font-size: ${props =>
				getResponsiveFontSize(props.theme.title2_font_size, props.width)};
			color: ${props => props.theme.title2_colour};
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
				color: ${props => props.theme.reset_password_button_colour};
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
				font-size: ${props =>
					getResponsiveFontSize(props.theme.title1_font_size, props.width)};
				margin: 0;
				font-weight: normal;
				color: ${props => props.theme.title1_colour};
			}
			.second-row-title {
				margin: 0;
				font-size: ${props =>
					getResponsiveFontSize(props.theme.title2_font_size, props.width)};
				color: ${props => props.theme.title2_colour};
				font-weight: bolder;
			}
			form {
				margin: 50px 0;
			}
		}
	}
`;
