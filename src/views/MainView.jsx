import React, { Component } from 'react';
import WithLayout from '../HOC/WithLayout';
import Terminal from '../components/Terminal';
import { Button } from 'reactstrap';

class MainView extends Component {
	connectInputRef = null;
	state = {
		connectQuery: null 
	};

	constructor(props) {
		super(props);

		this._connectButtonHandler = this._connectButtonHandler.bind(this);
	}

	_connectButtonHandler() {
		this.setState({
			connectQuery: this.connectInputRef.value
		});
		this.connectInputRef.value = "";
	}

	renderTopConnectBar() {
		return (
			<div className="top-connect-bar">
				<input placeholder="ssh user@hostname -p port..." ref={ref => this.connectInputRef = ref}/>
				<Button
					size="sm"
					variant="outlined"
					color="secondary"
					onClick={this._connectButtonHandler}>
					Connect
				</Button>
			</div>
		);
	}

    render() {
		return (
			<React.Fragment>
				{this.renderTopConnectBar()}
				<Terminal value={this.state.connectQuery}/>
			</React.Fragment>
		);
    }
}

export default WithLayout(MainView);