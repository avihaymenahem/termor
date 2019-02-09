import React, { PureComponent } from 'react';
import SideBar from './SideBar';
import { Pane } from 'evergreen-ui'; 

export default class Layout extends PureComponent {
    render() {
        return (
            <Pane
                height="100%"
                display="flex" 
                flexDirection="row">
                <Pane
                    borderRight
                    width={250}>
                    <SideBar/>
                </Pane>
                <Pane
                flex={1}>
                    {this.props.children}
                </Pane>
            </Pane>
        );
    } 
}