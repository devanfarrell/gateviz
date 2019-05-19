import { generateAction } from '../utils';
import { key } from './reducer';

export const initBreadcrumbName = () => generateAction(key, 'initBreadcrumb');
export const initBreadcrumb = name => ({
	type: initBreadcrumbName(),
	key,
	payload: name
});

export const stepIntoName = () => generateAction(key, 'stepInto');
export const stepInto = obj => ({
	type: stepIntoName(),
	key,
	payload: obj
});

export const stepBackName = () => generateAction(key, 'stepBack');
export const stepBack = clickedBreadcrumb => ({
	type: stepBackName(),
	key,
	payload: clickedBreadcrumb
});
