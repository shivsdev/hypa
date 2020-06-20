import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { apiUrl } from '../../calls/apis';


export default function ViewProfile({
	email,
	isPopupVisible,
	togglePopup,
	resetPassword,
	styles
}) {
	const [isSent, setisSent] = useState(false);
	const emailRef = useRef();

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		let Data = {
			"email": 'demo@mail.com'
		}
		apiUrl
			.post('/account/forgotpassword', Data)
			.then(({ data, status }) => {
				resetPassword(emailRef.current.value);
			})
			.catch(err => {
				console.log(err)
			});

	};

	const closePopup = () => {
		togglePopup();
	};
	return (
		<Popup>
			<div className="popup">
				<div className="popup-header">
					<h3>Reset Password</h3>
					<span className="close" onClick={closePopup}>
						X
					</span>
				</div>
				<div className="popup-body">
					{isSent ? (
						<div className="email-sent">
							<div>
								<img
									src="https://media1.tenor.com/images/ee20ed5947b057df7ac026d2c3c8589c/tenor.gif"
									alt="sent email"
								/>
							</div>
							<div>
								<h4>Sent Successfully!</h4>
							</div>
						</div>
					) : (
							<form onSubmit={handleSubmit}>
								<div className="input-group">
									{/* <label>Email</label> */}
									<input
										type="email"
										defaultValue={email ? email : ''}
										placeholder="Enter your email"
										ref={emailRef}
										name="reset-password"
									/>
								</div>
								<p className="reset-text">
									Check your inbox for reset password link, expires in a hour.
							</p>
								<div className="reset-button-holder">
									<button>RESET</button>
								</div>
							</form>
						)}
				</div>
			</div>
		</Popup>
	);
}

const Popup = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.popup {
		max-width: 350px;
		width: 90%;
		.popup-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #4395a6;
			color: white;
			padding: 5px 10px;
			border-radius: 5px 5px 0 0;
			border: 1px solid #4395a6;
			h3 {
				margin: 0;
				font-weight: 500;
				padding: 0;
				font-size: 100%;
			}
			.close {
				font-weight: bold;
				cursor: pointer;
			}
		}
		.popup-body {
			position: relative;
			border: 1.5px solid #4395a6;
			border-radius: 0 0 5px 5px;
			padding: 30px 15px;
			background: white;
			.email-sent {
				display: flex;
				align-items: center;
				div {
          width: 50%;
          h4 {
            color: green;
            font-weight: normal;
          }
				}
				img {
					width: 100%;
				}
			}
			.input-group {
				display: flex;
				flex-direction: column;
				color: #4395a6;
				input {
					height: 38px;
					font-size: 90%;
					color: #333;
				}
			}
			.reset-text {
				font-size: 80%;
				color: #999;
				font-style: italic;
			}
			.reset-button-holder {
				text-align: right;
				button {
					border-radius: 5px;
					background-color: #4395a6;
					color: #ffffff;
					font-size: 90%;
					text-transform: uppercase;
					font-weight: 500;
					cursor: pointer;
					outline: 0;
					padding: 8px 20px;
				}
			}
		}
	}
`;
