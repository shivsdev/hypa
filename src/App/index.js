import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Signin from './signin';
import Signup from './signup';
import Resetpassword from './reset-password';
import UserAgreement from './user-agreement';
import Reset from './reset-password/reset-password';
import Home from './home';
import Dashboard from './dashboard';
import Confirmation from './signup/authentication';
import VerifyEmail from './signup/verifyEmail';

const authObj = {
  isAuthenticated:
    JSON.parse(window.sessionStorage.getItem('isAuthenticated')) || false,
  authenticate(isLoggedBool) {
    window.sessionStorage.setItem('isAuthenticated', isLoggedBool);
    let token = window.sessionStorage.getItem('token');
    this.isAuthenticated =
      token && JSON.parse(window.sessionStorage.getItem('isAuthenticated'));
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authObj.isAuthenticated === true ? (
        <Component {...props} authObj={authObj} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default function App() {
  const [hold, setHold] = React.useState(0);
  useEffect(() => {
    axios
      .get('https://hypaiqstyles.cyb.co.uk:8080/uiobjects/styles')
      .then((res) => {
        window.sessionStorage.setItem('styles', JSON.stringify(res.data));
        setHold(1);
      });
  }, []);

  if (!hold) return <>Loading ... </>;

  return (
    <div>
      <Route
        exact
        path="/"
        render={(props) => <Signin {...props} authObj={authObj} />}
      />
      <Route
        exact
        path="/signup"
        render={(props) => <Signup {...props} authObj={authObj} />}
      />
      <Route exact path="/reset" component={Resetpassword} />
      <Route exact path="/user-agreement" component={UserAgreement} />
      <Route exact path="/reset-password" component={Reset} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/email-verification" component={Confirmation} />
      <Route exact path="/verify-email" component={VerifyEmail} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </div>
  );
}
