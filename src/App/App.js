/* Import statements */
import React from 'react';
import { Route } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';
import Resetpassword from './reset-password';
import UserAgreement from './user-agreement';

export default function App() {
	return (
		<div>
			<Route exact path="/" component={Signin} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/reset" component={Resetpassword} />
			<Route exact path="/user-agreement" component={UserAgreement} />
		</div>
	);
}
