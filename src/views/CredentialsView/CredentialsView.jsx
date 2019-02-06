import React, { PureComponent } from 'react';
import Credentials from '../../services/DB/Credentials';
import WithLayout from '../../HOC/WithLayout';
import { Nav, Navbar, NavbarBrand, NavItem, Table, Button } from 'reactstrap';
//import CredentialsModel from '../services/DB/Models/CredentialsModel';
import NewCredentialsPartial from '../Partials/NewCredentialsPartial';
import Drawer from '../../components/Drawer/Drawer';

import './CredentialsView.style.css';

class CredentialsView extends PureComponent {
    state = {
        credentialsList: [],
        drawerOpen: false
    };

    constructor(props) {
        super(props);
        this.credentials = new Credentials();

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);

        // const credModel = new CredentialsModel();
        // credModel.username = "test";
        // credModel.password = "password";
        // credModel.description = "Testing Purposes";
        // credModel.displayName = "QA Testing User";

        // this.credentials.insert(credModel);
    }

    async componentDidMount() {
        const credentialsList = await this.credentials.find({});
        
        if(credentialsList) {
            this.setState({ credentialsList })
        }
    }

    openDrawer() {
        this.setState({ drawerOpen: true });
    }

    closeDrawer() {
        this.setState({ drawerOpen: false });
    }

    render() {
        const { credentialsList } = this.state;

        return(
            <React.Fragment>
                <Navbar color="dark">
                    <NavbarBrand>Credentials</NavbarBrand>
                    <Nav navbar>
                        <NavItem onClick={this.openDrawer}>
                            Add Credentials
                        </NavItem>
                    </Nav>
                </Navbar>
                <div style={{ padding: 10 }}>
                <Drawer content={NewCredentialsPartial} isOpened={this.state.drawerOpen} onClose={this.closeDrawer}/>
                    <Table
                        dark>
                        <thead>
                            <tr>
                                <th>Display Name</th>
                                <th>description</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {credentialsList && credentialsList.map(item => (
                                <tr key={item._id}>
                                    <td>{item.displayName}</td>
                                    <td>{item.description}</td>
                                    <td className="actions-container">
                                        <span>Edit</span>
                                        <span className="spacer"/>
                                        <span>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </React.Fragment>
        );
    }
}

export default WithLayout(CredentialsView);