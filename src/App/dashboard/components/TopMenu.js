import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { GrHelp } from 'react-icons/gr';
import { MdMenu, MdClose } from 'react-icons/md';

import logo from '../../../assets/logo.png';
import private_img from '../../../assets/user-profile.jpg';
import { apiUrlWithToken } from '../../calls/apis';
import { device, size } from '../../../exportables/exportables';

function TopMenu({ theme, history, setIsLoading, authObj }) {
  const [brandLinkWidth, setBrandLinkWidth] = useState(160);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [persona, setPersona] = useState(null);

  const handleLogout = () => {
    setIsLoading(true);
    apiUrlWithToken
      .post('/auth/logout')
      .then((res) => {
        authObj.authenticate(false);
				window.sessionStorage.removeItem('email')
				window.sessionStorage.removeItem('token')
				window.sessionStorage.removeItem('isAuthenticated')
        history.push('/');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleSideMenu = () => {
    setToggled(!toggled);
  };

  const getValueIfExists = (value) => {
    return value ? value : '';
  };

  useEffect(() => {
    let email = window.sessionStorage.getItem('email');
    apiUrlWithToken.get(`/auth/find/${email}`).then(({ data }) => {
      const profile = data.account[0];
      if (profile?.personaldetails) {
        const { personaldetails, email } = profile;
        const { title, firstname, lastname } = personaldetails;
        let name = `${getValueIfExists(title)} ${getValueIfExists(
          firstname
        )} ${getValueIfExists(lastname)}`;
        setPersona({ name, email });
      }
    });
  }, []);

  /*
		corrections on style-api
		main_menu.highlight_colour = #4395A6;
 */

  return (
    <TopMenuStyles theme={theme} brandLinkWidth={brandLinkWidth} width={width}>
      <nav>
        <ul className={`${toggled ? 'toggled' : ''}`}>
          <li>
            <NavLink
              to="/dashboard"
              className={`brand-link ${toggled ? 'toggled' : ''}`}
              ref={(el) =>
                setBrandLinkWidth(
                  el?.getBoundingClientRect().width > brandLinkWidth
                    ? el?.getBoundingClientRect().width
                    : brandLinkWidth
                )
              }
              onClick={() => setToggled(false)}
            >
              <div>
                <img
                  src={theme.icons.hub_logo ? theme.icons.hub_logo : logo}
                  alt=".."
                />
                <strong>HUB</strong>
                <span>0</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/patients"
              className={`link ${toggled ? 'toggled' : ''}`}
              activeClassName="selectedLink"
              onClick={() => setToggled(false)}
            >
              Patients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/scheduler"
              className={`link ${toggled ? 'toggled' : ''}`}
              activeClassName="selectedLink"
              onClick={() => setToggled(false)}
            >
              Scheduler
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notes"
              className={`link ${toggled ? 'toggled' : ''}`}
              activeClassName="selectedLink"
              onClick={() => setToggled(false)}
            >
              Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin"
              className={`link ${toggled ? 'toggled' : ''}`}
              activeClassName="selectedLink"
              onClick={() => setToggled(false)}
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/content"
              className={`link ${toggled ? 'toggled' : ''}`}
              activeClassName="selectedLink"
              onClick={() => setToggled(false)}
            >
              Content
            </NavLink>
          </li>
          <li
            className={`help-icon-holder ${toggled ? 'toggled' : ''}`}
            onClick={() => setToggled(false)}
          >
            {theme.icons.help ? (
              <span
                style={{
                  display: 'flex',
                  position: 'absolute',
                  bottom: -6,
                  left: 8,
                }}
              >
                <img
                  src={theme.icons.toolbar_setting}
                  style={{ height: 25, cursor: 'pointer' }}
                  alt="..."
                />
              </span>
            ) : (
              <span className="help-icon">
                <GrHelp />
              </span>
            )}
          </li>
        </ul>
        <span onClick={handleSideMenu}>
          {toggled ? <MdClose /> : <MdMenu />}
        </span>
      </nav>
      <div className="navbar-dropdown">
        <div
          className="profile-info"
          onClick={() => {
            setToggled(false);
            setIsDropdownVisible(true);
          }}
        >
          <p>{persona ? persona.name : 'Welcome !'}</p>
          <p>
            {persona?.name
              ? 'Private'
              : window.sessionStorage.getItem('email')
              ? window.sessionStorage.getItem('email')
              : ''}
          </p>
        </div>
        <div
          className="profile-picture"
          onClick={() => {
            setToggled(false);
            setIsDropdownVisible(true);
          }}
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
              <span onClick={() => setIsDropdownVisible(false)}>X</span>
              <span>
                <img src={private_img} alt="..." />
              </span>
            </div>
            <div className="persona-name">
              <p>Private</p>
            </div>
            <div className="current-persona-info">
              <p>{persona ? persona.name : 'username_temp'}</p>
              <p>USER_ID 481490_temp</p>
              <p>Last logged in @ 12/07/2019 - 12:05-temp</p>
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
                  <img
                    src="https://devpolicy.org/wp-content/uploads/2015/02/image13-1024x1024.png"
                    alt="..."
                  />
                </span>
                <p className="persona-item-text">Multi Specialist team</p>
              </li>
              <li className="persona-item">
                <span className="persona-item-image">
                  <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hospital-logo-design-template-ad2e9db3845f2a6f1720ffada27c7eec_screen.jpg?ts=1570783104"
                    alt="..."
                  />
                </span>
                <p className="persona-item-text">Emergency group</p>
              </li>
              <li className="persona-item">
                <span className="persona-item-image">
                  <img
                    src="https://images.creativemarket.com/0.1.0/ps/2304773/600/400/m2/fpnw/wm0/2-.jpg?1487623255&s=5b9c20a936b95fe058e8ca625de4fd96"
                    alt="..."
                  />
                </span>
                <p className="persona-item-text">Heart specialist</p>
              </li>
            </ul>
            <ul className="persona-bottom-links">
              <li>
                <button>Create new Group</button>
              </li>
              <li>
                <button>Invite a user</button>
              </li>
              <li>
                <button>Account info</button>
              </li>
              <li>
                <button onClick={() => handleLogout()}>Log Out</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </TopMenuStyles>
  );
}

export default TopMenu;

const getResponsiveFontSize = (sizeinpx, width) => {
  let fontSize = parseInt(sizeinpx.substr(0, 2));
  let result = (fontSize / width) * 80 + 'vw';
  return result;
};

const TopMenuStyles = styled.div`
	display: flex;
	/* margin-bottom: 30px; */
	nav {
		width: 77%;
		background:${(props) => props.theme.top_menu_button.passive_background_colour};
		> span {
			display: none;
		}
		ul {
			padding: 0;
			margin: 0%;
			border-bottom: 5px solid
				${(props) => props.theme.top_menu_button.passive_border_colour};
			position: relative;
			white-space: nowrap;
			li {
				display: inline-flex;
				background: ${(props) => props.theme.top_menu_button.passive_background_colour};
				:first-child {
					width: ${(props) => props.brandLinkWidth + 25}px;
				}
				.brand-link {
					position: absolute;
					top: 15px;
					left: 20px;
					border: 1px solid white;
					padding: 0;
					background: ${(props) => props.theme.top_menu_button.passive_background_colour};
					div {
						display: inline-flex;
						align-items: center;
						position: relative;
						justify-content: center;
						width: 100%;
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
							display: none;
						}
					}
				}
				a {
					display: inline-flex;
					align-items: center;
					background: ${(props) => props.theme.top_menu_button.passive_background_colour};
					padding: 0 50px;
					height: 45px;
					font-size: ${(props) =>
            getResponsiveFontSize(
              props.theme.top_menu_button.passive_text_size,
              props.width
            )};
					color: ${(props) => props.theme.top_menu_button.passive_text_colour};
					text-decoration: none;
					margin-top: 5px;
				}
				.selectedLink {
					font-size: ${(props) =>
            getResponsiveFontSize(
              props.theme.top_menu_button.active_text_size,
              props.width
            )};
					color: ${(props) => props.theme.top_menu_button.active_text_colour};
					background: ${(props) => props.theme.top_menu_button.active_background_colour};
					position: relative;
					&:before {
						content: '';
						position: absolute;
						display: block;
						width: 100%;
						height: 5px;
						background: white;
						bottom: -5px;
						left: 0;
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
					margin-left: 10px;
					cursor: pointer;
				}
			}
			.help-icon-holder {
				position: relative;
			}
		}
	}
	path {
		stroke: white;
	}
	> .navbar-dropdown {
		display: flex;
		width: 23%;
		background:${(props) => props.theme.main_menu.highlight_colour};;
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
			span {
				display: inline-block;
				position: relative;
				&:before {
					content: '';
					position: absolute;
					display:block;
					height: 10px;
					width: 100%;					
					background:${(props) => props.theme.main_menu.highlight_colour};
					top: 0;
					/* z-index: 1; */
				}
			}
			img {
				width: 68px;
				height: 68px;
				border-radius: 50%;
				border: 4px solid ${(props) => props.theme.top_menu_dropdown_bg_color};
			}
		}
		.show-dropdown {
			box-sizing: border-box;
			position: absolute;
			top: 0;
			right: 2%;
			width: 96%;
			max-width: 300px;
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
					&:first-child {
						
						display: none;
					}
					&:last-child {
						border-radius: 50%;
						border: 2px solid #9A958E;
						width: 45px;
						height: 45px;
						overflow: hidden;
						img {
							width: 100%;
						}
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
						border: 2px solid #9A958E;
						width: 45px;
						height: 45px;
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
			.persona-bottom-links {
				margin-top: 40px;
				border-top: 1px solid #999;
				list-style: none;
				li {
					button {
						border: 0;
						background: 0;
						color: #666;
						padding: 5px;
						cursor: pointer;
						outline: 0;
					}
				}
			
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
	@media (min-width: 768px) and (max-width: 850px) {
		.link {
			padding: 0 10px;
		}
	}
	@media (min-width: 850px) and (max-width: 1000px) {
		.link {
			padding: 0 15px;
		}
	}
	@media (min-width: 1000px) and (max-width: 1200px) {
		.link {
			padding: 0 20px;
		}
	}
	@media ${device.tablet} {
		border-bottom: 5px solid #4395a6;
		width: 100%;
		nav {
			width: 90%;
			> span {
				display: inline-block;
				color: white;
				font-size: 25px;
				margin-left: 10px;
				margin-top: 15px;
				cursor: pointer;
			}
			ul {
				border-bottom: 0;
				&.toggled {
					display: flex;
					flex-direction: column;
					position: absolute;
					background:${(props) =>
            props.theme.notification_button.active_background_colour};
					top: 53px;
				}

				.brand-link {
					display: flex;
					top: 180% !important;
					left: 0 !important;
					right: 0 !important;
					width: 70%;
					min-width: 190px;
					max-width: 260px;
					margin: auto;
					justify-content: center;
					&.toggled {
						position: unset;
						border: 0;
					}
				}
				.link {
					width: 100%;
					justify-content: center;
					display: none;
					margin-top: 0;
					&.toggled {
						display: flex;
					}
				}
				.selectedLink {
					&:before {
						display: none! important;
					}
				}
				.help-icon-holder {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: center;
					padding: 10px;
					display: none;					
					&.toggled {
						display: flex;
					}
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
			background:${(props) => props.theme.main_menu.highlight_colour};
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
				.profile-picture-block {
				display: flex;
				justify-content: space-between;
				width: 100%;
				span {
					&:first-child {
						padding: 5px 10px;
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	@media (max-width: 320px) {
		.brand-link {
			width: 50% !important;
			min-width: 162px !important;
		}
	}
`;
