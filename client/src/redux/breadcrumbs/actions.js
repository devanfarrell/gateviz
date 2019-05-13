import { generateAction } from '../utils';
import { key } from './reducer';

export const initBreadcrumbName = () => generateAction(key, 'initBreadcrumb');
export const initBreadcrumb = name => ({
	type: initBreadcrumbName(),
	payload: name
});

export const stepIntoName = () => generateAction(key, 'stepInto');
export const stepInto = obj => ({
	type: stepIntoName(),
	payload: obj
});

export const stepBackName = () => generateAction(key, 'stepBack');
export const stepBack = clickedBreadcrumb => ({
	type: stepBackName(),
	payload: clickedBreadcrumb
});
