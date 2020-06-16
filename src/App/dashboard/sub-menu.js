import React, { Component } from 'react';
import styled from 'styled-components';

import ResponsiveNav from '@rsuite/responsive-nav';
import 'rsuite/dist/styles/rsuite-default.css';

const items = [
    { eventKey: 'Settings', label: 'Settings' },
    { eventKey: 'Predefined', label: 'Predefined tags' },
    { eventKey: 'People', label: 'People' },
    { eventKey: 'Roles', label: 'Roles' },
    { eventKey: 'Profile', label: 'Profile' },
    { eventKey: 'Patients', label: 'Patients' },
];

class SubMenu extends Component {
    state = {
        activeKey: 'Profile',
    };
    setActiveKey = event => {
        this.setState({
            activeKey: event,
        });
    };

    render() {
        return (
            <Styles>
                <div className="body">
                    <ResponsiveNav
                        activeKey={this.state.activeKey}
                        appearance="tabs"
                        onSelect={this.setActiveKey}
                    >
                        {items.map(item => (
                            <ResponsiveNav.Item key={item.eventKey} eventKey={item.eventKey}>
                                {item.label}
                            </ResponsiveNav.Item>
                        ))}
                    </ResponsiveNav>
                </div>
            </Styles>
        );
    }
}

export default SubMenu;

const Styles = styled.div`
.rs-nav-tabs.rs-nav-horizontal .rs-nav-item.rs-nav-item-active > .rs-nav-item-content {
    border: 2px solid #000066;
    border-bottom-color: #fff;
}
.rs-nav-tabs.rs-nav-horizontal .rs-nav-item > .rs-nav-item-content {
    border-radius: 0 0 0 0;
}
.rs-nav .rs-dropdown .rs-dropdown-menu-active ~ .rs-dropdown-toggle, .rs-nav .rs-nav-item-active > .rs-nav-item-content, .rs-nav .rs-dropdown .rs-dropdown-menu-active ~ .rs-dropdown-toggle:hover, .rs-nav .rs-nav-item-active > .rs-nav-item-content:hover, .rs-nav .rs-dropdown .rs-dropdown-menu-active ~ .rs-dropdown-toggle:focus, .rs-nav .rs-nav-item-active > .rs-nav-item-content:focus, .rs-nav .rs-dropdown .rs-dropdown-menu-active ~ .rs-dropdown-toggle:active, .rs-nav .rs-nav-item-active > .rs-nav-item-content:active {
    color: #009999;
    background: #ffffff;
    margin-left:10px
    
}
.rs-nav-item > a.rs-nav-item-content {
    outline: none;
    margin-left:10px;
    width:150px;
    text-align:center;
}
.rs-nav-tabs.rs-nav-horizontal .rs-nav-waterline {
    border-top: 2px solid #000066;
    
}
.rs-nav-item > .rs-nav-item-content {
    font-size: 14px;
    color: #ffffff;
    -webkit-transition: all 0s; 
    transition: all 0s;
}
a {
    background-color: #009999;
}
.rs-dropdown-menu {
    margin: 0;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    border-radius: 0;
    padding: 0;
    width:150px;
    margin-left:10px
}
.rs-btn {
    border-radius: 0px;
}
.rs-dropdown-toggle, .rs-dropdown-toggle.rs-btn {
    margin-left:10px;
    width:150px;
    color:#fff
}
.rs-dropdown-menu > .rs-dropdown-item-active > .rs-dropdown-item-content, .rs-dropdown-menu > .rs-dropdown-item-active > .rs-dropdown-item-content:hover, .rs-dropdown-menu > .rs-dropdown-item-active > .rs-dropdown-item-content:focus {
    color: #009999;
}
.rs-dropdown-menu .rs-dropdown-item-content {
    color: #ffffff;
}
.rs-nav-tabs .rs-nav-item:not(.rs-nav-item-active):not(.rs-nav-item-disabled) > .rs-nav-item-content:hover, .rs-nav-tabs .rs-nav-item:not(.rs-nav-item-active):not(.rs-nav-item-disabled) > .rs-nav-item-content:focus {
    background: #009999; 
    color: #fff;
}
.rs-btn-subtle:focus, .rs-btn-subtle.rs-btn-focus, .rs-btn-subtle:hover {
    color: #fff;
    background: #009999; 
}
.rs-dropdown-menu > .rs-dropdown-item > .rs-dropdown-item-content:hover, .rs-dropdown-menu > .rs-dropdown-item > .rs-dropdown-item-content:focus {
    text-decoration: none;
    color: #fff;
    background-color: #009999;
}
.rs-nav-default .rs-nav-item:not(.rs-nav-item-disabled) .rs-ripple-pond, .rs-nav-tabs .rs-nav-item:not(.rs-nav-item-disabled) .rs-ripple-pond {
    display: none;
}
.rs-btn-default:not(.rs-btn-disabled) .rs-ripple-rippling,
.rs-btn-primary:not(.rs-btn-disabled) .rs-ripple-rippling,
.rs-btn-subtle:not(.rs-btn-disabled) .rs-ripple-rippling {
  -webkit-transition: all 0s;
  transition:  all 0s;
  transition:  all 0s;
  transition:  all 0s;
  -webkit-transform: scale(1);
          transform: scale(1);
  opacity: 0;
}
`;

