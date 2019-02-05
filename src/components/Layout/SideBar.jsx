import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowAltCircleRight, faCode, faFolder, faServer } from "@fortawesome/free-solid-svg-icons";

const staticListItems = [
    {
        name: 'Hosts',
        isActive: true,
        icon: faServer
    },
    {
        name: 'SFTP',
        icon: faFolder
    },
    {
        name: 'Port Forwarding',
        icon: faArrowAltCircleRight
    },
    {
        name: 'Snippets',
        icon: faCode
    },
    {
        name: 'History',
        icon: faHistory
    }
]

export default class SideBar extends PureComponent {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li className="extra-height">
                        Avihay@three-dev.com
                    </li>
                    {staticListItems.map((item) => (
                        <li key={item.name} className={item.isActive ? 'active' : ''}>
                            <span className="icon">
                                <FontAwesomeIcon icon={item.icon}/>
                            </span>
                            <span className="text">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}