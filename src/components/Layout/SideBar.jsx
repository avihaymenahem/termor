import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowAltCircleRight, faCode, faFolder, faServer, faCog, faLaptop, faLock } from "@fortawesome/free-solid-svg-icons";

const staticListItems = [
    {
        name: 'Hosts',
        icon: faServer,
        route: "/"
    },
    {
        name: 'RDP',
        icon: faLaptop,
        route: "/rdp"
    },
    {
        name: 'SFTP',
        icon: faFolder,
        route: "/sftp"
    },
    {
        name: 'Port Forwarding',
        icon: faArrowAltCircleRight,
        route: "/notexist"
    },
    {
        name: 'Snippets',
        icon: faCode,
        route: "/notexist"
    },
    {
        name: 'Credentials',
        icon: faLock,
        route: "/notexist"
    },
    {
        name: 'Settings',
        icon: faCog,
        route: "/notexist"
    },
    {
        name: 'History',
        icon: faHistory,
        route: "/notexist"
    }
]

export default class SideBar extends PureComponent {

    _renderListItemChild(item) {
        return (
            <NavLink exact to={item.route} key={item.name} activeClassName='active'>
                <li>
                    <span className="icon">
                        <FontAwesomeIcon icon={item.icon}/>
                    </span>
                    <span className="text">{item.name}</span>
                </li>
            </NavLink>
        );
    }

    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li className="extra-height title">
                        Termor
                    </li>
                    {staticListItems.map((item) => this._renderListItemChild(item))}
                </ul>
            </div>
        );
    }
}