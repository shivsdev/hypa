import React from 'react';
import styled from 'styled-components';
import { GrHelp } from 'react-icons/gr';
import logo from '../../assets/logo.png';

export default function Dashboard({ history, authObj }) {
	const [brandLinkWidth, setBrandLinkWidth] = React.useState(0);

	const menu_bg_color = '#0F1662';
	const menu_font_color = 'white';
	const menu_text_size = '16px';
	const top_menu_dropdown_bg_color = '#4395A6';
	const top_menu_dropdown_text_color = 'white';

	const TopMenu = styled.div`
		display: flex;
		nav {
			width: 80%;
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
						width: ${brandLinkWidth}px;
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
						padding: 0 40px;
						height: 45px;
						font-size: ${menu_text_size};
						color: ${menu_font_color};
						text-decoration: none;
						:focus {
							/* background: ${menu_font_color};
							color: ${menu_bg_color}; */
						}
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
					}
				}
			}
		}
		path {
			stroke: white;
		}
		> .navbar-dropdown {
			display: flex;
			width: 20%;
			background: ${top_menu_dropdown_bg_color};
			color: white;
			align-items: center;
			padding: 0 40px;
			justify-content: space-between;
			position: relative;
			.profile-info {
				p {
					margin: 0;
				}
			}
			.profile-picture {
				position: absolute;
				right: 40px;
				bottom: -15px;
				img {
					width: 55px;
					height: 55px;
					border-radius: 50%;
					border: 4px solid ${top_menu_dropdown_bg_color};
				}
			}
		}
	`;

	return (
		<>
			<TopMenu>
				<nav>
					<ul>
						<li>
							<a
								href="javascript:void(0)"
								className="brand-link"
								ref={el => setBrandLinkWidth(el?.getBoundingClientRect().width)}
							>
								<div>
									<img src={logo} alt=".." />
									<strong>HUB</strong>
									<span>15</span>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">Patients</a>
						</li>
						<li>
							<a href="javascript:void(0)">Scheduler</a>
						</li>
						<li>
							<a href="javascript:void(0)">Notes</a>
						</li>
						<li>
							<a href="javascript:void(0)">Admin</a>
						</li>
						<li>
							<a href="javascript:void(0)">Content</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<span className="help-icon">
									<GrHelp />
								</span>
							</a>
						</li>
					</ul>
				</nav>
				<div className="navbar-dropdown">
					<div className="profile-info">
						<p>Welcome !</p>
						<p>welcome@gmail.com</p>
					</div>
					<div className="profile-picture">
						<span>
							<img src={require('../../assets/user-profile.jpg')} />
						</span>
					</div>
				</div>
			</TopMenu>
			<br />

			<button
				onClick={() => {
					authObj.authenticate(false);
					history.push('/');
				}}
			>
				Logout
			</button>
		</>
	);
}
