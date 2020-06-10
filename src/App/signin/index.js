import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

class Signin extends Component {
	constructor(props) {
		super(props)
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

		this.props.tempAuth.authenticate()
		this.props.history.push('/dashboard')
		// axios.post('http://34.253.224.180:18306/register/signin', data)
		// .then(({data}) => {
		// 	if(data.status === 200) {
		// 	}
		// })
	};
	render() {
		const passwordFieldType = this.state.isPasswordVisible ? 'text' : 'password';
		return (
			<div>
				<Logo src={hypaiq} />
				<Container>
					<GreenH1>Sign into your</GreenH1>
					<BlueH1>Account</BlueH1>

					<form
						onSubmit={this.handleSubmit}
						style={{ marginTop: 100, marginBottom: 100 }}
					>
						<br />
						<Label>Email</Label>

						<Input type="text" name="email" required ref={this.emailRef} />
						<br />
						<br />
						<PasswordLabel>
							<span>Password</span> <FaEyeSlash />
						</PasswordLabel>
						<Input
							type={passwordFieldType}
							name="password"
							ref={this.passwordRef}
							required
						/>
						<br />

						<Link
							style={{
								fontSize: 15,
								color: '#009999',
								textDecoration: 'underline',
								justifyContent: 'flex-end',
								display: 'flex',
							}}
							to="/reset"
						>
							Forgot password?
						</Link>
						<br />
						<br />
						<br />
						<Button>SIGN IN</Button>
						<br />
						Don't have an account ?  <Link
							style={{ color: '#009999', textDecoration: 'none' }}
							to="/signup"
						>
							Sign up
						</Link>
					</form>
				</Container>
			</div>
		);
	}
}

export default Signin;

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
	cursor: 'pointer'
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
