import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SideBar from './SideBar';

export default class Layout extends PureComponent {
    render() {
        return (
            <Container fluid className="main-layout-container">
                <Row noGutters style={{ height: '100%' }}> 
                    <Col xs="3" sm="3">
                        <SideBar></SideBar>
                    </Col>
                    <Col xs="9" sm="9">
                        {this.props.children}   
                    </Col>
                </Row>
            </Container>
        );
    } 
}