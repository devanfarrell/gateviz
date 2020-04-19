import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Router from './router';
import Provider from 'redux/provider';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faInfoCircle);

ReactDOM.render(<Provider><Router /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
