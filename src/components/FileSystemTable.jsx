import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

export default class FileSystemTable extends PureComponent {

    constructor(props) {
        super(props);

        this._getIconByFileType = this._getIconByFileType.bind(this);
        this._renderTableChild = this._renderTableChild.bind(this);
    }

    _getIconByFileType(isDirectory) {
        return isDirectory ? (
            <FontAwesomeIcon icon={faFolder} color="rgba(125, 211, 250, 1)" size="lg"/>
        ) : (
            <FontAwesomeIcon icon={faFile} color="white" size="lg"/>
        );
    }

    _renderTableChild(file) {
        return (
            <tr key={file.name}>
                <td>
                    <span className="file-type-icon-container">
                        {this._getIconByFileType(file.isDirectory)}
                    </span>
                    <span onDoubleClick={this.props.rowClickhandler(file)}>
                        {file.name}
                    </span>
                </td>
                <td>
                    {file.isDirectory ? '--' : `${file.extraData.size} bytes`}
                </td>
                <td>
                    {file.isDirectory ? 'Folder' : 'File'}
                </td>
            </tr>
        );
    }

    render() {
        const { tree } = this.props;
        return (
            <Table
                hover
                dark>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>size</th>
                        <th>type</th>
                    </tr>
                </thead>
                <tbody>
                    {tree && tree.map(file => this._renderTableChild(file))}
                </tbody>
            </Table>
        );
    }
}