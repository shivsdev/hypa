/* Import statements */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Signin from './signin'
import Signup from './signup'




export default function App() {
	return (
		<div>
			<nav className="navbar navbar-light">
				<ul className="nav navbar-nav">
					<li>
						<Link to="/">Sign in</Link>
					</li>
					<li>
						<Link to="/signup">Sign up</Link>
					</li>
				</ul>
			</nav>
			<Route exact path="/" component={Signin} />
			<Route exact path="/signup" component={Signup} />
		</div>
	);
}

