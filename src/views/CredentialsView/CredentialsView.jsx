import React, { Component } from 'react';
import Credentials from '../../services/DB/Credentials';
import WithLayout from '../../HOC/WithLayout';
import { Table, Text, SideSheet } from 'evergreen-ui';
import { Pane, Heading, Button, majorScale, IconButton, toaster } from 'evergreen-ui';
import NewCredentialsPartial from '../Partials/NewCredentialsPartial';

import './CredentialsView.style.css';

class CredentialsView extends Component {
    state = {
        credentialsList: [],
        drawerOpen: false
    };

    constructor(props) {
        super(props);
        this.credentials = new Credentials();

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(item) {
        this.credentials.find({}).then(items => {
            if(item) {
                items.push(item);
            }
            this.setState({ credentialsList: items })
        });
    }

    openDrawer() {
        this.setState({ drawerOpen: true });
    }

    closeDrawer() {
        this.setState({ drawerOpen: false });
    }

    _deleteButtonClickHandler(item) {
        return () => {
            this.credentials.delete(item).then(() => {
                this.loadData();
                toaster.notify(`Item ${item.label} removed`);
            });
        }
    }

    _renderTableChild(item) {
        return (
            <Table.Row key={item.label}>
                <Table.Cell>
                    <Text>
                    	{item.label}
                    </Text>
                </Table.Cell>
                <Table.Cell>
                    <Text>
                        {item.username}
                    </Text>
                </Table.Cell>
                <Table.Cell>
                    <IconButton
                        icon="trash"
                        intent="danger"
                        marginRight={majorScale(1)}
                        onClick={this._deleteButtonClickHandler(item)}
                    />
                    <IconButton icon="edit" />
                </Table.Cell>
            </Table.Row>
         );
    }

    render() {
        const self = this;
        const { credentialsList } = self.state;

        return(
            <React.Fragment>
                <Pane
                    borderBottom
                    display="flex"
                    alignItems="center"
                    height={69}
				>
					<Pane
						flex={8}
						padding={majorScale(2)}
					>
                        <Heading>Credentials</Heading>
                    </Pane>
					<Pane
						flex={2}
						display="flex"
						justifyContent="flex-end"
						padding={majorScale(2)}
					>
                        <Button onClick={self.openDrawer}>Add Credentials</Button>
                    </Pane>
                </Pane>
                <Pane height="100%">
					<SideSheet
						isShown={self.state.drawerOpen}
						onCloseComplete={() => self.setState({ drawerOpen: false })}
						containerProps={{
							display: 'flex',
							flex: '1',
							flexDirection: 'column',
                        }}
                        children={({close}) => (
                            <NewCredentialsPartial onClose={(item) => { close(); self.loadData(item); }}/>
                        )}
					>
					</SideSheet>
					<Table height="100%">
						<Table.Head>
							<Table.HeaderCell>
								<Text>Label</Text>
							</Table.HeaderCell>
							<Table.HeaderCell>
								<Text>Username</Text>
							</Table.HeaderCell>
							<Table.HeaderCell>
								<Text>Actions</Text>
							</Table.HeaderCell>
						</Table.Head>
						<Table.Body height="calc(100% - 100px)">
							{credentialsList && credentialsList.map(item => self._renderTableChild(item))}
						</Table.Body>
					</Table>
				</Pane>
            </React.Fragment>
        );
    }
}

export default WithLayout(CredentialsView);