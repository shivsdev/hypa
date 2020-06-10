import React, { Component } from 'react';
import hypaiq from './../../exportables/hypaiq.png';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';

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
            this.props.history.push("/reset-password/" + this.state.emailRef.current.value)
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
            minHeight: "100%",
            margin: "auto",
            borderColor: "#000000",
            borderWidth: 1,
            verticalAlign: "middle",
            borderStyle: "solid"
        })

        const Button = styled.button({
            width: "90%",
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
            fontWeight: "bolder",
            color: "#000066"
        })
        const GreenH1 = styled.h1({
            fontSize: 40,
            margin: 0,
            fontWeight: "bolder",
            color: "#009999"
        })

        const Label = styled.p({
            margin: 0,
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
            < Body className="body-div">
                <ContainerBox className="asdad" >
                    <Logo src={hypaiq} />
                    <Container className="sadad">
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
                            <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "90%" }}>
                                <Label >Email</Label>
                                {this.state.emailError ? <Errortext>invalid email format</Errortext> : null}
                            </div>
                            <Input ref={this.state.emailRef} name="email" id="email" className="" /><br />
                            <br />

                            <Button className="button" title="Log in" type={"submit"} >
                                <Buttontext >Next</Buttontext>
                            </Button>

                        </form>
                    </Container>
                </ContainerBox>
            </Body >
        );
    }
}
export default withRouter(Reset);