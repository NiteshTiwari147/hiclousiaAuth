import React, { Component } from 'react';
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
  } from "./footerStyles";

class Footer extends Component {
    render() {
        return (
            <Box>
                <Container>
                    <Row>
                    <Column>
                        <Heading>About Us</Heading>
                        <FooterLink href="#">Aim</FooterLink>
                        <FooterLink href="#">Vision</FooterLink>
                        <FooterLink href="#">Testimonials</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <FooterLink href="#">Counselling</FooterLink>
                        <FooterLink href="#">Internships</FooterLink>
                        <FooterLink href="#">Jobs opportunities</FooterLink>
                        <FooterLink href="#">Hiring</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>
                        <FooterLink href="#">Phone Number</FooterLink>
                        <FooterLink href="#">Email-adress</FooterLink>
                        <FooterLink href="#">Office address</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="#">
                        <i className="fab fa-facebook-f">
                            <span style={{ marginLeft: "10px" }}>
                            Facebook
                            </span>
                        </i>
                        </FooterLink>
                        <FooterLink href="#">
                        <i className="fab fa-instagram">
                            <span style={{ marginLeft: "10px" }}>
                            Instagram
                            </span>
                        </i>
                        </FooterLink>
                        <FooterLink href="#">
                        <i className="fab fa-twitter">
                            <span style={{ marginLeft: "10px" }}>
                            Twitter
                            </span>
                        </i>
                        </FooterLink>
                        <FooterLink href="#">
                        <i className="fab fa-youtube">
                            <span style={{ marginLeft: "10px" }}>
                            Youtube
                            </span>
                        </i>
                        </FooterLink>
                    </Column>
                    </Row>
                </Container>
            </Box>
        )
    }
};

export default Footer;