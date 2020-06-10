import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
	state = {
		email: '',
		password: '',
	};
	signin() {}
	render() {
		return (
			<Body>
				<ContainerBox>
					<Logo src={hypaiq} />
					<Container>
						<BlueH1>Create a</BlueH1>
						<GreenH1>Free Account</GreenH1>
						<text>Hypal is a - multi line invitation text goes here</text>
						<form>
							<br />
							<Label>Email</Label>
							<Input type="text" className="email" Label="Email" />
							<br />
							<br />
							<Label>Password</Label>
							<Input type="text" className="password" />
							<br />
							<AgreeText>At least:</AgreeText>
							<br />
							<AgreeText>
								8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1
								uppercase,&nbsp;&nbsp;&nbsp;1 special character
							</AgreeText>
							<br />
							<div style={{ flexDirection: 'row', display: 'flex' }}>
								<Chardiv /> <Numdiv /> <Spcldiv /> <Uppdiv />
							</div>
							<br />
							<div style={{ alignItems: 'baseline' }}>
								<Checkbox type="checkbox"></Checkbox>
								<AgreeText> I have read and agree to the </AgreeText>
								<Link
									style={{
										fontSize: 12,
										color: '#009999',
										textDecoration: 'none',
									}}
									to="/agreement"
								>
									HypalQ User Agreement
								</Link>
								<br />
							</div>
							<Button className="button" title="Log in">
								<Buttontext>Sign Up</Buttontext>
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
