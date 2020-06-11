import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';
import { device } from '../../exportables/exportables'

let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            Redirect: null,
            emailRef: React.createRef(),
            emailError: null,
        }
    }

    componentDidUpdate() {
        this.state.emailRef.current.value = this.state.email;
    }


    handleSubmit = (event) => {
        event.preventDefault();
        var err = false
        this.setState({
            email: this.state.emailRef.current.value,
        })
        if (emailValidate.test(this.state.emailRef.current.value) === false) {
            this.setState({
                emailError: true
            })
            err = true;
        } else {
            this.setState({
                emailError: false
            })
        }

        if (!err) {
            var createCORSRequest = (method, url) => {
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr) {
                    // Most browsers.
                    xhr.open(method, url, true);
                } else if (typeof window.XDomainRequest != "undefined") {
                    // IE8 & IE9
                    xhr = new window.XDomainRequest();
                    xhr.open(method, url);
                } else {
                    // CORS not supported.
                    xhr = null;
                }
                return xhr;
            };
            var url = 'http://34.253.224.180:18306/register/index';
            var method = 'POST';
            var xhr = createCORSRequest(method, url);

            xhr.onload = (res) => {
                this.props.history.push("/reset-password/" + this.state.emailRef.current.value)
                console.log(res)
            };

            xhr.onerror = function () {
                // Error code goes here.
            };

            xhr.send({ email: 'demo@gmail.com', password: 'Demo@123' });

        }
    }

    render() {
        const Input = styled.input({
            width: "100%",
            borderRadius: 5,
            height: "40px",
            borderWidth: 1,
            padding: 0
        })

        const Button = styled.button({
            width: "100%",
            height: "40px",
            borderRadius: 5,
            backgroundColor: " #009999",
            borderWidth: 0,
            marginTop: 5,
            marginBottom: 20
        })
        const Buttontext = styled.p({
            color: "#FFFFFF"
        })
        const BlueH1 = styled.h1({
            margin: 0,
            fontSize: 60,
            color: '#000066',
            fontWeight: 'bolder',
        });
        const GreenH1 = styled.h1({
            fontSize: 50,
            margin: 0,
            fontWeight: 'bolder',
            color: '#009999',
        });
        const Label = styled.p({
            margin: 0,
        });

        const Errortext = styled.p({
            color: "#ff0000",
            margin: 0,
        })
        return (
            < Styles>
                <div className="logo-holder">
                    <img src={hypaiq} alt="Hypaiq" />
                </div>
                <div className="content-box">
                    <BlueH1 >Enter your</BlueH1>
                    <GreenH1 >Email</GreenH1>

                    <form
                        onSubmit={this.handleSubmit}
                        id="SIGINFORM"
                    >
                        <br />
                        <br />
                        <br />
                        <br />
                        <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "60%" }}>
                            <Label >Email</Label>
                            {this.state.emailError ? <Errortext>invalid email format</Errortext> : null}
                        </div>
                        <Input ref={this.state.emailRef} required name="email" id="email" className="" /><br />
                        <br />
                        <Button className="button" title="Log in" type={"submit"} >
                            <Buttontext >Next</Buttontext>
                        </Button>

                    </form>
                </div>
            </Styles >
        );
    }
}
export default withRouter(Reset);
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