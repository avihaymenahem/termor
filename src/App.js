import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './views/MainView';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<MainView/>
			</MuiThemeProvider>
		);
	}
}

export default App;
