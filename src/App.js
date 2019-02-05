import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainView from './views/MainView';
import RDPView from './views/RDPView';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={MainView}/>
					<Route path="/rdp" exact component={RDPView}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
