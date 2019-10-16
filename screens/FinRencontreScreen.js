import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class FinRencontreScreen extends React.Component {
	static navigationOptions = {
		title: 'Questionnaire'
	};
	

	constructor(props) {
		super(props); 

		// State
		this.state = {
			
		}
	}

	/**
     *  FUNCTION
     */




	// RENDER ------------------------------------------------------------------------------------------------------   

	render() {
		//var Navigation
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
					<View>
						<Text>OpenBubble</Text>
						<Text>Sortez de votre bulle !</Text>
					</View>

					<View>
						<Text>Nous espérons que votre rencontre se soit bien passée.</Text>
					</View>

					<View>
						<Text>Questionnaire</Text>
					</View>

					<View>
						<TouchableOpacity onPress={() => navigate('EnvoyerQuestionnaire') } >
						<Text>Envoyer mes réponses</Text>
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity onPress={() => navigate('Accueil')} >
						<Text>Passer et répondre plus tard</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>
			</View>
		)
	}
}




// STYLES ------------------------------------------------------------------------------------------------------


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
