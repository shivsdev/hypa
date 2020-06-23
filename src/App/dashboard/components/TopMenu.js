import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { GrHelp } from 'react-icons/gr';

import logo from '../../../assets/logo.png';
import private_img from '../../../assets/user-profile.jpg';
import { apiUrlWithToken } from '../../calls/apis';
import { device, size } from '../../../exportables/exportables';

function TopMenu({ theme, history, setIsLoading, authObj }) {
	const [brandLinkWidth, setBrandLinkWidth] = useState(161.125);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const handleLogout = () => {
		setIsLoading(true);
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

	return (
		<TopMenuStyles theme={theme} brandLinkWidth={brandLinkWidth}>
			<nav>
				<ul>
					<li>
						<NavLink
							to="/dashboard"
							className="brand-link"
							ref={el => setBrandLinkWidth(el?.getBoundingClientRect().width)}
						>
							<div>
								<img src={logo} alt=".." />
								<strong>HUB</strong>
								<span>15</span>
							</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/patients"
							className="link"
							activeClassName="selectedLink"
						>
							Patients
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/scheduler"
							className="link"
							activeClassName="selectedLink"
						>
							Scheduler
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/notes"
							className="link"
							activeClassName="selectedLink"
						>
							Notes
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/admin"
							className="link"
							activeClassName="selectedLink"
						>
							Admin
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/content"
							className="link"
							activeClassName="selectedLink"
						>
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
						</ul>
						<button onClick={() => handleLogout()}>Log Out</button>
					</div>
				)}
			</div>
		</TopMenuStyles>
	);
}

export default TopMenu;

const TopMenuStyles = styled.div`
	display: flex;
	margin-bottom: 30px;
	nav {
		width: 77%;
		background: ${props => props.theme.main_menu.background_colour};
		ul {
			padding: 0;
			margin: 0%;
			border-bottom: 5px solid
				${props => props.theme.top_menu_dropdown_bg_color};
			position: relative;
			li {
				display: inline-flex;
				background: ${props => props.theme.menu_bg_color};
				:first-child {
					background: red;
					width: ${props => props.brandLinkWidth + 15}px;
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
					background: ${props => props.theme.menu_bg_color};
					padding: 0 50px;
					height: 45px;
					font-size: ${props => props.theme.menu_text_size};
					color: ${props => props.theme.menu_font_color};
					text-decoration: none;
				}
				.selectedLink {
					background: ${props => props.theme.menu_font_color};
					color: ${props => props.theme.menu_bg_color};
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
		background: ${props => props.theme.top_menu_dropdown_bg_color};
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
			bottom: -16px;
			cursor: pointer;
			img {
				width: 68px;
				height: 68px;
				border-radius: 50%;
				border: 4px solid ${props => props.theme.top_menu_dropdown_bg_color};
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
	@media ${device.desktop} {
		.link {
			padding: 0 60px;
		}
	}
	@media ${device.laptopL} {
		.link {
			padding: 0 40px;
		}
	}
	@media ${device.laptop} {
		.link {
			padding: 0 25px;
		}
	}
	/* @media (min-width: 1024px) and (max-width: 1440px) {
		.link {
			padding: 0 25px;
		}
	} */
	@media (min-width: 768px) and (max-width: 1024px) {
		.link {
			padding: 0 25px;
		}
	}
	@media ${device.tablet} {
		border-bottom: 5px solid #4395a6;
		width: 100%;
		nav {
			width: 90%;
			ul {
				border-bottom: 0;
				.brand-link {
					display: flex;
					top: 125% !important;
					left: 0 !important;
					right: 0 !important;
					width: 70%;
					min-width: 190px;
					max-width: 260px;
					margin: auto;
					justify-content: center;
				}
				.link {
					opacity: 0;
					display: none !important;
				}
				.help-icon {
					display: none !important;
				}
			}
		}

		.navbar-dropdown {
			display: flex;
			width: 10%;
			min-width: 60px;
			padding: 0%;
			justify-content: center;
			position: unset;
			.profile-info {
				display: none;
			}
			.profile-picture {
				position: unset;
				img {
					width: 50px;
					height: 50px;
				}
			}
			.show-dropdown {
				min-height: 290px;
			}
		}
	}
`;
