import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';
import { device } from '../../exportables/exportables'
import Axios from 'axios';
import { apiUrl } from '../calls/apis';
import Spinner from './../dashboard/components/Spinner.jsx'


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mail = urlParams.get("e");
const token = urlParams.get('t');
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            Redirect: null,
            emailRef: React.createRef(),
            emailError: null,
            styles: {},
            isverified: false
        }
    }
    componentDidMount() {
        this.setState({
            isverified: false
        })
        Axios.get("http://34.253.224.180:18306/v1/uiobjects/styles")
            .then((res) => {
                this.setState({
                    styles: res.data
                })
            }
            )
        let data = {
            email: mail,
            token: token,
        };
        apiUrl
            .post('/account/verifyemail', data)
            .then(({ status, data }) => {
                if ((status === 200) & (data.status === 'success')) {
                    this.setState({
                        isverified: true
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isverified: true
                })
                alert('Email ' + err.response.data.message);

            });
    }


    verifyAccount = () => {
        this.props.history.push('/');
    }


    render() {
        if (!this.state.isverified) {
            let msg = 'loading';
            return <Spinner msg={msg} />;
        }
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
				font-size: calc(1em + 1vw);
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
                    <h1 className="second-row-title">Account Verification</h1>
                    <h1 className="first-row-title">{mail}</h1>
                    <p className="hypa-intro">
                        Your account has been verified please click login to login into your account.
					</p>
                    <div style={{ height: "100px" }}></div>
                    <Button onClick={this.verifyAccount}>Login</Button>
                </div>
            </Styles >
        );
    }
}
export default withRouter(VerifyEmail);
