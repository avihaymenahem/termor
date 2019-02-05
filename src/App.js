import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainView from './views/MainView';
import RDPView from './views/RDPView';
import NotYetExistView from './views/NotYetExistView';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={MainView}/>
					<Route path="/rdp" exact component={RDPView}/>
					<Route path="/notexist" exact component={NotYetExistView}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
