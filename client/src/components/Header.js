import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
	render() {
		return (
				<Navbar fixedTop collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">GateViz</a>
						</Navbar.Brand>
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

export default Header;
