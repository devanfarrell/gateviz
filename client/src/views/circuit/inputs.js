import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { selectInputs } from 'redux/circuit/selectors';
import Toggle from 'components/toggle';
import colors from 'styles/colors';

const MultipleInput = ({ label, id }) => {
	return (
		<SingleInputWrapper>
			<span>{label}</span>
			<Toggle id={id} />
		</SingleInputWrapper>
	);
};

const SingleInput = ({ label, id }) => {
	return (
		<SingleInputWrapper>
			<span>{label}</span>
			<Toggle id={id} />
		</SingleInputWrapper>
	);
};

const Inputs = props => {
	const inputList = useSelector(selectInputs);
	return (
		<>
			{inputList &&
				inputList.map(input =>
					input.type === 'MULTIPLE_INPUT' ? (
						<MultipleInput id={input.id} label={input.label} input={input} key={input.id} />
					) : (
						<SingleInput id={input.id} label={input.label} input={input} key={input.id} />
					)
				)}
		</>
	);
};

const SingleInputWrapper = styled.div`
	color: ${colors.grey.extraLight};
	display: flex;
	justify-content: space-between;
	margin: 0 5px;
	padding: 5px 0;
	align-items: center;
`;

export default Inputs;
