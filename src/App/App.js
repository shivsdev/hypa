/* Import statements */
import React from 'react';
import { Link, Route } from 'react-router-dom';
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
			<Route exact path="/agreement" component={UserAgreement} />
		</div>
	);
}

