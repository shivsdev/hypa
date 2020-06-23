import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App/App';
import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
	// <Provider store={store}>
	<Router>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Router>,
	// </Provider>,
	rootElement
);
