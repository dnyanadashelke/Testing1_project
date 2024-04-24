import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../asset/favicon.png';
import fb from '../../asset/letter-f_10077206.png';
import li from '../../asset/instagram_1416572.png';
import is from '../../asset/social_14771712.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" style={{ backgroundColor: 'black' }}>
            <Container fluid id="footer">
                <Row className="align-items-center"   style={{ backgroundColor: "#282c34" }}>
                    <Col>
                       {/* <Link to={`/`}><img src={logo} alt="logo" width="100" height="100" id='img-logo-footer' /></Link> */}
                    </Col>
                    <Col>
                       {/* <Link to={`/`}><img src={logo} alt="logo" width="100" height="100" id='img-logo-footer' /></Link> */}
                    </Col>
                   
                    <Col>
                        {/* <h5 color='white' >Contact Us Here</h5>
                        <a href="#"><img src={fb} width="50" height="50" alt="Facebook" /></a>
                        <a href="#"><img src={is} width="50" height="50" alt="Instagram" /></a>
    <a href="#"><img src={li} width="50" height="50" alt="LinkedIn" /></a> */}
    <br/>
    <br/>
                    </Col>
                    <Col className="text-center text-sm-end">
                        <div>
                            <p className="rights">&copy; All Rights Reserved - 2024</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
