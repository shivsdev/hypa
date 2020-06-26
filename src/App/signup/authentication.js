import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';
import { device } from '../../exportables/exportables'
import Axios from 'axios';


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mail = urlParams.get("e");
const token = urlParams.get('t');
class Confirmation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			Redirect: null,
			emailRef: React.createRef(),
			emailError: null,
			styles: {}
		}
	}
	componentDidMount() {
		Axios.get("https://hypaiqauthapi.cyb.co.uk/v1/uiobjects/styles")
			.then((res) => {
				this.setState({
					styles: res.data
				})
			}
			)
	}

	resetpassword = () => {
		this.props.history.push('/reset-password')
	}


	render() {
		const title1_colour = "#009999";
		const title1_font_size = "";
		const title2_colour = "#000066";
		const title2_font_size = "";
		const body_text_colour = "#777";
		const label_text_colour = "#676767";
		const button_colour = "#009999";
		const button_text_colour = "#ffffff";
		const reset_password_button_colour = "#479a99";
		const input_font_size = "16px";
		const button_text_font_size = "18";
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
			width: 500px;
			margin: 0px auto;
			.first-row-title {
				font-size: calc(1em + 1.5vw);
				margin: 0;
				font-weight: normal;
				color: ${title1_colour};
			}
			.second-row-title {
				margin: 0;
				font-size: calc(1em + 2vw);
				color: ${title2_colour};
				font-weight: bolder;
			}
			.hypa-intro {
				margin-top:10px;
				font-size: calc(1em + 0.3vw);
				color: ${body_text_colour};
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
				width: 350px;
				width: 85%;
				margin: auto;
				margin-top: 2em;
				.first-row-title {
					font-size: 12vw;
					margin: 0;
					font-weight: normal;
					color: ${title1_colour};
				}
				.second-row-title {
					margin: 0;
					font-size: 12vw;
					color: ${title2_colour};
					font-weight: bolder;
				}
				form {
					margin: 50px 0;
				}
			}
		}
		
	`;
		const Button = styled.button({
			width: "60%",
			height: "40px",
			borderRadius: 5,
			backgroundColor: " #009999",
			borderWidth: 0,
			marginTop: 20,
			marginBottom: 20,
			color: "#FFFFFF",
			fontSize: "20px"
		})

		return (
			< Styles>
				<div className="logo-holder">
					<img src={hypaiq} alt="Hypaiq" />
				</div>
				<div className="content-box">
					<h1 className="second-row-title">Signup confirmation</h1>
					<h1 className="first-row-title"></h1>
					<p className="hypa-intro">
						To complete your account verification, please click on the link which is sent to your mail.
					</p>
					{/* <Button onClick={this.resetpassword}>Reset Link</Button> */}
				</div>
			</Styles >
		);
	}
}
export default withRouter(Confirmation);
