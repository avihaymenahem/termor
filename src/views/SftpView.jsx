import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import WithLayout from '../HOC/WithLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import FileSystem from '../services/FileSystem';

class SftpView extends PureComponent {
    state = {
        currentRoute: "/",
        fileTree: []
    };

    constructor(props){
        super(props);
        this.state = {};
        this._renderPrevFolderTableChild = this._renderPrevFolderTableChild.bind(this);
        this._folderClickedHandler = this._folderClickedHandler.bind(this);
        this._renderTableChild = this._renderTableChild.bind(this);
        this.routeOrRoot = this.routeOrRoot.bind(this);
    }

    routeOrRoot() {
        return this.state.currentRoute || "/";
    }

    componentDidMount() {
        FileSystem.readDirectoryContents(this.routeOrRoot()).then(fileTree => {
            this.setState({fileTree})
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentRoute !== prevState.currentRoute) {
            FileSystem.readDirectoryContents(this.routeOrRoot()).then(fileTree => {
                this.setState({fileTree})
            });
        }
    }

    _folderClickedHandler(isDir, route) {
        return () => isDir && this.setState({currentRoute: route});
    }

    _renderTableChild(file) {
        return (
            <tr key={file.name}>
                <td>
                    <span style={{ marginRight: '10px' }}>
                        {file.isDirectory ? (
                            <FontAwesomeIcon icon={faFolder} color="rgba(125, 211, 250, 1)" size="lg"/> 
                        ) : (
                            <FontAwesomeIcon icon={faFile} color="white" size="lg"/>
                        ) }
                    </span>
                    <span onClick={this._folderClickedHandler(file.isDirectory, file.fullPath)}>
                        {file.name}
                    </span>
                </td>
                <td>
                    {file.isDirectory ? '--' : `${file.extraData.size} bytes`}
                </td>
                <td>{file.isDirectory ? 'Folder' : 'File'}</td>
            </tr>
        )
    }

    _renderPrevFolderTableChild() {
        const self = this;
        const currentFolderRoute = self.routeOrRoot();
        
        if(currentFolderRoute !== "/") {
            const currentRouteExploded = currentFolderRoute.split("/");
            currentRouteExploded.splice(-1,2);
            
            return self._renderTableChild({
                name: '..',
                isDirectory: true,
                fullPath: currentRouteExploded.join("/")
            })();
        }

        return null;
    }

    render(){
        const self = this;
        const { fileTree } = self.state;
        const currentFolderRoute = self.routeOrRoot();
        
        return (
            <div style={{ height: '100%', overflow: 'scroll', padding: '10px' }}>
                <span>{currentFolderRoute}</span>
                <Table
                    dark>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>size</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {self._renderPrevFolderTableChild()}
                        {fileTree && fileTree.map(file => self._renderTableChild(file))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default WithLayout(SftpView);