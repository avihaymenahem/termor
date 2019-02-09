import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Pane, Text, Heading } from 'evergreen-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowAltCircleRight, faCode, faFolder, faServer, faCog, faLaptop, faLock } from "@fortawesome/free-solid-svg-icons";
import { majorScale } from 'evergreen-ui/commonjs/scales';

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
        route: "/credentials"
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
                <Pane borderTop padding={10} flexDirection="row" display="flex" hoverElevation={3}>
                    <Pane marginRight={majorScale(1)}>
                        <FontAwesomeIcon icon={item.icon}/>
                    </Pane>
                    <Pane>
                        <Text>{item.name}</Text>
                    </Pane>
                </Pane>
            </NavLink>
        );
    }

    render() {
        return (
            <Pane>
                <Pane height={68} display="flex" alignItems="center">
                    <Heading size={600} flex={1} textAlign="center">
                        Termor
                    </Heading>
                </Pane>
                {staticListItems.map((item) => this._renderListItemChild(item))}
            </Pane>
        );
    }
}