import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import hypaiq from './../../exportables/hypaiq.png';
import { FaEyeSlash } from "react-icons/fa";
import { IconContext } from 'react-icons';
import axios from 'axios';
import { device } from '../../exportables/exportables'

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.match.params.email,
            password: "",
            passwordRef: React.createRef(),
            lengthError: null,
            SpecialError: null,
            numberError: null,
            uppError: null,
            charColor: "#b3b3b3",
            lengthColor: "#b3b3b3",
            specialColor: "#b3b3b3",
            numberColor: "#b3b3b3",
            uppColor: "#b3b3b3",
            showpassword: false,
            passwordError: null,
            focused: React.createRef(),
        }
    }
    componentDidUpdate() {
        this.state.passwordRef.current.value = this.state.password;
        if (this.state.focused.current) {
            this.state.focused.current.focus()
        }
        axios.get("http://34.253.224.180:18306/v1/uiobjects/styles")
			.then((res) => {
				this.setState({
					styles: res.data
				})
			}
			)
    }
    showpassword = () => {
        this.setState({
            showpassword: !this.state.showpassword,
            password: this.state.passwordRef.current.value,
        })
    }
    password = () => {
        this.setState({
            password: this.state.passwordRef.current.value,
        });
        if (this.state.passwordRef.current.value.length < 8) {
            this.setState({
                passwordError: true,
                lengthError: true,
                charColor: '#ff0000',
            });

        } else {
            this.setState({
                passwordError: false,
                lengthError: false,
                charColor: '#33cc33',
            });
        }
        if (this.state.passwordRef.current.value.search(/[0-9]/) < 0) {
            this.setState({
                passwordError: true,
                numberError: true,
                numberColor: '#ff0000',
            });

        } else {
            this.setState({
                passwordError: false,
                numberError: false,
                numberColor: '#33cc33',
            });
        }
        if (this.state.passwordRef.current.value.search(/[A-Z]/) < 0) {
            this.setState({
                passwordError: true,
                uppError: true,
                uppColor: '#ff0000',
            });

        } else {
            this.setState({
                passwordError: false,
                uppError: false,
                uppColor: '#33cc33',
            });
        }
        if (this.state.passwordRef.current.value.search(/[!#$%&@? ]/) < 0) {
            this.setState({
                passwordError: true,
                SpecialError: true,
                specialColor: '#ff0000',
            });

        } else {
            this.setState({
                passwordError: false,
                SpecialError: false,
                specialColor: '#33cc33',
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var err = false;
        this.setState({
            password: this.state.passwordRef.current.value
        })
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
                this.props.history.push("/")
                console.log(res)
            };
            xhr.onerror = function () {
                // Error code goes here.
            };
            xhr.send({ email: 'demo@gmail.com', password: 'Demo@123' });
        }
    }
    render() {
        const Chardiv = styled.div({
            backgroundColor: this.state.charColor,
            height: '1vh',
            width: '60px',
            borderRadius: 5,
        });

        const Numdiv = styled.div({
            backgroundColor: this.state.numberColor,
            height: '1vh',
            width: '60px',
            borderRadius: 5,
            marginLeft: '12px',
        });

        const Spcldiv = styled.div({
            backgroundColor: this.state.specialColor,
            height: '1vh',
            width: '60px',
            borderRadius: 5,
            marginLeft: '12px',
        });
        const Uppdiv = styled.div({
            backgroundColor: this.state.uppColor,
            height: '1vh',
            width: '60px',
            borderRadius: 5,
            marginLeft: '12px',
        });
        var email = sessionStorage.getItem('email')
        return (
            < Styles >
                <div className="logo-holder">
                    <img src={hypaiq} alt="Hypaiq" />
                </div>
                <div className="content-box">
                    <BlueH1 >Password reset for</BlueH1>
                    <GreenH1 >{email}</GreenH1>
                    <br /> <br />  <br /> <br /> <br /><br />
                    <form
                        onSubmit={this.handleSubmit}
                        id="RESTFORM"
                    >

                        <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Label >Password</Label>
                            {this.state.uppError || this.state.numberError || this.state.SpecialError || this.state.lengthError ? <Errortext>Strong password required</Errortext> : null}
                            <IconContext.Provider value={{ style: { fontSize: '15px', color: "#000000" } }}>
                                <div>
                                    <FaEyeSlash onClick={this.showpassword} />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <Input
                            id="password"
                            ref={this.state.passwordRef}
                            name="password" required
                            type={this.state.showpassword ? 'text' : 'password'}
                            onFocus={e => { this.state.focused = this.state.passwordRef }}
                            onChange={this.password}
                        />
                        <AgreeText>At least:</AgreeText>
                        <AgreeText>8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1 uppercase,&nbsp;&nbsp;&nbsp;1 special character</AgreeText>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                            <Chardiv /> <Numdiv /> <Uppdiv /> <Spcldiv />
                        </div>
                        <br />
                        <Button className="button" title="Reset" type={"submit"}>
                            Reset Password
                        </Button>
                        <br />
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
			margin-bottom: 50px;
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
				font-size: 11vw;
				margin: 0;
				font-weight: normal;
				color: #009999;
			}
			.second-row-title {
				margin: 0;
				font-size: 11vw;
				color: #000066;
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
    cursor: 'pointer',
});
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
const AgreeText = styled.p({
    fontSize: 12,
    marginTop: 0,
    color: '#090909',
});

const Label = styled.p({
    margin: 0,
});

const Errortext = styled.p({
    color: '#ff0000',
    margin: 0,
});