import React from 'react';
import styled from 'styled-components';
import { GrHelp } from 'react-icons/gr';
import logo from '../../assets/logo.png';

const private_img = require('../../assets/user-profile.jpg');
const workgroup_profile =
	'https://images.unsplash.com/photo-1581360742512-021d5b2157d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&q=80';
export default function Dashboard({ history, authObj }) {
	const [brandLinkWidth, setBrandLinkWidth] = React.useState(0);
	const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

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
				cursor: pointer;
				p {
					margin: 0;
					font-size: 90%;
				}
			}
			.profile-picture {
				position: absolute;
				right: 40px;
				bottom: -15px;
				cursor: pointer;
				img {
					width: 55px;
					height: 55px;
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
						cursor: pointer;
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
					<div
						className="profile-info"
						onClick={() => setIsDropdownVisible(true)}
					>
						<p>Welcome !</p>
						<p>username@mail.com</p>
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
								<li className="persona-item">
									<span className="persona-item-image">
										<img src={workgroup_profile} alt="..." />
									</span>
									<p className="persona-item-text">Workgroup Name</p>
								</li>
							</ul>
							<button
								onClick={() => {
									authObj.authenticate(false);
									history.push('/');
								}}
							>
								Log Out
							</button>
						</div>
					)}
				</div>
			</TopMenu>
		</>
	);
}
