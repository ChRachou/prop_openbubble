import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

import { get_user_login } from "../api/pof-users";

export default class ConnexionScreen extends React.Component {
    static navigationOptions = {
        title: 'Connexion',
    };

    constructor(props) {
        super(props)

        this.state = {
            code: '',
            telephone: '',
			password: '',
			b64password: '',
			source: 'app'
		}
    }

    _handleChange = (value, name) => {
        this.setState({
            [name]: value
		})
	}
	
	_connexion = () => {
		// fetch() retourne une Promise
		get_user_login(this.state.code , this.state.telephone, this.state.password) 
			.then(json => {
				console.log(json)
				console.log('toto')
			})
			.catch(error => {
				console.error(error)
				console.log('titi')
			})

		// this.props.navigation.navigate("DemarrerRencontre")
	}

  	render() {
		// Var Navigation
		const {navigate} = this.props.navigation;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				
					<View>
						<Text>OpenBubble</Text>
						<Text>Sortez de votre bulle !</Text>
					</View>

					<View>
						<Text>Bienvenue</Text>
					</View>

					<View>
						<Text>[LOGO]</Text>
					</View>

					<View>
						<Input 
							placeholder='Code'
							onChangeText={(value) => this._handleChange(value, "code")}
							name="code"
							keyboardType={'phone-pad'} 
							/>
					</View>

					<View>
						<Input
							placeholder='Téléphone'
							onChangeText={(value) => this._handleChange(value, "telephone")}
							name="telephone"
							keyboardType={'phone-pad'} 
							/>
					</View>

					<View>
						<Input
							placeholder='Mot de passe'
							onChangeText={(value) => this._handleChange(value, "password")}
							name="password"
							secureTextEntry={true}/>
					</View>

					<View>
						<TouchableOpacity onPress={() => { this._connexion(); }} >
							<Text>Connexion</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		paddingTop: 30,
	},
	helpLink: {
		paddingVertical: 15,
	},
});
