import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated } from 'react-native'; 
import Logo  from './composant/LogoScreen';

import { get_availables_by_user , get_availables_by_dispo } from "../api/pof-availables"; // API
import { get_user_by_id } from "../api/pof-users"; // API
import { api_post_meeting } from "../api/pof-meetings"; // API
import { get_spot_by_id } from "../api/pof-spots";
import moment from "moment"; 

 
export default class PersonneTrouveeScreen  extends React.Component {

	static navigationOptions = {
	  	title: 'PersonneTrouvee',
	};

	constructor(props) {
		super(props);
  
		// State
	    this.state = {
			latitude: 0,
			longitude: 0,
			gender: '',
			start: 0,
			end: 0,
			userId: 0,
			personId: '',
			firstname: '',
			availableId1: 0,
			availableId2: 0
		}  
		
		// Liste de genres (pour Swiper)
		this.sexes = [
            {label: 'Un homme', value: 'M' },
            {label: 'Une femme', value: 'F' },
            {label: 'Indifférent', value: 'I' }
		];
	}


	componentDidMount = () => {
		get_availables_by_user(1)
		.then(json => { 
			let gender = this.sexes.find(item => item.value === json[0].gender).label

			this.setState({
				mySpotId: json[0].spotId,
				start: json[0].start,
				end: json[0].end,
				gender: gender,
				availableId1: json[0].id,
				userId: json[0].userId,
			})

			get_availables_by_dispo( json[0].start , json[0].end , json[0].spotId , json[0].userId , json[0].gender )
			.then(json => { 

				this.setState({
					availableId2: json[0].id
				})

				get_user_by_id( json[0].userId )
				.then(json => { 

					this.setState({
						firstname: json[0].firstname,
						personId: json[0].userId
					})

					get_spot_by_id ( this.state.mySpotId )
					.then(json => {
						
						this.setState({
							mySpotName: json[0].name,
							mySpotAdresse: json[0].location.addressLine1,
							mySpotZipCode: json[0].location.zipeCode,
							mySpotCity: json[0].location.city
						})

					})
					.catch(error => { console.error(error) })

				})
				.catch(error => { console.error(error) })

			 })
			.catch(error => { console.error(error) })

		 })
		.catch(error => { console.error(error) })
	}


	/**
     *  FUNCTIONS
     */  

	_destinationRencontre = () => {

		api_post_meeting( this.state.userId , this.state.personId , moment().format('YYYY-MM-DD') , this.state.start , this.state.end , this.state.mySpotId )
		.then(json => { 
			this.props.navigation.navigate('DestinationRencontre', { meetingId: json })
		 })
		.catch(error => { console.error(error) })

    }


  

	// RENDER ------------------------------------------------------------------------------------------------------

	render() { 
	  	//var Navigation
	   	const {navigate} = this.props.navigation;
  
		return (
		  	<View style={styles.container}>
			  	<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>  
  
				  	<ImageBackground  source={require('../assets/images/Loader.png')} style={styles.img_bg}  >
  
						<Logo /> 
							
						<View >
							<Text style={styles.title_h1}>Super ! Vous allez rencontrez : <Text style={styles.title_h1_prenom}>{ this.state.firstname }</Text> !</Text>
						</View>
				
					</ImageBackground>
   
					  
				   	<View style={styles.recap}>
						<Text style={styles.recap_label} >Quand</Text>
						<Text style={[styles.text, styles.text_marginB]}>Entre { this.state.start }h et { this.state.end }h</Text>

						<Text style={styles.recap_label} >Où</Text>
						<Text style={styles.text}>{ this.state.mySpotName }</Text> 
						<Text style={[styles.text, styles.text_marginB]}>{ this.state.mySpotAdresse }, { this.state.mySpotZipCode } { this.state.mySpotCity }</Text> 

						<Text style={styles.recap_label} >Avec qui</Text>
						<Text style={[styles.text, styles.text_marginB]}>{this.state.gender} </Text>
					</View>
  
	
					<View style={styles.buttons}>

						<TouchableOpacity onPress={() => this._destinationRencontre() } >
							<View style={styles.button}> 
								<Text style={styles.button_text}> J'y vais !   </Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={() =>  navigate("DemarrerRencontre")}>
							<View style={styles.button_inverse}>
								<Text style={styles.button_text_inverse}> J'annule    </Text>
							</View>
						</TouchableOpacity>
					
						<TouchableOpacity onPress={() =>  navigate("DemarrerRencontre")} >
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
		fontSize: 16,
		fontFamily: 'Proza Libre',
		color: '#747474',  	 
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
  
	//TITRES 
	title_h1: {
		fontSize: 28, 
		textAlign: 'left',  
		fontWeight: '500', 
		fontFamily: 'Roboto Slab',
		color: '#333333',
		marginBottom: 10,
		marginTop: 30, 
		marginLeft: 10,
		marginRight: 20
	}, 
  
	title_h1_prenom:{
		color: 'black',
	}, 
  
	//TEXTES
	text: {
		marginLeft: 10, 
		marginRight: 0,
		color: '#747474', 
	  	fontSize: 16, 
	},
   
	text_marginB: {
		marginBottom: 10,
	},
	  
	//BOUTON 'OFFICIEL'
	buttons:{
		height: 150, 
	},
  
	button: { 
		backgroundColor: '#ffbd3c', 
		borderRadius: 50,
		marginLeft: 60,
		marginRight: 60,
		marginBottom: 10,
		color: 'white', 
		height: 40,
	},
	  
	button_inverse: {
		backgroundColor: 'white', 
		borderRadius: 50,
		marginLeft: 60,
		marginRight: 60,
		marginBottom: 10,
		color: 'black', 
		height: 40,
		borderColor: '#ffbd3c',
		borderWidth: 2, 
	},
  
	button_text:{
		fontSize: 18,
		paddingTop: 7, 
		alignSelf: 'center',
		color: 'white' , 
		marginLeft: 4,
	},
  
	button_text_inverse:{
		fontSize: 18,
		paddingTop: 7, 
		alignSelf: 'center',
		color: 'black' , 
		marginLeft: 4,
	},
	  
	button_retour: {
		color: '#333333',
		fontSize: 17,
		alignSelf: 'center',
		marginRight: 2,
	},
     
	// RECAPITULATIF
	recap: { 
		backgroundColor: '#F7F9F9',
		height: 210,
		alignItems: 'flex-start',
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 15,
		marginRight: 15,
	},
  
	recap_label: {
		color: '#333333',
		fontWeight: 'bold',  
	  	fontSize: 18,
		marginBottom: 5,
		paddingLeft: 10,
	},
	
});
  