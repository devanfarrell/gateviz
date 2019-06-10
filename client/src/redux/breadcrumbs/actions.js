import { generateAction } from '../utils';

export const [INIT_BREADCRUMB, initBreadcrumb] = generateAction('BREADCRUMBS/INIT_BREADCRUMB');
export const [STEP_INTO_CIRCUIT, stepIntoCircuit] = generateAction('BREADCRUMBS/STEP_INTO_CIRCUIT');
export const [STEP_BACK, stepBack] = generateAction('BREADCRUMBS/STEP_BACK');
