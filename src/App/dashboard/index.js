import React from 'react';


export default function Dashboard({history, authObj}) {
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