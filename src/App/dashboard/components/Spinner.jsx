
import React from 'react';
import styled from 'styled-components';
import LoaderGif from '../../../assets/loader.gif';

function Spinner({ msg }) {
	return (
		<SpinnerStyles>
			<div>
				<img src={LoaderGif} alt=".." />
				<p>{msg}</p>
			</div>
		</SpinnerStyles>
	);
}

export default Spinner;

const SpinnerStyles = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	justify-content: center;
	align-items: center;
	z-index: 2;
	background: rgba(0, 0, 0, 0.5);
	div {
    background: rgba(255, 255, 255, .8);
    padding: 20px 25px;
    border-radius: 5px;
		img {
			width: 50px;
		}
    p {
      margin-top: 10px;
    }
	}
`;