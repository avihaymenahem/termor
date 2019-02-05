import React, { PureComponent } from 'react';
import Layout from '../components/Layout/Layout';
import Terminal from '../components/Terminal';

class MainView extends PureComponent {

	renderTopConnectBar() {
		return (
			<div className="top-connect-bar">
				<input placeholder="ssh user@hostname -p port..."/>
				<button>Connect</button>
			</div>
		);
	}

    render() {
		return (
			<Layout>
				{this.renderTopConnectBar()}
				<Terminal/>
			</Layout>
		);
    }
}

export default MainView;