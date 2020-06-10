import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';

class ResetPassword extends Component {
    render() {
        const Body = styled.div({
            width: "100%",
            height: "100vh",
        })
        const Container = styled.div({

            width: "60%",
            borderWidth: 1,
            marginLeft: "25%",
            paddingLeft: "12%",
            flexDirection: "row",
            borderColor: "black",
            marginTop: "10px"
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
            width: "45%",
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
            color: "#000066",
            fontWeight: "normal"
        })
        const GreenH1 = styled.h1({
            fontSize: 60,
            margin: 0,
            fontWeight: "normal",
            color: "#009999",
        })
        const Input = styled.input({
            width: "45%",
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
        const MediumtextGreen = styled.text({
            fontSize: 20,
            color: "#009999"
        })
        const ForgotPass = styled.text({
            fontSize: 18,
            color: "#009999",
            textDecoration: "underline",
            alignItems: "flex-end",
            display: "flex"

        })
        const Chardiv = styled.div({
            backgroundColor: "#b3b3b3",
            height: "1vh",
            width: "60px",
            borderRadius: 5
        })
        const Numdiv = styled.div({
            backgroundColor: "#b3b3b3",
            height: "1vh",
            width: "60px",
            borderRadius: 5,
            marginLeft: "12px"
        })
        const Spcldiv = styled.div({
            backgroundColor: "#33cc33",
            height: "1vh",
            width: "60px",
            borderRadius: 5,
            marginLeft: "12px"
        })
        const Uppdiv = styled.div({
            backgroundColor: "#ff0000",
            height: "1vh",
            width: "60px",
            borderRadius: 5,
            marginLeft: "12px"
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
                        <BlueH1 >Password reset for</BlueH1>
                        <GreenH1 >email</GreenH1>
                        <br /> <br />  <br /> <br /> <br /><br /><br />
                        <form>

                            <Label>Password</Label><br />
                            <Input type="text" className="password" /><br />
                            <AgreeText>At least:</AgreeText><br />
                            <AgreeText>8 characters,&nbsp;&nbsp;&nbsp;1 number,&nbsp;&nbsp;&nbsp;1 uppercase,&nbsp;&nbsp;&nbsp;1 special character</AgreeText><br />
                            <div style={{ flexDirection: "row", display: "flex" }}>
                                <Chardiv /> <Numdiv /> <Spcldiv /> <Uppdiv />
                            </div>
                            <br /><br /><br />
                            <Button className="button" title="Log in"  >
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
