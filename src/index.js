import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// import { Provider } from 'react-redux';
// import store from './store';

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
