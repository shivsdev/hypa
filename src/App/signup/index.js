import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let PasswordLength = /^(?=.{8,})$/;

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			emailRef: React.createRef(),
			passwordRef: React.createRef(),
			emailError: null,
			lengthError: null,
			SpecialError: null,
			numberError: null,
			uppError: null,
			charColor: "#b3b3b3",
			lengthColor: "#b3b3b3",
			specialColor: "#b3b3b3",
			numberColor: "#b3b3b3",
			uppColor: "#b3b3b3",
			showpassword:false

		}
		// this.handleEmail = this.handleEmail.bind(this);
		// this.handlePassword = this.handlePassword.bind(this);
	}
	componentDidUpdate() {
		this.state.emailRef.current.value = this.state.email;
		this.state.passwordRef.current.value = this.state.password;
		// document.getElementById("email").value = this.state.email;
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({
			email: this.state.emailRef.current.value,
			password: this.state.passwordRef.current.value
		})

		if (emailValidate.test(this.state.emailRef.current.value) === false) {
			this.setState({
				emailError: true
			})
		} else {
			this.setState({
				emailError: false
			})
		}
		if (this.state.passwordRef.current.value.length < 8) {
			this.setState({
				lengthError: true,
				charColor: "#ff0000"
			})
		} else {

			this.setState({
				lengthError: false,
				charColor: "#33cc33"
			})
		}
		if (this.state.passwordRef.current.value.search(/[0-9]/) < 0) {
			this.setState({
				numberError: true,
				numberColor: "#ff0000"
			})
		} else {

			this.setState({
				numberError: false,
				numberColor: "#33cc33"
			})
		}
		if (this.state.passwordRef.current.value.search(/[A-Z]/) < 0) {
			this.setState({
				uppError: true,
				uppColor: "#ff0000"
			})
		} else {

			this.setState({
				uppError: false,
				uppColor: "#33cc33"
			})
		}
		if (this.state.passwordRef.current.value.search(/[!#$%&@? ]/) < 0) {
			this.setState({
				SpecialError: true,
				specialColor: "#ff0000"
			})
		} else {

			this.setState({
				SpecialError: false,
				specialColor: "#33cc33"
			})
		}





	}


	render() {
		const Input = styled.input({
			width: "90%",
			borderRadius: 5,
			height: "40px",
			borderWidth: 1,
			padding: 0
		})
		const Body = styled.div({
			width: "100%",
			height: "100vh",
		})
		const Container = styled.div({
			width: "30%",
			borderWidth: 1,
			margin: "auto",
			flexDirection: "row",
			borderColor: "black"
		})
		const ContainerBox = styled.div({
			width: "63%",
			height: "100%",
			margin: "auto",
			borderColor: "#000000",
			borderWidth: 1,
			verticalAlign: "middle",
			borderStyle: "solid"
		})

		const Button = styled.button({
			width: "80%",
			height: "40px",
			borderRadius: 5,
			backgroundColor: " #009999",
			borderWidth: 0,
			marginTop: 5,
			marginBottom: 20
		})
		const Buttontext = styled.text({
			color: "#FFFFFF"
		})
		const BlueH1 = styled.h1({
			margin: 0,
			fontSize: 60,
			fontWeight: "bolder",
			color: "#000066"
		})
		const GreenH1 = styled.h1({
			fontSize: 40,
			margin: 0,
			fontWeight: "bolder",
			color: "#009999"
		})
		const AgreeText = styled.text({
			fontSize: 12,
			marginTop: 0,
			color: "#090909"
		})
		const Checkbox = styled.input({
			borderColor: "#009999"
		})

		const Label = styled.text({
		})
		const Mediumtext = styled.text({
			fontSize: 20
		})

		const Logo = styled.img({
			marginLeft: "55px",
			marginTop: "52px"
		})
		const Chardiv = styled.div({
			backgroundColor: this.state.charColor,
			height: "1vh",
			width: "60px",
			borderRadius: 5
		})
		const Numdiv = styled.div({
			backgroundColor: this.state.numberColor,
			height: "1vh",
			width: "60px",
			borderRadius: 5,
			marginLeft: "12px"
		})
		const Spcldiv = styled.div({
			backgroundColor: this.state.specialColor,
			height: "1vh",
			width: "60px",
			borderRadius: 5,
			marginLeft: "12px"
		})
		const Uppdiv = styled.div({
			backgroundColor: this.state.uppColor,
			height: "1vh",
			width: "60px",
			borderRadius: 5,
			marginLeft: "12px"
		})
		const Errortext = styled.div({
			color: "#ff0000"
		})
		return (
			< Body className="body-div">
				<ContainerBox className="asdad" >
					<Logo src={hypaiq} />
					<Container className="sadad">
						<BlueH1 >Create a</BlueH1>
						<GreenH1 >Free Account</GreenH1>
						<text>
							Hypal is a - multi line invitation text goes here
	</text>

						<form
							onSubmit={this.handleSubmit}
							id="SIGINFORM"
						>
							<br />
							<div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "90%" }}>
								<Label >Email</Label>
								{this.state.emailError ? <Errortext>invalid email format</Errortext> : null}
							</div>
							<Input ref={this.state.emailRef} name="email" id="email" className="" /><br />
							<br />
							<div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "90%" }}>
								<Label >Password</Label>
								{this.state.uppError || this.state.numberError || this.state.SpecialError || this.state.lengthError ? <Errortext>Strong password required</Errortext> : null}
							</div>
							<Input id="password" ref={this.state.passwordRef} name="password" className="" type={this.state.showpassword?'text':'password'}/><br />

							<AgreeText>At least:</AgreeText><br />
							<AgreeText>8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1 uppercase,&nbsp;&nbsp;&nbsp;1 special character</AgreeText><br />
							<div style={{ flexDirection: "row", display: "flex" }}>
								<Chardiv /> <Numdiv /> <Uppdiv /><Spcldiv />
							</div>
							<br />
							<div style={{ alignItems: 'baseline' }}>
								<Checkbox type="checkbox"></Checkbox>
								<AgreeText > I have read and agree to the </AgreeText>
								<Link style={{ fontSize: 12, color: "#009999", textDecoration: "none" }} to="/agreement">HypalQ User Agreement</Link><br />
							</div>
							<Button className="button" title="Log in" type={"submit"} >
								<Buttontext >Sign Up</Buttontext>
							</Button>
							<br />
							<Mediumtext>Already have an account?</Mediumtext>
							<Link style={{ fontSize: 20, color: '#009999' }} to="/">
								Sign in
							</Link>
						</form>
					</Container>
				</ContainerBox>
			</Body>
		);
	}
}

const Body = styled.div({
	width: '100%',
	height: '100vh',
});
const Container = styled.div({
	width: '30%',
	borderWidth: 1,
	margin: 'auto',
	flexDirection: 'row',
	borderColor: 'black',
});
const ContainerBox = styled.div({
	width: '63%',
	height: '100%',
	margin: 'auto',
	borderColor: '#000000',
	borderWidth: 1,
	verticalAlign: 'middle',
	borderStyle: 'solid',
});
const Hypa = styled.text({
	fontSize: 80,
	marginLeft: '3%',
});
const Iq = styled.text({
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
});
const Buttontext = styled.text({
	color: '#FFFFFF',
});
const BlueH1 = styled.h1({
	margin: 0,
	fontSize: 60,
	fontWeight: 'bolder',
	color: '#000066',
});
const GreenH1 = styled.h1({
	fontSize: 40,
	margin: 0,
	fontWeight: 'bolder',
	color: '#009999',
});
const Input = styled.input({
	width: '100%',
	borderRadius: 5,
	height: '40px',
	borderWidth: 1,
	padding: 0,
});

const AgreeText = styled.text({
	fontSize: 12,
	marginTop: 0,
	color: '#090909',
});
const Checkbox = styled.input({
	borderColor: '#009999',
});
const Greentext = styled.text({
	fontSize: 12,
	color: '#009999',
});
const Label = styled.text({});
const Mediumtext = styled.text({
	fontSize: 20,
});
const MediumtextGreen = styled.text({
	fontSize: 20,
	color: '#009999',
});
const Logo = styled.img({
	marginLeft: '55px',
	marginTop: '52px',
});
const Chardiv = styled.div({
	backgroundColor: '#b3b3b3',
	height: '1vh',
	width: '60px',
	borderRadius: 5,
});
const Numdiv = styled.div({
	backgroundColor: '#b3b3b3',
	height: '1vh',
	width: '60px',
	borderRadius: 5,
	marginLeft: '12px',
});
const Spcldiv = styled.div({
	backgroundColor: '#33cc33',
	height: '1vh',
	width: '60px',
	borderRadius: 5,
	marginLeft: '12px',
});
const Uppdiv = styled.div({
	backgroundColor: '#ff0000',
	height: '1vh',
	width: '60px',
	borderRadius: 5,
	marginLeft: '12px',
});
