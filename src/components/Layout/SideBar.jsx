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
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li className="extra-height title">
                        Termor
                    </li>
                    {staticListItems.map((item) => (
                        <Link to={item.route}>
                            <li key={item.name} className={item.isActive ? 'active' : ''}>
                                <span className="icon">
                                    <FontAwesomeIcon icon={item.icon}/>
                                </span>
                                    <span className="text">{item.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
}