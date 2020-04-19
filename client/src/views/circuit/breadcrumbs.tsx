import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectTopLevelCircuitDiscriptors } from 'redux/circuit/selectors';
import { selectBreadcrumbs } from 'redux/slices/breadcrumbs';
import colors from 'styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stepBack } from 'redux/slices/breadcrumbs';

export default function Breadcrumbs() {
	const circuitDescriptors = useSelector(selectTopLevelCircuitDiscriptors);
	const breadcrumbs = useSelector(selectBreadcrumbs);
	const dispatch = useDispatch();
	return (
		<div>
			<CrumbWrapper>
				<TopLevelCircuitName onClick={() => dispatch(stepBack(0))}>
					{circuitDescriptors.name}
				</TopLevelCircuitName>
				<span>
					<Icon icon="info-circle" />
				</span>
			</CrumbWrapper>
			{breadcrumbs.map(crumb => {
				return (
					<CrumbWrapper key={crumb.id}>
						<SubLevelCircuitName>{crumb.name}</SubLevelCircuitName>
						<span>
							<Icon icon="times" onClick={() => dispatch(stepBack(crumb.depth))} />
							<Icon icon="info-circle" />
						</span>
					</CrumbWrapper>
				);
			})}
		</div>
	);
};

const CrumbWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0;
	padding: 0;
`;

const TopLevelCircuitName = styled.div`
	color: ${colors.grey.extraLight};
	font-size: 16px;
	font-weight: light;
	padding: 5px 5px;
	cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
	color: ${colors.grey.extraLight};
	padding: 0 5px;
	cursor: pointer;
`;

const SubLevelCircuitName = styled.div`
	color: ${colors.grey.extraLight};
	font-size: 16px;
	font-weight: light;
	padding: 2px 5px;
	border-left: solid 2px ${colors.grey.extraLight};
	margin-left: 10px;
`;