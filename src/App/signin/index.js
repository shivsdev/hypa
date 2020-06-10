import React, { Component } from 'react'
import styled from 'styled-components'
import hypaiq from './../../exportables/hypaiq.png';
import { Link } from 'react-router-dom';

class Signin extends Component {


	render() {
		const Body = styled.div({
			width: "100%",
			height: "100vh",
		})
		const Container = styled.div({
			width: "40%",
			borderWidth: 1,
			margin: "auto",
			paddingLeft: "12%",
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
		const Hypa = styled.text({
			fontSize: 80,
			marginLeft: "3%"
		})
		const Iq = styled.text({
			fontSize: 80,
			color: " #00e6e6"
		})
		const Button = styled.button({
			width: "70%",
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
			fontSize: 50,
			color: "#000066",
			fontWeight: "bolder"
		})
		const GreenH1 = styled.h1({
			fontSize: 60,
			margin: 0,
			fontWeight: "normal",
			color: "#009999",
		})
		const Input = styled.input({
			width: "70%",
			borderRadius: 5,
			height: "40px",
			borderWidth: 1,
			padding: 0
		})

		const AgreeText = styled.text({
			fontSize: 12,
			marginTop: 0,
			color: "#090909"
		})
		const Checkbox = styled.input({
			borderColor: "#009999"
		})
		const Greentext = styled.text({
			fontSize: 12,
			color: "#009999"
		})
		const Label = styled.text({
		})
		const Mediumtext = styled.text({
			fontSize: 20
		})
		const ForgotPass = styled.text({
			fontSize: 18,
			color: "#009999",
			textDecoration: "underline",
			alignItems: "flex-end",
			display: "flex"

		})
		const Logo = styled.img({
			marginLeft: "55px",
			marginTop: "52px"
		})

		return (
			< Body >
				<ContainerBox >
					<Logo src={hypaiq} />
					<Container >
						<GreenH1 >Sign into your</GreenH1>
						<BlueH1 >Account</BlueH1>


						<form>
							<br />
							<Label >Email</Label><br />
							<Input type="text" className="email" Label="Email" /><br />
							<br />
							<Label>Password</Label><br />
							<Input type="text" className="password" /><br />

							<Link style={{ fontSize: 15, color: "#009999", textDecoration: "underline", justifyContent: "flex-end", display: "flex", marginRight: "30%" }} to="/reset"> Forgot password?</Link><br />

							<br /><br />
							<Button className="button" title="Log in"  >
								<Buttontext >Sign Up</Buttontext>
							</Button>
							<br />
							<Mediumtext>Don't have an account?</Mediumtext>
							<Link style={{ fontSize: 20, color: "#009999", textDecoration: "none" }} to="/signup"> Sign up</Link>


						</form>
					</Container>
				</ContainerBox>
			</Body >
		)
	}
}

export default Signin;
