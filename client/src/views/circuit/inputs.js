import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectInputs } from 'redux/circuit/selectors';
import Toggle from 'components/toggle';
import colors from 'styles/colors';
import { changeInputs } from 'redux/circuit/actions';

const baseRegex = {
	'2': /^[0-1\b]+$/,
	'10': /^[0-9\b]+$/,
	'16': /^[0-9\b]+$/ //TODO: Figure out base 16 regex
};

const baseName = {
	'2': 'BIN',
	'10': 'DEC',
	'16': 'HEX'
};

const testValidity = (value, base, bitSize) => {
	const regexRules = baseRegex[base.toString()];
	const maxSize = Math.pow(2, bitSize) - 1;
	const regexPass = regexRules.test(value);
	const number = Number.parseInt(value.toString(), base);
	return value === '' || (regexPass && 0 <= number && number <= maxSize);
};

const convertStringToBoolArray = (value, base, bitSize) => {
	const boolArray = [];
	const binStringArray =
		value !== ''
			? Number.parseInt(value.toString(), base)
					.toString(2)
					.split('')
			: [];
	for (let i = 0; i < bitSize - binStringArray.length; i++) {
		boolArray.push(false);
	}
	binStringArray.forEach(value => {
		if (value === '0') {
			boolArray.push(false);
		} else {
			boolArray.push(true);
		}
	});
	return boolArray.reverse();
};

const convertBoolArrayToString = (input, targetBase) => {
	let temp = '';
	input
		.slice()
		.reverse()
		.forEach(input => {
			temp = input ? temp.concat('1') : temp.concat('0');
		});

	return Number.parseInt(temp, 2).toString(targetBase);
};

const TypedInput = ({ handleChange, state }) => {
	const [base, setBase] = useState(10);
	const handleBaseChange = () => {
		switch (base) {
			case 2:
				setBase(10);
				return;
			case 10:
				setBase(16);
				return;
			case 16:
				setBase(2);
				return;
			default:
				return;
		}
	};

	const onChange = e => {
		e.preventDefault();
		const value = e.target.value;

		if (testValidity(value, base, state.length)) {
			const array = convertStringToBoolArray(value, base, state.length);
			handleChange(array);
		}
	};
	const displayValue = convertBoolArrayToString(state, base);

	return (
		<InputWrapper>
			<StyledInput placeholder="0000" onChange={onChange} value={displayValue} />
			<BaseSelection onClick={handleBaseChange}>{baseName[base.toString()]}</BaseSelection>
		</InputWrapper>
	);
};

const MultipleInput = ({ label, id, handleChange, state }) => {
	return (
		<MultipleInputWrapper>
			<div>{label}</div>
			<TypedInput id={id} handleChange={value => handleChange(id, value)} state={state} />
		</MultipleInputWrapper>
	);
};

const SingleInput = ({ label, id, input, state, handleToggle }) => {
	return (
		<SingleInputWrapper>
			<span>{label}</span>
			<Toggle id={id} defaultChecked={state} handleToggle={value => handleToggle(id, value)} />
		</SingleInputWrapper>
	);
};

const Inputs = props => {
	const dispatch = useDispatch();
	const inputList = useSelector(selectInputs);
	// const circuit = useSelector(selectParsedCircuit);
	return (
		<>
			{inputList &&
				inputList.map(input =>
					input.type === 'MULTIPLE_INPUT' ? (
						<MultipleInput
							id={input.id}
							label={input.label}
							input={input}
							key={input.id}
							state={input.state}
							handleChange={(id, value) => dispatch(changeInputs({ id, value }))}
						/>
					) : (
						<SingleInput
							id={input.id}
							label={input.label}
							input={input}
							key={input.id}
							state={input.state}
							handleToggle={(id, value) => dispatch(changeInputs({ id, value }))}
						/>
					)
				)}
		</>
	);
};

const BaseSelection = styled.div`
	border-top-right-radius: 3px;
	border-bottom-right-radius: 3px;
	border-left: solid 1px ${colors.grey.dark};
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 40px;
	cursor: pointer;
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
