import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GrHelp } from 'react-icons/gr';

import logo from '../../assets/logo.png';
import { apiUrlWithToken } from '../calls/apis';
import Spinner from './components/Spinner';

const private_img = require('../../assets/user-profile.jpg');
const workgroup_profile =
	'https://images.unsplash.com/photo-1581360742512-021d5b2157d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&q=80';

export default function Dashboard({ history, authObj, location }) {
	const [brandLinkWidth, setBrandLinkWidth] = React.useState(0);
	const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	let path = location.pathname.split('/')[2];

	const menu_bg_color = '#0F1662';
	const menu_font_color = 'white';
	const menu_text_size = '16px';
	const top_menu_dropdown_bg_color = '#4395A6';
	const top_menu_dropdown_text_color = 'white';
	const token = window.sessionStorage.getItem('token');

	const handleLogout = () => {
		setIsLoading(true)
		apiUrlWithToken
			.post('/account/logout')
			.then(res => {
				authObj.authenticate(false);
				window.sessionStorage.clear();
				history.push('/');
			})
			.catch(error => {
				alert(error.response.data.msg);
			});
	};

	React.useLayoutEffect(() => { }, [brandLinkWidth]);

	const TopMenu = styled.div`
		display: flex;
		margin-bottom: 30px;
		nav {
			width: 77%;
			background: ${menu_bg_color};
			ul {
				padding: 0;
				margin: 0%;
				border-bottom: 5px solid ${top_menu_dropdown_bg_color};
				position: relative;
				li {
					display: inline-flex;
					background: ${menu_bg_color};
					:first-child {
						background: red;
						width: ${brandLinkWidth + 15}px;
					}
					.brand-link {
						position: absolute;
						top: 15px;
						left: 5px;
						border: 1px solid white;
						padding: 0;

						div {
							display: inline-flex;
							align-items: center;
							position: relative;
							img {
								height: 40px;
							}
							strong {
								font-weight: bold;
								font-size: 2em;
								padding: 0 20px;
							}
							span {
								position: absolute;
								background: red;
								border-radius: 10px;
								padding: 0 4px;
								font-size: 10px;
								top: 5%;
								right: -5%;
							}
						}
					}
					a {
						display: inline-flex;
						align-items: center;
						background: ${menu_bg_color};
						padding: 0 50px;
						height: 45px;
						font-size: ${menu_text_size};
						color: ${menu_font_color};
						text-decoration: none;
					}
					.selectedLink {
						background: ${menu_font_color};
						color: ${menu_bg_color};
					}
					.help-icon {
						background: #5bb528;
						border-radius: 20px;
						width: 25px;
						height: 25px;
						display: flex;
						align-items: center;
						justify-content: center;
						color: white;
						cursor: pointer;
					}
				}
			}
		}
		path {
			stroke: white;
		}
		> .navbar-dropdown {
			display: flex;
			width: 23%;
			background: ${top_menu_dropdown_bg_color};
			color: white;
			align-items: center;
			padding: 0 10px 0 30px;
			justify-content: space-between;
			position: relative;

			.profile-info {
				cursor: pointer;
				p {
					margin: 0;
					font-size: 95%;
				}
			}
			.profile-picture {
				position: absolute;
				right: 20px;
				bottom: -25px;
				cursor: pointer;

				img {
					width: 68px;
					height: 68px;
					border-radius: 50%;
					border: 4px solid ${top_menu_dropdown_bg_color};
				}
			}
			.show-dropdown {
				box-sizing: border-box;
				position: absolute;
				top: 0;
				left: 2%;
				width: 96%;
				min-height: 350px;
				background: white;
				border: 2px solid #999;
				border-radius: 10px;
				padding: 10px;
				margin: auto;
				color: #666;
				font-size: 90%;
				.profile-picture-block {
					display: flex;
					justify-content: flex-end;
					width: 100%;
					span {
						border-radius: 50%;
						border: 3px solid #999;
						width: 40px;
						height: 40px;
						overflow: hidden;
						img {
							width: 100%;
						}
					}
				}
				.persona-name {
					border-bottom: 2px solid #999;
					p {
						margin: 5px 0;
					}
				}
				.current-persona-info {
					border-bottom: 2px solid #999;
					p {
						margin: 5px 0;
					}
				}
				.personas-container {
					padding: 0;
					.persona-item {
						display: flex;
						padding: 5px 0;
						margin: 2px 0;
						cursor: pointer;
						align-items: center;
						:hover {
							background: #eee;
						}
						.persona-item-image {
							border-radius: 50%;
							border: 3px solid #999;
							width: 40px;
							height: 40px;
							overflow: hidden;
							img {
								width: 100%;
							}
						}
						.persona-item-text {
							padding-left: 10px;
						}
					}
				}
				button {
					border: 0;
					background: 0;
					color: #666;
					padding: 5px;
					cursor: pointer;
					margin-top: 40px;
				}
			}
		}
	`;

	let profileLetter = '';

	const letter = () => {
		let str = 'Mark Wood';
		let string = str.split(' ');
		if (str.split(' ').length > 3) {
			string = string.filter(value => {
				return value.length > 1;
			});
		}
		if (string.length > 3) {
			string = string.map(value => {
				return value.replace('the', '');
			});
			string = string.map(value => {
				return value.replace('NHS', '');
			});
			string = string.filter(value => {
				return value != '';
			});
		}
		let arr = [];
		string.forEach((value, index) => {
			if (index == 0) {
				if (value.slice(0, 3).match('^[0-9]*$')) {
					arr.push(value.slice(0, 3));
				} else if (index == 0) {
					if (value.slice(0, 2).match('^[0-9]*$')) {
						arr.push(value.slice(0, 2));
						arr.push(string[1].slice(0, 1));
					}
				}
			}
		});
		let acronym = '';
		if (arr.length == 0) {
			acronym = string
				.slice(0, 3)
				.reduce((response, word) => (response += word.slice(0, 1)), '');
		}
		if (arr.length == 1) {
			acronym = arr[0];
		}
		if (arr.length == 2) {
			acronym = arr[0] + arr[1];
			console.log(acronym);
		}


		profileLetter = acronym;
	};

	let iframeUrl = '';
	switch (path) {
		case 'patients':
			iframeUrl = 'http://hypaiq-patient.cyb.co.uk/';
			break;
		case 'scheduler':
			iframeUrl = 'http://hypa-scheduler.cyb.co.uk/';
			break;
		case 'admin':
			iframeUrl = 'http://hypaiq-admin.cyb.co.uk/';
			break;
		default:
			iframeUrl = '';
	}

	if(isLoading) {
		return <Spinner msg="Loading ..." />
	}

	return (
		<>
			<TopMenu>
				<nav>
					<ul>
						<li>
							<NavLink
								to="/dashboard"
								className="brand-link"
								ref={el => setBrandLinkWidth(el?.getBoundingClientRect().width)}
							// activeClassName="selectedLink"
							>
								<div>
									<img src={logo} alt=".." />
									<strong>HUB</strong>
									<span>15</span>
								</div>
							</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/patients" activeClassName="selectedLink">
								Patients
							</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/scheduler" activeClassName="selectedLink">
								Scheduler
							</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/notes" activeClassName="selectedLink">
								Notes
							</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/admin" activeClassName="selectedLink">
								Admin
							</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/content" activeClassName="selectedLink">
								Content
							</NavLink>
						</li>
						<li>
							{/* <a href="javascript:void(0)"> */}
							<span className="help-icon">
								<GrHelp />
							</span>
							{/* </a> */}
						</li>
					</ul>
				</nav>
				<div className="navbar-dropdown">
					<div
						className="profile-info"
						onClick={() => setIsDropdownVisible(true)}
					>
						<p>Welcome !</p>
						<p>
							{window.sessionStorage.getItem('email')
								? window.sessionStorage.getItem('email')
								: 'username@email.com'}
						</p>
					</div>
					<div
						className="profile-picture"
						onClick={() => setIsDropdownVisible(true)}
					>
						<span>
							<img src={private_img} alt="..." />
							{/* {letter()} */}
							<p
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
									color: '#000066',
								}}
							>
								{profileLetter}
							</p>
							<p></p>
						</span>
					</div>
					{isDropdownVisible && (
						<div
							className="show-dropdown"
							onMouseLeave={() => setIsDropdownVisible(false)}
						>
							<div className="profile-picture-block">
								<span>
									<img src={private_img} alt="..." />
								</span>
								{/* <span
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										display: 'flex',
									}}
								>
									{letter()}
									<p>{profileLetter}</p>
								</span> */}
							</div>
							<div className="persona-name">
								<p>Private</p>
							</div>
							<div className="current-persona-info">
								<p>username</p>
								<p>USER_ID 481490</p>
								<p>Last logged in @ 12/07/2019 - 12:05</p>
							</div>
							<ul className="personas-container">
								<li className="persona-item">
									<span className="persona-item-image">
										<img src={private_img} alt="..." />
									</span>
									<p className="persona-item-text">Private</p>
								</li>
								<li className="persona-item">
									<span className="persona-item-image">
										<img src={workgroup_profile} alt="..." />
									</span>
									<p className="persona-item-text">Workgroup Name</p>
								</li>
							</ul>
							<button onClick={() => handleLogout()}>Log Out</button>
						</div>
					)}
				</div>
			</TopMenu>
			{iframeUrl ? (
				<iframe
					style={{ border: 0 }}
					src={iframeUrl+`?token=${token}`}
					width="100%"
					height="600px"
				/>
			) : (
				<div
					style={{
						marginTop: '4vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						color: '#777',
						height: '80vh',
					}}
				>
					<h3>Page you are looking is </h3>
					<p>Not found or under development</p>
				</div>
			)}
		</>
	);
}
