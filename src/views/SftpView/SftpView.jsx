import React, { PureComponent } from 'react';
import WithLayout from '../../HOC/WithLayout';
import { Pane, Text } from 'evergreen-ui';
import FileSystemTable from '../../components/FileSystemTable/FileSystemTable';
import FileSystem from '../../services/FileSystem';
import FTP from '../../services/FTP';

import './SftpView.style.css';

class SftpView extends PureComponent {
    state = {
        currentLocalRoute: "/",
        currentRemoteRoute: "/",
        localTree: [],
        remoteTree: []
    };

    constructor(props){
        super(props);
        this.localRouteOrRoot = this.localRouteOrRoot.bind(this);
        this.remoteRouteOrRoot = this.remoteRouteOrRoot.bind(this);
        this._rowClickhandler = this._rowClickhandler.bind(this);
    }

    async componentDidMount() {
        const ftp = new FTP();
        await ftp.connect();
        
        let remoteTree = [];

        try {
            remoteTree = await ftp.readDirectoryContents(this.remoteRouteOrRoot());
        } catch(e) {

        }
        const localTree = await FileSystem.readDirectoryContents(this.localRouteOrRoot());
        this.setState({
            localTree,
            remoteTree
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentLocalRoute !== prevState.currentLocalRoute) {
            FileSystem.readDirectoryContents(this.localRouteOrRoot())
                .then(tree => this.setState({
                    localTree: this._manipulateFileTree(tree)
                }));
        }
    }

    _manipulateFileTree(tree) {
        const route = this.state.currentLocalRoute;
        if(route === "/") 
            return;

        const routeSplit = route.split("/");
        routeSplit.splice(-1, 2);

        tree.unshift({
            name: '..',
            isDirectory: true,
            fullPath: routeSplit.join("/")
        })

        return tree;
    }

    localRouteOrRoot() {
        return this.state.currentLocalRoute || "/";
    }

    remoteRouteOrRoot() {
        return this.state.currentRemoteRoute || "/";
    }

    _rowClickhandler(file) {
        return () => {
            if(file.isDirectory) {
                this.setState({ currentLocalRoute: file.fullPath });
            }
        };
    }

    render() {
        return (
            <Pane height="100%" display="flex" flexDirection="column">
                <Pane height="100%" flex={1} display="flex" flexDirection="row">
                    <Pane flex={1}>
                        <Text>
                            Local: <span>{this.localRouteOrRoot()}</span>
                        </Text>
                    </Pane>
                    <Pane flex={1}>
                        <Text>
                            Remote: <span>{this.remoteRouteOrRoot()}</span>
                        </Text>
                    </Pane>
                </Pane>
                <Pane height="100%" flex={19} display="flex" flexDirection="row">
                    <Pane flex={1}>
                        <FileSystemTable className="file-system-table" rowClickhandler={this._rowClickhandler} tree={this.state.localTree}/>
                    </Pane>
                    <Pane flex={1}>
                        <FileSystemTable className="file-system-table" rowClickhandler={this._rowClickhandler} tree={this.state.remoteTree}/>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default WithLayout(SftpView);