import React from 'react';
import styled from 'styled-components';

function NotFound() {
	return (
		<NotFoundStyles>
			<h3>Page you are looking is </h3>
			<p>Not found or under development</p>
		</NotFoundStyles>
	);
}

export default NotFound;

const NotFoundStyles = styled.div`
	margin-top: 4vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #777;
	height: 80vh;
`;
