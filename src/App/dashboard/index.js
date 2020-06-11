import React from 'react';
import axios from 'axios';


export default function Dashboard({history, authObj}) {

  React.useEffect(() => {
    // axios.post('http://34.253.224.180:18306/register/index', {email: 'demo@gmail.com', password: 'Demo@123'}).then(console.log)
    var createCORSRequest = function(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // Most browsers.
        xhr.open(method, url, true);
      } else if (typeof window.XDomainRequest != "undefined") {
        // IE8 & IE9
        xhr = new window.XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    };
    
    var url = 'http://34.253.224.180:18306/register/index';
    var method = 'POST';
    var xhr = createCORSRequest(method, url);
    
    xhr.onload = function(res) {
      // Success code goes here.
      console.log(res)
    };
    
    xhr.onerror = function() {
      // Error code goes here.
    };
    
    xhr.send({email: 'demo@gmail.com', password: 'Demo@123'});
  })

	return (
		<div
			style={{
				height: 200,
				justifyContent: 'center',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			Dashboard view &nbsp;
			<button
				onClick={() => {
					authObj.authenticate(false);
					history.push('/')
				}}
			>
				Logout
			</button>
		</div>
	);
}