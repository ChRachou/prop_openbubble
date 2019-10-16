import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
	};

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
				startAsync={this._loadResourcesAsync}
				onError={this._handleLoadingError}
				onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return (
				<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
				<AppNavigator />
				</View>
			);
		}
	}

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				'Roboto Slab': require('./assets/fonts/RobotoSlab-Regular.ttf'),
				'Roboto Slab Bold': require('./assets/fonts/Roboto-Slab-Bold.ttf'),
        'Proza Libre':  require('./assets/fonts/ProzaLibre-Regular.ttf'),
        'Proza Libre Medium':  require('./assets/fonts/ProzaLibre-Medium.ttf'),     
        'Open Sans Light': require('./assets/fonts/OpenSans-Light.ttf'),     
      }),
    ]);
  };

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
