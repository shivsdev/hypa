import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import hypaiq from "./../../exportables/hypaiq.png";
import { FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
import { apiUrl } from "../calls/apis";
import { device } from "../../exportables/exportables";

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const mail = urlParams.get("e");
// const token = urlParams.get("t");
let mail = window.sessionStorage.getItem("email");
class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      code: "",
      passwordRef: React.createRef(),
      codeRef: React.createRef(),
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
    };
  }
  componentDidMount() {
    axios
      .get("https://hypaiqauthapi.cyb.co.uk/v1/uiobjects/styles")
      .then((res) => {
        this.setState({
          styles: res.data,
        });
      });
  }
  componentDidUpdate() {
    this.state.passwordRef.current.value = this.state.password;
    this.state.codeRef.current.value = this.state.code;
    if (this.state.focused.current) {
      this.state.focused.current.focus();
    }
  }

  showpassword = () => {
    this.setState({
      showpassword: !this.state.showpassword,
      password: this.state.passwordRef.current.value,
      code: this.state.codeRef.current.value,
    });
  };
  password = () => {
    this.setState({
      password: this.state.passwordRef.current.value,
      code: this.state.codeRef.current.value,
    });
    if (this.state.passwordRef.current.value.length < 8) {
      this.setState({
        passwordError: true,
        lengthError: true,
        charColor: "#ff0000",
      });
    } else {
      this.setState({
        passwordError: false,
        lengthError: false,
        charColor: "#33cc33",
      });
    }
    if (this.state.passwordRef.current.value.search(/[0-9]/) < 0) {
      this.setState({
        passwordError: true,
        numberError: true,
        numberColor: "#ff0000",
      });
    } else {
      this.setState({
        passwordError: false,
        numberError: false,
        numberColor: "#33cc33",
      });
    }
    if (this.state.passwordRef.current.value.search(/[A-Z]/) < 0) {
      this.setState({
        passwordError: true,
        uppError: true,
        uppColor: "#ff0000",
      });
    } else {
      this.setState({
        passwordError: false,
        uppError: false,
        uppColor: "#33cc33",
      });
    }
    if (
      this.state.passwordRef.current.value.search(
        /[\-\\!~`@#$%{^&*([)}_\+\=;:.,'"<>/?|\]]/
      ) < 0
    ) {
      this.setState({
        passwordError: true,
        SpecialError: true,
        specialColor: "#ff0000",
      });
    } else {
      this.setState({
        passwordError: false,
        SpecialError: false,
        specialColor: "#33cc33",
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let err = false;
    this.password();

    let password = this.state.passwordRef.current.value;
    let code = this.state.codeRef.current.value;
    if (code === "") {
      err = true;
      this.setState({ codeError: true });
    }
    if (this.state.passwordRef.current.value === "") {
      err = true;
    }
    if (!this.state.passwordError & !err) {
      let data = {
        email: mail,
        confrimationcode: code,
        password: password,
      };
      axios
        .post("https:hypaiqauthapi.cyb.co.uk/v1/auth/resetpassword", data)
        .then(({ status, data }) => {
          if ((status === 200) & (data.status === "success")) {
            this.props.history.push("/");
          }
        })
        .catch((err) => {
          alert("Email " + err.response.data.message);
        });
    }
  };
  render() {
    const title1_colour = "#009999";
    const title1_font_size = "60px";
    const title2_colour = "#000066";
    const title2_font_size = "50px";
    const input_border_colour = "#ccc";
    const error_text_colour = "#ff0000";
    const label_text_colour = "#676767";
    const button_colour = "#009999";
    const button_text_colour = "#ffffff";
    const agreee_text_colour = "#090909";
    const input_font_size = "16px";
    const button_text_font_size = "18";
    const Chardiv = styled.div({
      backgroundColor: this.state.charColor,
      height: "1vh",
      width: "60px",
      borderRadius: 5,
    });

    const Numdiv = styled.div({
      backgroundColor: this.state.numberColor,
      height: "1vh",
      width: "60px",
      borderRadius: 5,
      marginLeft: "12px",
    });

    const Spcldiv = styled.div({
      backgroundColor: this.state.specialColor,
      height: "1vh",
      width: "60px",
      borderRadius: 5,
      marginLeft: "12px",
    });
    const Uppdiv = styled.div({
      backgroundColor: this.state.uppColor,
      height: "1vh",
      width: "60px",
      borderRadius: 5,
      marginLeft: "12px",
    });
    const Styles = styled.div`
      padding: 2% 5%;
      .logo-holder {
        margin-bottom: 20px;
        img {
          width: 27.5%;
          max-width: 150px;
        }
      }
      .content-box {
        max-width: 350px;
        margin: 0px auto;
        padding-top: 200px;
        position: relative;
        .title-box {
          position: absolute;
          margin: 0 auto;
          width: 600px;
          top: 0;
          .first-row-title {
            font-size: 50px;
            margin: 0;
            font-weight: normal;
            color: ${title2_colour};
          }
          .second-row-title {
            margin: 0;
            font-size: 30px;
            color: ${title1_colour};
            font-weight: normal;
          }
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
          padding-top: 200px;
          .title-box {
            position: absolute;
            margin: 0 auto;
            width: 350px;
            top: 0;
            .first-row-title {
              font-size: 40px;
              margin: 0;
              font-weight: normal;
              color: ${title2_colour};
            }
            .second-row-title {
              margin: 0;
              font-size: 30px;
              color: ${title1_colour};
              font-weight: normal;
            }
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
      border: 1px solid ${input_border_colour};
      padding: 0px;
      outline: 0px;
      font-size: 16px;
      padding: 10px;
      box-sizing: border-box;
      margin-top: 3px;
      margin-bottom: 5px;
    `;

    const Button = styled.button({
      width: "100%",
      height: "40px",
      borderRadius: 5,
      backgroundColor: button_colour,
      borderWidth: 0,
      marginTop: 5,
      marginBottom: 20,
      color: button_text_colour,
      fontSize: 18,
      fontWeight: "bold",
      cursor: "pointer",
    });
    const AgreeText = styled.p({
      fontSize: 12,
      marginTop: 0,
      color: agreee_text_colour,
    });

    const Label = styled.p({
      margin: 0,
    });

    const Errortext = styled.p({
      color: error_text_colour,
      margin: 0,
    });

    return (
      <Styles>
        <div className="logo-holder">
          <img src={hypaiq} alt="Hypaiq" />
        </div>
        <div className="content-box">
          <div className="title-box">
            <h1 className="first-row-title">Password reset for</h1>
            <h1 className="second-row-title">{mail}</h1>
            <p className="hypa-intro">
              Enter your new password and the Verification code which is sent to
              your email
            </p>
          </div>
          <form onSubmit={this.handleSubmit} id="RESTFORM">
            <Label>Verification Code</Label>
            <Input
              ref={this.state.codeRef}
              name="code"
              id="code"
              className="code"
              defaultValue=""
            />
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
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
                value={{ style: { fontSize: "15px", color: "#000000" } }}
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
              type={this.state.showpassword ? "text" : "password"}
              onFocus={(e) => {
                this.state.focused = this.state.passwordRef;
              }}
              onChange={this.password}
            />
            <AgreeText>At least:</AgreeText>
            <AgreeText>
              8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1
              uppercase,&nbsp;&nbsp;&nbsp;1 special character
            </AgreeText>
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
      </Styles>
    );
  }
}

export default withRouter(Reset);
