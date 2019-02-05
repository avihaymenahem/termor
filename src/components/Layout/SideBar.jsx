import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHistory, faArrowAltCircleRight, faCode, faFolder, faServer, faCog, faLaptop } from "@fortawesome/free-solid-svg-icons";

const staticListItems = [
    {
        name: 'Hosts',
        isActive: true,
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
        route: "/"
    },
    {
        name: 'Port Forwarding',
        icon: faArrowAltCircleRight,
        route: "/"
    },
    {
        name: 'Snippets',
        icon: faCode,
        route: "/"
    },
    {
        name: 'Settings',
        icon: faCog,
        route: "/"
    },
    {
        name: 'History',
        icon: faHistory,
        route: "/"
    }
]

export default class SideBar extends PureComponent {

    _renderListItemChild(item) {
        return (
            <Link to={item.route} key={item.name}>
                <li className={item.isActive ? 'active' : ''}>
                    <span className="icon">
                        <FontAwesomeIcon icon={item.icon}/>
                    </span>
                    <span className="text">{item.name}</span>
                </li>
            </Link>
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