import React, { PureComponent } from 'react';
import WithLayout from '../HOC/WithLayout';
import { Container, Row, Col } from 'reactstrap';
import FileSystemTable from '../components/FileSystemTable';
import FileSystem from '../services/FileSystem';

class SftpView extends PureComponent {
    state = {
        currentRoute: "/",
        tree: []
    };

    constructor(props){
        super(props);
        this.routeOrRoot = this.routeOrRoot.bind(this);
        this._rowClickhandler = this._rowClickhandler.bind(this);
    }

    componentDidMount() {
        FileSystem.readDirectoryContents(this.routeOrRoot())
            .then(tree => this.setState({tree}));
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentRoute !== prevState.currentRoute) {
            FileSystem.readDirectoryContents(this.routeOrRoot())
                .then(tree => this.setState({
                    tree: this._manipulateFileTree(tree)
                }));
        }
    }

    _manipulateFileTree(tree) {
        const route = this.state.currentRoute;
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

    routeOrRoot() {
        return this.state.currentRoute || "/";
    }

    _rowClickhandler(file) {
        return () => {
            if(file.isDirectory) {
                this.setState({ currentRoute: file.fullPath });
            }
        };
    }

    render() {
        return (
            <div style={{ height: '100%', overflow: 'scroll', padding: '10px' }}>
                <Container fluid>
                    <Row>
                        <Col>
                            <span>{this.routeOrRoot()}</span>
                        </Col>
                    </Row>
                    <Row noGutters>
                        <Col>
                            <FileSystemTable rowClickhandler={this._rowClickhandler} tree={this.state.tree}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default WithLayout(SftpView);