import React, { Component } from 'react';
import { Table, Text } from 'evergreen-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import './FileSystemTable.style.css';

export default class FileSystemTable extends Component {
    state = {
        uniqueId: this._generateUniqueId()
    }

    constructor(props) {
        super(props);

        this._getIconByFileType = this._getIconByFileType.bind(this);
        this._renderTableChild = this._renderTableChild.bind(this);
        this._renderContextMenu = this._renderContextMenu.bind(this);
        this._handleContextMenuClick = this._handleContextMenuClick.bind(this);
    }

    _getIconByFileType(isDirectory) {
        return isDirectory ? (
            <FontAwesomeIcon icon={faFolder} color="rgba(125, 211, 250, 1)" size="lg"/>
        ) : (
            <FontAwesomeIcon icon={faFile} color="#ededed" size="lg"/>
        );
        
    }

    _generateUniqueId() {
        return Date.now().toString();
    }

    _handleContextMenuClick(e, data) {
        console.log("Clicked Context Menu", e, data);
    }

    _renderContextMenu() {
        return (
            <ContextMenu id={this.state.uniqueId}>
                <MenuItem data={{foo: 'bar'}} onClick={this._handleContextMenuClick}>
                Copy to target directory
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={this._handleContextMenuClick}>
                Rename
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={this._handleContextMenuClick}>
                Delete
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={this._handleContextMenuClick}>
                Refresh
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={this._handleContextMenuClick}>
                New Folder
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={this._handleContextMenuClick}>
                Edit Permissions
                </MenuItem>
            </ContextMenu>
        );
    }

    _renderTableChild(file) {
        return (
            <ContextMenuTrigger id={this.state.uniqueId} key={file.name}>
                <Table.Row onDoubleClick={this.props.rowClickhandler(file)}>
                    <Table.Cell>
                        <span className="file-type-icon-container">
                            {this._getIconByFileType(file.isDirectory)}
                        </span>
                        <span>
                            {file.name}
                        </span>
                    </Table.Cell>
                    <Table.Cell>
                        {file.isDirectory ? '--' : `${file.extraData.size} bytes`}
                    </Table.Cell>
                    <Table.Cell>
                        {file.isDirectory ? 'Folder' : 'File'}
                    </Table.Cell>
                    <Table.Cell>
                        Actions
                    </Table.Cell>
                </Table.Row>
            </ContextMenuTrigger>
        );
    }

    render() {
        const { tree } = this.props;
        console.log(tree);
        return (
            <React.Fragment>
                {this._renderContextMenu()}
                <Table height="100%" borderRight>
                    <Table.Head>
                        <Table.HeaderCell>
                            <Text>Name</Text>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Text>size</Text>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Text>kind</Text>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Text>actions</Text>
                        </Table.HeaderCell>
					</Table.Head>
                    <Table.VirtualBody height="100%">
                        {tree && tree.map(file => this._renderTableChild(file))}
                    </Table.VirtualBody>
                </Table>
            </React.Fragment>
        );
    }
}