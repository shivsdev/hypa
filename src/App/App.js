/* Import statements */
import React from 'react';
import { Route } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';
import Resetpassword from './reset-password';
import UserAgreement from './user-agreement';
import Reset from './reset-password/reset-password';
import Home from './home';

export default function App() {
	return (
		<div>
			<Route exact path="/" component={Signin} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/reset" component={Resetpassword} />
			<Route exact path="/user-agreement" component={UserAgreement} />
			<Route exact path="/reset-password/:email" component={Reset} />
			<Route exact path="/home" component={Home} />
		</div>
	);
}
