import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function Dashboard({ history, authObj }) {
	return (
		<>
		<div style={{display: 'flex', border: '1px dashed #ccc', minHeight: 50, alignItems: 'center', justifyContent:'center', color: '#ccc'}}> TOP STATIC MENU </div>
		<br />
		<div style={{display: 'flex', border: '1px dashed #ccc', minHeight: 50, alignItems: 'center', justifyContent:'center', color: '#ccc'}}> Sub tab menu </div>		
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
					history.push('/');
				}}
			>
				Logout
			</button>
		</div>
		</>
	);
}
