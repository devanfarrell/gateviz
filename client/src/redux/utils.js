export const actionTypes = {
	REQUEST: 'REQUEST',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE'
};

export const enforceActionType = type => {
	if (type === actionTypes.REQUEST || type === actionTypes.SUCCESS || type === actionTypes.FAILURE) {
		return true;
	} else {
		throw new Error('Expected an action type');
	}
};

export const generateEnforcedComplexAction = (key, name, type) => {
	enforceActionType(type);
	return generateAction(key, name, type);
};

export const generateActionOld = (key, name, type) =>
	type ? `${key}/${name}/${type}` : `${key}/${name}`;

export const generateAction = type => [type, payload => ({ type, payload })];
