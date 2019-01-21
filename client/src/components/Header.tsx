import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends React.Component {
	public render() {
		return (
				<Navbar fixedTop={true} collapseOnSelect={true}>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">GateViz</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight={true}>
							<NavItem href="/" />
						</Nav>
					</Navbar.Collapse>
				</Navbar>
		);
	}
}

export default Header;
