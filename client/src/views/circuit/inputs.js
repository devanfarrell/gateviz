import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { selectInputs } from 'redux/circuit/selectors';
import Toggle from 'components/toggle';
import colors from 'styles/colors';

const TypedInput = props => {
	return (
		<InputWrapper>
			<StyledInput placeholder="0000" />
			<BaseSelection>DEC</BaseSelection>
		</InputWrapper>
	);
};

const MultipleInput = ({ label, id }) => {
	return (
		<MultipleInputWrapper>
			<div>{label}</div>
			<TypedInput id={id} />
		</MultipleInputWrapper>
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

const BaseSelection = styled.div`
	border-top-right-radius: 3px;
	border-bottom-right-radius: 3px;
	border-left: solid 1px hotpink;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40px;
`;

const StyledInput = styled.input`
    border-width: 0px;
    flex: 1 0 auto;
    height: 100%;
`;

const InputWrapper = styled.div`
	background-color: white;
	padding: 5px;
    border-radius: 3px;
    display: flex;
	color: ${colors.grey.veryDark};
`;

const MultipleInputWrapper = styled.div`
	color: ${colors.grey.extraLight};
	margin: 0 5px;
	padding: 5px 0;
	align-items: center;
`;

const SingleInputWrapper = styled.div`
	color: ${colors.grey.extraLight};
	display: flex;
	justify-content: space-between;
	margin: 0 5px;
	padding: 5px 0;
	align-items: center;
`;

export default Inputs;
