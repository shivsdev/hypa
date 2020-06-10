import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { FaEyeSlash } from "react-icons/fa";
import { IconContext } from 'react-icons';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "hypal@gmail.com",
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
            showpassword: false
        }
    }
    componentDidUpdate() {
        this.state.passwordRef.current.value = this.state.password;
    }
    showpassword = () => {
        this.setState({
            showpassword: !this.state.showpassword,
            password: this.state.passwordRef.current.value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({

            password: this.state.passwordRef.current.value
        })
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
            borderStyle: "solid",
            marginTop: "40px"
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
        const Buttontext = styled.p({
            color: "#FFFFFF"
        })
        const BlueH1 = styled.h1({
            margin: 0,
            fontSize: 50,
            color: "#000066",
            fontWeight: "normal"
        })
        const GreenH1 = styled.h1({
            fontSize: 40,
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
        const AgreeText = styled.p({
            fontSize: 12,
            margin: 0,
            color: "#090909"
        })
        const Label = styled.p({
            margin: 0,
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
        const Logo = styled.img({
            marginLeft: "55px",
            marginTop: "52px"
        })
        const Errortext = styled.p({
            color: "#ff0000",
            margin: 0
        })
        return (
            < Body >
                <ContainerBox >
                    <Logo src={hypaiq} />
                    <Container >
                        <BlueH1 >Password reset for</BlueH1>
                        <GreenH1 >{this.state.email}</GreenH1>
                        <br /> <br />  <br /> <br /> <br /><br /><br /><br /><br />
                        <form
                        onSubmit={this.handleSubmit}
                        id="RESTFORM"
                        >

                            <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "70%" }}>
                                <Label >Password</Label>
                                {this.state.uppError || this.state.numberError || this.state.SpecialError || this.state.lengthError ? <Errortext>Strong password required</Errortext> : null}
                                <IconContext.Provider value={{ style: { fontSize: '15px', color: "#000000" } }}>
                                    <div>
                                        <FaEyeSlash onClick={this.showpassword} />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <Input id="password" ref={this.state.passwordRef} name="password" className="" type={this.state.showpassword ? 'text' : 'password'} />
                            <AgreeText>At least:</AgreeText>
                            <AgreeText>8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1 uppercase,&nbsp;&nbsp;&nbsp;1 special character</AgreeText>
                            <div style={{ flexDirection: "row", display: "flex" }}>
                                <Chardiv /> <Numdiv /> <Spcldiv /> <Uppdiv />
                            </div>
                            <br />
                            <Button className="button" title="Reset"  type={"submit"}>
                                <Buttontext >Reset Password</Buttontext>
                            </Button>
                            <br />
                        </form>
                    </Container>
                </ContainerBox>
            </Body >
        );
    }
}

export default ResetPassword;
