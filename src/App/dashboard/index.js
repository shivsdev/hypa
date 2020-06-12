import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SubMenu from './sub-menu';

export default function Dashboard({ history, authObj }) {
	return (
		<>
			<TopMenu>
				menu
			</TopMenu>
			<br />
			<SubMenu />
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

const TopMenu = styled.div``;
