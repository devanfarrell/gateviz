import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const Card = ({ title, children }) => {
	return (
		<CardWrapper>
			<Header>{title}</Header>
			<Body>{children}</Body>
		</CardWrapper>
	);
};

const Body = styled.div`
	background-color: ${colors.grey.light};
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
`;

const Header = styled.div`
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	background-color: ${colors.grey.medium};
	height: 30px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	color: ${colors.grey.extraLight};
	font-weight: 300;
	font-size: 20px;
`;

const CardWrapper = styled.div`
	margin: 40px 10px;
`;

export default Card;
