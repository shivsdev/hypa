import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';

import hypaiq from './../../exportables/hypaiq.png';
import { device } from '../../exportables/exportables';
import { apiUrl } from '../calls/apis';

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
			focused: React.createRef(),
			passwordError: false,
			checkedError: false,
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
				button_text_font_size: '18px',
				password_passive_colour: '#b3b3b3',
				password_active_colour: '#33cc33',
				password_error_colour: '#ff0000',
				green_text_colour: '#009999',
				icon_passive_colour: '#ccc',
			},
		};
		if (this.props.authObj.isAuthenticated)
			this.props.history.push('/dashboard');
	}


	componentDidMount() {
		axios.get("https://hypaiqauthapi.cyb.co.uk/v1/uiobjects/styles")
			.then((res) => {
				console.log("doneasdas")
				this.setState({
					styles: { ...this.state.styles, ...res.data }
				})
			}
			)

		window.scrollTo(0, 0);
	}

	componentDidMount() {
		let email = this.props.location.email ? this.props.location.email : '';
		this.setState({ email });
	}

	componentDidUpdate(prevProps) {
		this.state.emailRef.current.value = this.state.email;
		this.state.passwordRef.current.value = this.state.password;
		if (this.state.focused.current) {
			this.state.focused.current.focus();
		}
	}

	showpassword = () => {
		this.setState({
			showpassword: !this.state.showpassword,
			password: this.state.passwordRef.current.value,
			email: this.state.emailRef.current.value,
		});
	};

	check = () => {
		if (this.state.checked) {
			this.setState({
				checkedError: true,
			});
		} else {
			this.setState({
				checkedError: false,
			});
		}
		this.setState({
			checked: !this.state.checked,
			password: this.state.passwordRef.current.value,
			email: this.state.emailRef.current.value,
		});
	};

	password = () => {
		this.setState({
			password: this.state.passwordRef.current.value,
			email: this.state.emailRef.current.value,
		});
		if (this.state.passwordRef.current.value.length < 8) {
			this.setState({
				passwordError: true,
				lengthError: true,
				charColor: this.state.styles.password_error_colour,
			});
		} else {
			this.setState({
				passwordError: false,
				lengthError: false,
				charColor: this.state.styles.password_active_colour,
			});
		}
		if (this.state.passwordRef.current.value.search(/[0-9]/) < 0) {
			this.setState({
				passwordError: true,
				numberError: true,
				numberColor: this.state.styles.password_error_colour,
			});
		} else {
			this.setState({
				passwordError: false,
				numberError: false,
				numberColor: this.state.styles.password_active_colour,
			});
		}
		if (this.state.passwordRef.current.value.search(/[A-Z]/) < 0) {
			this.setState({
				passwordError: true,
				uppError: true,
				uppColor: this.state.styles.password_error_colour,
			});
		} else {
			this.setState({
				passwordError: false,
				uppError: false,
				uppColor: this.state.styles.password_active_colour,
			});
		}
		if (this.state.passwordRef.current.value.search(/[!#$%&@? ]/) < 0) {
			this.setState({
				passwordError: true,
				SpecialError: true,
				specialColor: this.state.styles.password_error_colour,
			});
		} else {
			this.setState({
				passwordError: false,
				SpecialError: false,
				specialColor: this.state.styles.password_active_colour,
			});
		}
	};

	saveAuthTokenInSession = token => {
		window.sessionStorage.setItem('token', token);
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
		this.password();

		if (!err & !this.state.passwordError) {
			if (this.state.checked === false) {
				this.setState({
					checkedError: true,
				});
			} else {
				this.setState({
					checkedError: false,
				});
			}
			if (this.state.checked) {
				let data = {
					email: this.state.email,
					password: this.state.password,
				};
				apiUrl
					.post('/account/register', data)
					.then(({ status, data }) => {
						if ((status === 200) & (data.status === 'success')) {
							this.props.history.push('/email-verification');
						}
					})
					.catch(err => {
						alert('Email ' + err.response.data.message);
					});
			}
		}
	};

	redirectToSignin = () => {
		this.props.history.push({
			pathname: '/',
			email: this.state.emailRef.current.value,
		});
	};

	render() {
		const { redirectToSignin } = this;
		const width = window.innerWidth;
		const Button = styled.button({
			width: '100%',
			height: '40px',
			borderRadius: 5,
			backgroundColor: this.state.styles.button_bg_colour,
			borderWidth: 0,
			marginTop: 5,
			marginBottom: 20,
			color: this.state.styles.button_text_colour,
			fontSize: this.state.styles.button_text_font,
			fontWeight: 'bold',
			cursor: 'pointer',
		});
		const Chardiv = styled.div({
			backgroundColor: this.state.charColor,
			height: '10px',
			width: '60px',
			borderRadius: 5,
		});

		const Numdiv = styled.div({
			backgroundColor: this.state.numberColor,
			height: '10px',
			width: '60px',
			borderRadius: 5,
			marginLeft: '12px',
		});

		const Spcldiv = styled.div({
			backgroundColor: this.state.specialColor,
			height: '10px',
			width: '60px',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Uppdiv = styled.div({
			backgroundColor: this.state.uppColor,
			height: '10px',
			width: '60px',
			borderRadius: 5,
			marginLeft: '12px',
		});

		const AgreeText = styled.p({
			fontSize: 12,
			marginTop: 0,
		});
		const Checkbox = styled.input({
			borderColor: this.state.styles.button_text_colour,
		});

		const Label = styled.p({
			margin: 0,
			color: this.state.styles.label_text_colour,
		});

		const Errortext = styled.p({
			color: this.state.styles.error_text_colour,
			margin: 0,
		});
		if (this.state.styles === null) {
			return <div></div>;
		}

		return (
			<Styles theme={this.state.styles} width={width}>
				<div className="logo-holder">
					<img src={hypaiq} alt="Hypaiq" />
				</div>
				<div className="content-box">
					<h1 className="first-row-title">Create a</h1>
					<h1 className="second-row-title">Free Account</h1>
					<p className="hypa-intro">
						HypaIQ is a - multi line invitation text goes here, some nice words
						about us and what a great product this is. Get yours today!
					</p>
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
							<IconContext.Provider value={{ style: { fontSize: '15' } }}>
								<div>
									<FaEyeSlash
										onClick={this.showpassword}
										color={
											this.state.showpassword
												? this.state.styles.icon_passive_colour
												: ''
										}
									/>
								</div>
							</IconContext.Provider>
						</div>
						<Input
							id="password"
							ref={this.state.passwordRef}
							name="password"
							onFocus={e => {
								this.state.focused = this.state.passwordRef;
							}}
							onChange={this.password}
							type={this.state.showpassword ? 'text' : 'password'}
						/>
						<br />
						<AgreeText style={{ marginTop: 5, marginBottom: 3 }}>
							At least:
						</AgreeText>
						<AgreeText style={{ whiteSpace: 'nowrap' }}>
							8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1
							uppercase,&nbsp;&nbsp;&nbsp;1 special character
						</AgreeText>
						<div style={{ flexDirection: 'row', display: 'flex' }}>
							<Chardiv /> <Numdiv /> <Uppdiv />
							<Spcldiv />
						</div>
						<br />
						{this.state.checkedError ? (
							<Errortext>Please agree to User agreement</Errortext>
						) : null}
						<div className="terms-content">
							<Checkbox
								type="checkbox"
								checked={this.state.checked}
								onChange={this.check}
								id="checkbox"
							></Checkbox>
							<label
								htmlFor="checkbox"
								style={{ fontSize: '80%', marginLeft: 5 }}
							>
								I have read and agree to the
								<Link
									className="terms-link"
									style={{
										color: this.state.styles.green_text_colour,
										textDecoration: 'none',
									}}
									to="/user-agreement"
								>
									&nbsp;HypalQ User Agreement
								</Link>
							</label>

							<br />
						</div>
						<Button type="submit">Sign Up</Button>
						<br />
						<span>Already have an account ? </span>
						<span
							style={{
								color: this.state.styles.green_text_colour,
								textDecoration: 'underline',
								cursor: 'pointer',
							}}
							onClick={redirectToSignin}
						>
							Sign in
						</span>
					</form>
				</div>
			</Styles>
		);
	}
}
export default withRouter(Signup);
const getResponsiveFontSize = (sizeinpx, width) => {
	let fontSize = parseInt(sizeinpx.substr(0, 2));
	let result = (fontSize / width) * 80 + 'vw';
	return result;
};
const Styles = styled.div`
	padding: 2% 5%;
	color: #676767;
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
			margin-bottom: 50px;
			.terms-content {
				display: flex;
				align-items: center;
				input {
					margin: 0;
				}
			}
		}
		.hypa-intro {
			font-size: calc(1em + 0.3vw);
			color: #777;
			font-weight: 500;
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
			.terms-link {
				display: block;
				margin-left: 20px;
			}
		}
	}
`;

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
