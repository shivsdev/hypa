/* Import statements */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';
import Resetpassword from './reset-password';
import UserAgreement from './user-agreement';
import Reset from './reset-password/reset-password';
import Home from './home';

const tempAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) 
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    tempAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

function Dashboard() {
	return <div>Dashboard view</div>
}

export default function App() {
	return (
		<div>
			<Route exact path="/" render={(props) =>  <Signin {...props} tempAuth={tempAuth} />} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/reset" component={Resetpassword} />
			<Route exact path="/user-agreement" component={UserAgreement} />
			<Route exact path="/reset-password/:email" component={Reset} />
			<Route exact path="/home" component={Home} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
		</div>
	);
}
