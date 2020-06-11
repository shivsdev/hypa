import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';

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
			var config = {
				headers: { 'Access-Control-Allow-Origin': '*' }
			};
			axios
				.post('http://34.253.224.180:18306/register/index', {
					email: this.state.email,
					password: this.state.password,
				}, config)
				.then(function (response) {
					console.log(response);
					this.props.history.push("/home")
				}).catch(
					function (error) {
						console.log('Show error notification!')
						alert(error)
					}
				);
		}
	};

	render() {
		const Input = styled.input({
			width: '60%',
			borderRadius: 5,
			height: '40px',
			borderWidth: 1,
			padding: 0,
		});
		const Body = styled.div({
			width: '100%',
			height: '100vh',
		});
		const Container = styled.div({
			width: '30%',
			borderWidth: 1,
			marginLeft: '40%',
			flexDirection: 'row',
			borderColor: 'black',
		});

		const Button = styled.button({
			width: '60%',
			height: '40px',
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
			fontSize: "4vw",
			fontWeight: 'bolder',
			color: '#000066',
		});
		const GreenH1 = styled.h1({
			fontSize: "3vw",
			margin: 0,
			fontWeight: 'bolder',
			color: '#009999',
		});
		const AgreeText = styled.p({
			fontSize: ".6vw",
			margin: 0,
			color: '#090909',
		});
		const Checkbox = styled.input({
			borderColor: '#009999',
		});

		const Label = styled.p({
			fontSize: ".9vw",
			margin: 0,
		});
		const Mediumtext = styled.p({
			fontSize: "1vw",
			margin: 0
		});

		const Logo = styled.img({
			marginLeft: '55px',
			marginTop: '52px',
			width: "15%"
		});
		const Chardiv = styled.div({
			backgroundColor: this.state.charColor,
			height: '1vh',
			width: '11%',
			borderRadius: 5,
		});
		const Numdiv = styled.div({
			backgroundColor: this.state.numberColor,
			height: '1vh',
			width: '11%',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Spcldiv = styled.div({
			backgroundColor: this.state.specialColor,
			height: '1vh',
			width: '11%',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Uppdiv = styled.div({
			backgroundColor: this.state.uppColor,
			height: '1vh',
			width: '11%',
			borderRadius: 5,
			marginLeft: '12px',
		});
		const Errortext = styled.p({
			color: '#ff0000',
			margin: 0,
			fontSize: ".9vw",
		});
		return (
			<Body className="body-div">
				<Logo src={hypaiq} />
				<Container className="sadad">
					<BlueH1>Create a</BlueH1>
					<GreenH1>Free Account</GreenH1>
					<p style={{ fontSize: "1vw" }}>Hypal is a - multi line invitation text goes here</p>
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
								width: '60%',
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
								value={{ style: { fontSize: '15px', color: '#000000' } }}
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
								alignItems: 'baseline',
								flexDirection: 'row',
								display: 'flex',
							}}
						>
							<Checkbox
								type="checkbox"
								checked={this.state.checked}
								onChange={this.check}
							></Checkbox>
							<AgreeText> I have read and agree to the </AgreeText>
							<Link
								style={{
									fontSize: ".6vw",
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
						<div style={{ flexDirection: "row", display: "flex" }}>
							<Mediumtext>Already have an account?</Mediumtext>
							<Link style={{ fontSize: "1vw", color: '#009999' }} to="/">
								{' '}
								Sign in
							</Link>
						</div>
					</form>
				</Container>
			</Body>
		);
	}
}
export default withRouter(Signup)