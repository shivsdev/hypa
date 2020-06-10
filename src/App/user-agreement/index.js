import React, { Component } from 'react'
import styled from 'styled-components';
import hypaiq from './../../exportables/hypaiq.png';
import { Link } from 'react-router-dom';

class UserAgreement extends Component {


    render() {
        const Body = styled.div({
            width: "100%",
            height: "100vh",
        })
        const Container = styled.div({
            width: "90%",
            borderWidth: 1,
            margin: "auto",

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
            marginTop:"2%"
        })
        const Hypa = styled.text({
            fontSize: 80,
            marginLeft: "3%",
            paddingLeft: "5%",
        })
        const Iq = styled.text({
            fontSize: 80,
            color: " #00e6e6"
        })
        const Button = styled.button({
            width: "25%",
            height: "40px",
            borderRadius: 5,
            backgroundColor: " #009999",
            borderWidth: 0,
            marginTop: 5,
            marginBottom: 20,
            right: 0,
            marginLeft: "70%"
        })
        const Buttontext = styled.text({
            color: "#FFFFFF",
            fontWeight: "bolder"
        })
        const BlueH1 = styled.h1({
            margin: 0,
            fontSize: 50,
            color: "#000066",
            fontWeight: "bolder",
            textAlign: "center"
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
                        <BlueH1 >User Agreement</BlueH1>
                        <br />
                        <br />
                        <div style={{ maxHeight: "50vh", overflow: "auto", width: "100%" }}>
                            <text>
                                This document provides a top level specification for Version 3.x of the HypaIQ Software Suit.
                                This version of the document should be considered a very early draft and whilst its overall format attempts to cover the complete system,
                                in reality only the sections covering the core Form builder, together with the underlying scripting language contain any real level of detail.
                                This document is subject to continuous revision and will be updated as the system design evolves.

                                It is important to realise that in places this document provides detail on components and component functionality beyond the initial V3.0 release.
                                This is provided in order that the reader can better understand the context of the V3.0 components and their role in the larger system and thus can be considered during the detailed design and implementation stage of v3.0.
                                In this manner the larger development should be more efficient and code rewrite reduced.
                                In some cases this will extend to features being included in the accompanying flowcharts that are not explicitly required in V3.0 but can then be incorporated as code stubs in readiness for following versions.

                                The terminology used in this document aims to provide a clear understanding of the intended software functionality to a technically orientated audience.
                                As such much of the language and terminology used throughout is of a technical nature and many of the names and labels adopted here bear at least some relationship to those used in the world of Systems and programming Language design.
                                However, in regard to any interpretation of this specification for the purposes of producing a final UI for
                                product and the associated user’s documentation it is intended that naming convention and terminology be thoroughly reviewed and revised in order that it may be as clear and intuitive to the intended non programming user audience as possible.

                                This document provides a top level specification for Version 3.x of the HypaIQ Software Suit.
                                This version of the document should be considered a very early draft and whilst its overall format attempts to cover the complete system,
                                in reality only the sections covering the core Form builder, together with the underlying scripting language contain any real level of detail.
                                This document is subject to continuous revision and will be updated as the system design evolves.

                                It is important to realise that in places this document provides detail on components and component functionality beyond the initial V3.0 release.
                                This is provided in order that the reader can better understand the context of the V3.0 components and their role in the larger system and thus can be considered during the detailed design and implementation stage of v3.0.
                                In this manner the larger development should be more efficient and code rewrite reduced.
                                In some cases this will extend to features being included in the accompanying flowcharts that are not explicitly required in V3.0 but can then be incorporated as code stubs in readiness for following versions.

                                The terminology used in this document aims to provide a clear understanding of the intended software functionality to a technically orientated audience.
                                As such much of the language and terminology used throughout is of a technical nature and many of the names and labels adopted here bear at least some relationship to those used in the world of Systems and programming Language design.
                                However, in regard to any interpretation of this specification for the purposes of producing a final UI for
                                product and the associated user’s documentation it is intended that naming convention and terminology be thoroughly reviewed and revised in order that it may be as clear and intuitive to the intended non programming user audience as possible.

                                product and the associated user’s documentation it is intended that naming convention and terminology be thoroughly reviewed and revised in order that it may be as clear and intuitive to the intended non programming user audience as possible.

                                This document provides a top level specification for Version 3.x of the HypaIQ Software Suit.
                                This version of the document should be considered a very early draft and whilst its overall format attempts to cover the complete system,
                                in reality only the sections covering the core Form builder, together with the underlying scripting language contain any real level of detail.
                                This document is subject to continuous revision and will be updated as the system design evolves.

                                It is important to realise that in places this document provides detail on components and component functionality beyond the initial V3.0 release.
                                This is provided in order that the reader can better understand the context of the V3.0 components and their role in the larger system and thus can be considered during the detailed design and implementation stage of v3.0.
                                In this manner the larger development should be more efficient and code rewrite reduced.
                                In some cases this will extend to features being included in the accompanying flowcharts that are not explicitly required in V3.0 but can then be incorporated as code stubs in readiness for following versions.

                                The terminology used in this document aims to provide a clear understanding of the intended software functionality to a technically orientated audience.
                                As such much of the language and terminology used throughout is of a technical nature and many of the names and labels adopted here bear at least some relationship to those used in the world of Systems and programming Language design.
                                However, in regard to any interpretation of this specification for the purposes of producing a final UI for
                                product and the associated user’s documentation it is intended that naming convention and terminology be thoroughly reviewed and revised in ord
                            </text>
                        </div>
                        <Button className="button" title="Log in"  >
                            <Link style={{color: "#FFFFFF",fontWeight: "bolder",textDecoration:"none"}} to="/signup">Return to SIGN UP</Link>
                        </Button>
                    </Container>
                </ContainerBox>
            </Body >
        )
    }
}



export default UserAgreement;
