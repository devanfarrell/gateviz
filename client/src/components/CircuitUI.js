import React, { Component } from 'react';
import { Breadcrumb, Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

class CircuitUI extends Component {

    render() {
        return (
            <Navbar fixedBottom inverse>
                <Navbar.Header>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
                            Library
                </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem href="/" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>



        );
    }
}

function mapStateToProps({ breadCrumb }, ownProps) {
    return { breadCrumb };
}

export default connect(mapStateToProps, null)(CircuitUI);
