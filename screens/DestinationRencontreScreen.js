import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'; 
import { MapView } from 'expo';
import Logo  from './composant/LogoScreen.js';

import { get_by_id } from "../api/pof-meetings";
import { get_spot_by_id } from "../api/pof-spots";

export default class DestinationRencontreScreen extends React.Component {
	static navigationOptions = {
		title: 'Destination',
	};

	constructor(props) {
		super(props);

		// State
		this.state = {
			latitude: 0,
			longitude: 0
		}
	}


	/**
     *  FUNCTION
     */
   
	componentDidMount() {
		const { navigation } = this.props;
		const meetingId = navigation.getParam('meetingId');

		get_by_id( meetingId )
		.then(json => { 

			this.setState({
				meetingId: meetingId
			})


			get_spot_by_id ( json[0].spotId )
			.then(json => {
				
				this.setState({
					mySpotName: json[0].name,
					mySpotAdresse: json[0].location.addressLine1,
					mySpotZipCode: json[0].location.zipCode,
					mySpotCity: json[0].location.city,
					latitude: json[0].location.latitude,
					longitude: json[0].location.longitude
				})

			})
			.catch(error => { console.error(error) })

		})
		.catch(error => { console.error(error) })
	} 


 
	// RENDER ------------------------------------------------------------------------------------------------------

	render() {
        //var Navigation
		const { navigate } = this.props.navigation;
       
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

					<ImageBackground  source={require('../assets/images/Loader.png')} style={styles.img_bg}  >

						<Logo/> 

						{ this.state.latitude != 0 &&
							<MapView
							style={styles.map}
							region={{
								latitude: this.state.latitude,
								longitude: this.state.longitude,
								latitudeDelta: 0.0043,
								longitudeDelta: 0.0034 }} >

								<MapView.Marker
									coordinate={ {latitude: this.state.latitude, longitude: this.state.longitude} }
									title={ this.state.mySpotName }
									description={'Ma destination'}
									key={0} />
							</MapView>
						}

					</ImageBackground>

					<View style={styles.destination}>
						<Text style={styles.destination_text_label}>DESTINATION </Text>
						<Text style={[styles.destination_text, {fontWeight: "bold"}]}>{ this.state.mySpotName }</Text>
						<Text style={styles.destination_text}> { this.state.mySpotAdresse }, { this.state.mySpotZipCode } { this.state.mySpotCity }</Text>
					</View>

					<View style={styles.buttons}>
						{/* <TouchableOpacity  onPress={() =>  navigate('ChatRencontre')} > */}
						<TouchableOpacity  onPress={() =>  navigate('MinuteurRencontre', { meetingId: this.state.meetingId })} >
							<View style={styles.button}>
								<Text style={styles.button_text}> J'y suis !   </Text>
							</View>
						</TouchableOpacity>
			
						<TouchableOpacity  onPress={() =>  navigate("PersonneTrouvee")} >
							<Text style={styles.button_retour}>Retour</Text>
						</TouchableOpacity> 
					</View> 

				</ScrollView>
			</View>
		);
	}
}



// STYLES ------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
	//PAGE GLOBAL
	container: {
		flex: 1,
		backgroundColor: '#fff',
		fontSize: 18,
		fontFamily: 'Proza Libre',
		color: '#747474',
		paddingTop: 10,
		paddingBottom: 10, 
	},
	contentContainer: {
		paddingTop: 0,
	},  

	//BACKGROUND
	img_bg :{
		width:  390,
		height: 200,
		marginRight: 0,
		marginBottom: 0, 
	},
  
	//DESTINATION
	map: {
		height: 200,
		width: 400
	},

  	destination: {
		height: 100,
		marginLeft: 15,
		marginRight: 10,
		marginBottom: 15, 
		borderColor: "black",
		paddingTop: 10,
		paddingBottom: 10,
		borderTopColor: "black",
		borderTopWidth: 1,
  	},

	destination_text_label:{
		color: "#323232", 
		textTransform: "uppercase",   
	},

	destination_text: {
		color: "#323232",
		fontSize: 16, 
	},

	   
	//BOUTON 'OFFICIEL'
    buttons:{
		height: 80,
    }, 

    button: {
        backgroundColor: '#82D2F2',
        borderRadius: 50,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 10,
        color: 'white',
        height: 40, 
    },

    button_text:{
        fontSize: 18,
        paddingTop: 7,
        alignSelf: 'center',
        color: 'white' ,
        marginLeft: 4,
	},

    button_retour: {
        color: '#333333',
        fontSize: 17,
        alignSelf: 'center',
        marginRight: 2,
    }

});
