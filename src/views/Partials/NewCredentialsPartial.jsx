import React, { Component } from 'react';
import { Pane, Heading, Card, Button, TextInputField } from 'evergreen-ui';
import { majorScale } from 'evergreen-ui/commonjs/scales';
import Credentials from '../../services/DB/Credentials';
import CredentialsModel from '../../services/DB/Models/CredentialsModel';
import StringValidator from '../../services/StringValidator';

export default class NewCredentialsPartial extends Component {
    state = {
        username: {
            value : null,
            error : null
        },
        password: {
            value : null,
            error : null
        },
        label: {
            value : null,
            error : null
        }
    };

    constructor(props) {
        super(props);

        this._saveButtonClickHandler = this._saveButtonClickHandler.bind(this);
    }

    _saveButtonClickHandler() {
        let { username, password, label } = this.state;
        let usernameError, passwordError, labelError;
        let hasErrors = false;

        let usernameValidation = new StringValidator(username.value, "username");
        try {
            usernameValidation.checkLength(3,30);
        } catch(e) {
            hasErrors = true;
            usernameError = e;
        }

        let passwordValidation = new StringValidator(password.value, "password");
        try {
            passwordValidation.checkLength(6,30);
        } catch(e) {
            hasErrors = true;
            passwordError = e;
        }

        let labelValidation = new StringValidator(label.value, "label");
        try {
            labelValidation.checkLength(3,30);
        } catch(e) {
            hasErrors = true;
            labelError = e;
        }

        if(!hasErrors) {
            this.saveCredentialsToDB(this.props.onClose);
        } else {
            this.setState((prevState) => {
                prevState.username.error = usernameError;
                prevState.password.error = passwordError;
                prevState.label.error = labelError;
                return prevState;
            })
        }
    }

    saveCredentialsToDB(callback) {
        const credModel = new CredentialsModel();
        credModel.username = this.state.username.value;
        credModel.password = this.state.password.value;
        credModel.label = this.state.label.value;

        const creds = new Credentials();
        creds.insert(credModel).then((newDocument => {
            callback(newDocument);
        }));
    }

    render() {
        const extraProps = {
            username: {
                isInvalid : !!this.state.username.error,
                validationMessage: this.state.username.error
            },
            password: {
                isInvalid : !!this.state.password.error,
                validationMessage: this.state.password.error
            },
            label: {
                isInvalid : !!this.state.label.error,
                validationMessage: this.state.label.error
            }
        };

        return (
            <React.Fragment>
                <Pane
                    zIndex={1}
                    flexShrink={0}
                    elevation={0}
                    backgroundColor="white"
                    display="flex"
                    flexDirection="row"
                >
                    <Pane flex={8}
                        display="flex"
                    >
                        <Heading 
                            display="flex"
                            alignItems="center"
                            size={400}
                            padding={majorScale(2)}
                        >
                            Add credentials
                        </Heading>
                    </Pane>
                    <Pane display="flex" justifyContent="flex-end" flex={2} padding={16}>
                        <Button onClick={this._saveButtonClickHandler}>Save</Button>
                    </Pane>
                </Pane>
                <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
                    <Card
                        backgroundColor="white"
                        elevation={0}
                        minHeight={240}
                        display="flex"
                        padding={majorScale(2)}
                        flexDirection="column"
                    >
                        <TextInputField
                            width="100%"
                            label="Label"
                            required
                            placeholder="label"
                            {...(extraProps.label)}
                            onChange={e => {
                                const value = e.target.value;
                                this.setState((prevState) => {
                                    prevState.label.value = value;
                                    return prevState;
                                })
                            }}
                            />
                        <TextInputField
                            width="100%"
                            label="Username"
                            required
                            placeholder="username"
                            {...(extraProps.username)}
                            onChange={e => {
                                const value = e.target.value;
                                this.setState((prevState) => {
                                    prevState.username.value = value;
                                    return prevState;
                                })
                            }}
                            />
                        <TextInputField
                            width="100%"
                            label="Password"
                            required
                            type="password"
                            placeholder="password"
                            {...(extraProps.password)}
                            onChange={e => {
                                const value = e.target.value;
                                this.setState((prevState) => {
                                    prevState.password.value = value;
                                    return prevState;
                                })
                            }}
                            />
                    </Card>
                </Pane>
            </React.Fragment>
        )
    }
}