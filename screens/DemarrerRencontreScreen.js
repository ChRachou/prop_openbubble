import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated, Easing, Image } from 'react-native'; 
import { Slider } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import { MapView } from 'expo';
import Swiper from 'react-native-swiper';
import moment from "moment"; 
import Logo  from './composant/LogoScreen.js'; 

import { api_post_available } from "../api/pof-availables"; // API
import { get_all_spots } from "../api/pof-spots";

export default class DemarrerRecontreScreen extends React.Component {

	static navigationOptions = {
		title: 'Rencontre',
	};

	constructor(props) {
		super(props);
		
		// Calcul de l'heure courante + 1
		this.hourNow = moment().hour()
		this.timeNow = this.hourNow
		this.hourThen = this.hourNow == 23 ? 0 : parseInt(this.hourNow + 1)
		this.hourThen = this.hourThen < 10 ? '0' + this.hourThen : this.hourThen
		this.timeThen = this.hourThen

		// State
		this.state = {
			edit: true, // Boolean pour le mode édition
			etape: 1, // Première étape par défaut

      start: this.timeNow, // Heure de début de la disponibilité
			end: this.timeThen, // Heure de fin de la disponibilité

			latitude: 0, // Latitude pour la map
			longitude: 0, // Longitude pour la map
			geoloc_error: '', // Erreur de la map

			gender: 'M', // Genre par défaut

			scale: new Animated.Value(1),
			scale_blue: new Animated.Value(1),

			trouve: false, // Boolean si une personne est trouvée

			spots: [], // Array des spots
			mySpot: 1,
			mySpotIndex: 0
		}

		// Liste de genres (pour Swiper)
		this.sexes = [
            {label: 'Un homme', value: 'M' },
            {label: 'Une femme', value: 'F' },
            {label: 'Indifférent', value: 'I' }
		];
	}



	// Map
	componentDidMount() {
		// Instead of navigator.geolocation, just use Geolocation.
		// if (hasLocationPermission) {
			Geolocation.getCurrentPosition(
				(position) => {
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					})

					// Recherche de spot dans le périmètre de l'utilisateur
					// api_post_spot_search( position.coords.latitude , position.coords.longitude )
					// 	.then(json => { console.log(json) })
					// 	.catch(error => { console.error(error) })
				},
				(error) => {
					// See error code charts below.
					this.setState({
						geoloc_error: error.code + ': ' + error.message
					})
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			); 


			get_all_spots()
			.then( json => { 
				this.setState({
					spots: json
				})
			} )
			.catch( error => console.log(error) )
	}


	/**
     *  FUNCTIONS
     */

	// Update state au swipe des genders
	_handleChange_gender = (val) => {
		this.setState({
			gender: this.sexes[val].value
		})
	}

	// Update state à la sélection du temps de disponibilité
	_handleChange_time = (value) => {
		if (value > this.timeThen) {
			this.setState({
				end: value
			})
		} else {
			this.setState({
				end: this.timeThen
			})
		}
	}

	_handleChange_spot = ( id ) => {
		this.setState({
			mySpot: this.state.spots[id].spotId,
			mySpotIndex: id
		})
	}

	// Update state à la fin de l'édition
	_resumeRencontre = (e) => {
		this.setState({
			edit: false
		})

		// API : Création d'une nouvelle disponibilité
		api_post_available (
			1, 
			this.state.start, 
			this.state.end, 
			this.state.latitude,
			this.state.longitude,
			// this.state.gender 
			"M",
			this.state.mySpot
		).then(json => { 
			api_post_available (
				2, 
				this.state.start, 
				this.state.end, 
				this.state.latitude,
				this.state.longitude,
				// this.state.gender 
				"F",
				this.state.mySpot
			).then(json => { /*console.log(json)*/ })
			.catch(error => { console.error(error) })
		 })
		.catch(error => { console.error(error) })

		
	}

	// Update state au changement de "Page" (suivante)
	_button_suivant = () => {
		let updateEtape = this.state.etape;

		if (this.state.etape <= 3) {
			updateEtape++
		} else if (this.state.etape == 4) {
			this._resumeRencontre();
			this._animation();
			this._animation_blue();
			this._redirection();

			updateEtape = 0
		}

		this._update_etape(updateEtape)
	}

	// Update state au changement de "Page" (précédente)
	_button_retour = () => {
		let updateEtape = this.state.etape;

		if (this.state.etape <= 4 && this.state.etape > 1) {
			updateEtape--
		} else if (this.state.edit == false) {
			this.setState({
				edit: true
			})

			updateEtape = 4
		}

		this._update_etape(updateEtape)
	}
	
	// Update state à la modification de l'étape
	_update_etape = (num) => {
		this.setState({
			etape: num
		})
	}

	// Fonction attente avant rediction sur une autre page
	_redirection = () => {
		setTimeout(() => {   
			this.state.scale.stopAnimation((value) => {
				console.log('fin animation'+ value)
			});

			this.state.scale_blue.stopAnimation((value) => {
				console.log('fin animation'+ value)
			}); 
			this._state_personne_trouve();
		}, 6000); 
	};

	// Update state quand une personne est trouvée
    _state_personne_trouve = () => {
		this.setState({
			trouve: true
        })
	}	  

	/**
     *  ANIMATIONS
     */

	// Animation des bubbles
	_animation = () => {
		this.state.scale.setValue(1);
		Animated.timing(this.state.scale, {
            toValue: 1.5,
            duration: 2000,
            easing: Easing.linear
		}).start((o) => {
            if(o.finished) {
              this._animation();
            }
        });
	}

	_animation_blue = () => {
		this.state.scale_blue.setValue(1);
		Animated.timing(this.state.scale_blue, {
			toValue: 1.3,
			duration: 800,
			easing: Easing.linear
		}).start((o) => {
			if(o.finished) {
				this._animation_blue();
			}
		});
	}


	// RENDER ------------------------------------------------------------------------------------------------------


	render() {
		// Var Navigation
		const {navigate} = this.props.navigation;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> 

					<ImageBackground  source={require('../assets/images/Loader.png')} style={styles.img_bg}  >

						<Logo/>

						{/* ETAPE 1 */}
						{ this.state.etape == 1 &&
							<View >
								<Text style={styles.title_h1}>Retrouvez la joie de la rencontre !</Text>
							</View>
						}

						{/* ETAPE 2 */}						
						{ this.state.etape == 2 &&
							<View >
								<Text style={[styles.title_h2, styles.title_h2_margin ]}>Deuxième étape</Text>
								<Text  style={styles.text} >Choisissez l'endroit de la rencontre.</Text>
							</View>
						}

						{/* ETAPE 3 */}
						{ this.state.etape == 3 &&
							<View  >
								<Text style={[styles.title_h2, styles.title_h2_margin ]}>Troisième étape</Text>
								<Text style={styles.text}>Qui souhaitez-vous rencontrer ?</Text>
							</View>
						}

						{/* ETAPE 4 */}
						{ this.state.etape == 4 &&
							<View  >
								<Text style={[styles.title_h2, styles.title_h2_margin ]}>Vérification</Text>
								<Text style={[styles.text, styles.text_marginR]}>Voici un récapitulatif de vos choix (touchez pour modifier): </Text>
							</View>
						}

						{/* Recherche personne */}
						{ !this.state.edit &&
							<View  >
								<Text style={styles.title_h1}>Nous cherchons votre prochaine rencontre !</Text>
							</View>
						}

					</ImageBackground>

					{ this.state.edit &&

						<View style={styles.container_rencontre }>

							{/* ETAPE 1 */}
							{ this.state.etape == 1 &&

								<View>

									<View>
										<Text style={styles.title_h2}>Première étape</Text>
										<Text style={styles.text} >Quand souhaiterez-vous faire votre prochaine rencontre ?</Text>
									</View>

									<View style={styles.slider}>
										<Text style={styles.title_slider}> AUJOURD'HUI</Text>
										<Slider
											value={this.state.end}
											minimumValue={0}
											maximumValue={24}
											animateTransitions={true}
											step={1}
											onValueChange={value => this._handleChange_time(value)} />

										<Text style={styles.title_slider}>ENTRE { this.state.start }H ET { this.state.end }h</Text>
									</View>
								</View>
							}

							{/* ETAPE 2 */}
							{ this.state.etape == 2 &&

								<View>
									{this.state.geoloc_error ? <Text>Error: {this.state.geoloc_error}</Text> : null}

									{ this.state.latitude != 0 &&
										<View>
											<MapView
											style={styles.map}
											region={
												{
													latitude: this.state.latitude,
													longitude: this.state.longitude,
													latitudeDelta: 0.0043,
													longitudeDelta: 0.0034,
												}
											}
											>

											<MapView.Marker
												coordinate={ {latitude: this.state.latitude, longitude: this.state.longitude} }
												title={'Moi'}
												description={'Je suis ici'}
												key={0}
												/>

												{ this.state.spots.length != 0 && 
													this.state.spots.map((spot, index) => {
														return (
															<MapView.Marker
																coordinate={ { latitude: spot.location.latitude , longitude: spot.location.longitude } }
																title={ spot.name }
																description={ spot.description }
																key={ spot.spotId } />
														)
													})
												}
											</MapView>
										</View>
									}

									<Swiper style={styles.adresses} showsButtons={false} showsPagination={false}
											onIndexChanged={(index) => {
												this._handleChange_spot(index)
											}}  >
										{ this.state.spots.length != 0 && 
											this.state.spots.map((spot, index) => {
												return (
													<View style={styles.carte_adresse} key={ spot.spotId } >
														<Text style={styles.title_adresse}>SPOT n°{ index + 1 }</Text>
														<Text style={styles.ville_adresse}>{ spot.name }</Text>
														<Text style={styles.adresse}>{ spot.location.addressLine1 }, { spot.location.zipCode } { spot.location.city }</Text>
													</View>
												)
											})
										}
									</Swiper>

								</View>
							}

							{/* ETAPE 3 */}
							{this.state.etape == 3 &&

								<View>
									<Swiper style={styles.wrapper} showsPagination={false}
											onIndexChanged={(index) => {
												this._handleChange_gender(index)
											}}  >
										 <View style={styles.slide1}>
                  <Image style={{width:340, height: 235  }} source={require('../assets/images/homme.png')} 
                  />
                  <Text style={{textTransform: "uppercase", marginTop: 5, color: "#737373", fontSize: 16}}> Un Homme </Text>
                </View>
                <View style={styles.slide2}>
                  <Image style={{width:340, height: 235}}source={require('../assets/images/femme.png')} 
                    />
                    <Text style={{textTransform: "uppercase", marginTop: 5, color: "#737373", fontSize: 16}}> Un Femme </Text>
                </View>
                <View style={styles.slide3}>
                  <Image style={{width:340, height: 235  }}source={require('../assets/images/indifferent.png')} />
                  <Text style={{textTransform: "uppercase", marginTop: 5, color: "#737373", fontSize: 16}}> Indifférent </Text>
                </View>
									</Swiper>
								</View>
							}

							{/* ETAPE 4 */}
							{this.state.etape == 4 &&
								<View  style={styles.verif} >
									{/* <ScrollView>

									</ScrollView> */}

									<TouchableOpacity onPress={() => { this._update_etape(1) }} >
										<View style={styles.carte_verif}  >
											<Text style={styles.recap_label} >Quand ?</Text>
											<Text style={styles.text}>Entre { this.state.start }h et { this.state.end }h</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity onPress={() => { this._update_etape(2) }}  >
										<View style={styles.carte_verif}  >
											<Text style={styles.recap_label} >Où ?</Text>
											<Text style={styles.text}>{ this.state.spots[ this.state.mySpotIndex ].name }</Text>
											<Text style={styles.text}>{ this.state.spots[ this.state.mySpotIndex ].location.addressLine1 }, { this.state.spots[ this.state.mySpotIndex ].location.zipCode } { this.state.spots[ this.state.mySpotIndex ].location.city }</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity onPress={() => { this._update_etape(3)  }}  >
										<View style={styles.carte_verif}  >
											<Text style={styles.recap_label} >Avec qui ?</Text>
											<Text style={styles.text}>{ this.sexes.find(item => item.value === this.state.gender).label } </Text>
										</View>
									</TouchableOpacity> 
								</View>
							}

							{/* Boutons Suivant et Retour */}
							{ this.state.etape < 4 &&
								<View style={styles.buttons_slides}>

									<View style={[this.state.etape == 1 ? styles.button_slides_actif : styles.button_slides_inactif]} >
										<TouchableOpacity onPress={() => { this._button_suivant()  }} style={styles.buton_slides_actif}>
											<Text style={styles.button_text}>   </Text>
										</TouchableOpacity>
									</View>

									<View style={[ this.state.etape == 2 ? styles.button_slides_actif :  styles.button_slides_inactif ]}>
										<TouchableOpacity onPress={() => { this._button_retour()  }} style={styles.buton_slides_inactif}>
											<Text style={styles.button_text}>   </Text>
										</TouchableOpacity>
									</View>

									<View style={[ this.state.etape == 3 ? styles.button_slides_actif :  styles.button_slides_inactif ]}>
										<TouchableOpacity onPress={() => { this._button_retour()  }} style={styles.buton_slides_inactif}>
											<Text style={styles.button_text}>   </Text>
										</TouchableOpacity>
									</View>

								</View>
							}

							<View style={styles.buttons}>
								<TouchableOpacity onPress={() => { this._button_suivant()  }}>
									<View style={styles.button}>
										{ this.state.etape < 4 &&
											<Text style={styles.button_text}> Suivant   </Text>
										}
										{ this.state.etape == 4 &&
											<Text style={styles.button_text}> C'est parti !  </Text>
										}
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => { this._button_retour()  }}>
									<Text style={styles.button_retour}>Retour</Text>
								</TouchableOpacity>
							</View>

						</View>
					}
					
					{ !this.state.edit &&

						<View>
							<View>
								<Text style={styles.text} >Nous vous avertirons dès qu'une personne sera disponible.</Text>
							</View>

							<View style={styles.recap}>
								<Text style={styles.recap_label} >Quand ?</Text>
								<Text style={[styles.text, styles.text_marginB]}>Entre { this.state.start }h et { this.state.end }h</Text>

								<Text style={styles.recap_label} >Où ?</Text>
								<Text style={[styles.text, styles.text_marginB]}>{ this.state.spots[ this.state.mySpotIndex ].name }</Text>
								<Text style={[styles.text, styles.text_marginB]}>{ this.state.spots[ this.state.mySpotIndex ].location.addressLine1 }, { this.state.spots[ this.state.mySpotIndex ].location.zipCode } { this.state.spots[ this.state.mySpotIndex ].location.city }</Text>

								<Text style={styles.recap_label} >Avec qui ?</Text>
								<Text style={[styles.text, styles.text_marginB]}>{ this.sexes.find(item => item.value === this.state.gender).label } </Text>
							</View>

							{ !this.state.trouve && 
								<View style={styles.img_bubbles}>
									<View> 
										<Animated.View style={[styles.bubble_pink, { 
											transform: [{ scale: this.state.scale }],
										}]} />
									</View>

									<View>
										<View>
											<Animated.View style={[styles.bubble_yellow, { 
													transform: [{ scale: this.state.scale }],
												}]} />
										</View>
										<View>
											<Animated.View style={[styles.bubble_light_blue_opacity, { 
													transform: [{ scale: this.state.scale }],
												}]} />
											<View > 
												<Animated.View style={[styles.bubble_light_blue, { 
														transform: [{ scale: this.state.scale_blue }],
													}]} />
											</View>
										</View>
									</View>
								</View> 
							}

							{this.state.trouve &&

								<View style={styles.buttons} >
									<TouchableOpacity onPress={ () => navigate('PersonneTrouvee') }>
										<View style={[styles.button, {marginTop: 20}]}> 
											<Text style={styles.button_text}> OK !</Text> 
										</View>
									</TouchableOpacity>  
								</View>

							} 
						
							<TouchableOpacity onPress={() => { this._button_retour()  }}>
								<Text style={styles.button_retour}>Retour</Text>
							</TouchableOpacity>

						</View>

					}

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

	map: {
		height: 200,
		width: 400
	},

	container_rencontre:{
		marginRight: 10,
		marginLeft: 10,
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
	},

	title_h2: {
        fontSize: 18,
        textAlign: 'left',
		fontWeight: '300',
		color: '#212121',
		opacity: 0.8,
		marginLeft: 10,
		marginBottom: 10,
	},

	 title_h2_margin : {
		marginTop: 20,
	 },

	 //TEXTES
	 text: {
		marginLeft: 10,
		marginRight: 0,
		color: '#747474',
	 },

	 text_marginR: {
		 marginRight: 20,
	 },

	 text_marginB: {
		marginRight: 10,
	},

	// SLIDER
	slider: {
		backgroundColor: '#F7F9F9',
		height: 110,
		justifyContent: 'center',
		marginBottom: 20,
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 10,
	},

	title_slider: {
		textTransform: 'uppercase',
		color: '#707171',
	},

	 //BOUTONS SLIDES
	 buttons_slides: {
        height: 20,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',

    },

    button_slides_actif: {
        height: 10,
        width: 10,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    button_slides_inactif: {
        height: 10,
        width: 10,
        backgroundColor: '#C4C4C4',
        alignSelf: 'center',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
	},

	//BOUTON 'OFFICIEL'
    buttons:{
		height: 80,
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
	},

	//ADRESSES

	adresses: {
		backgroundColor: '#F7F9F9',
		height: 125,
		alignItems: 'center',
	},

	carte_adresse: {
		backgroundColor: 'white',
		height: 100,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		//borderBottomWidth: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
		fontSize: 16,
		marginRight: 10,
		marginLeft: 20,
		marginTop: 10,
		marginBottom: 10,
		width: 290,
	},

	title_adresse: {
		color: '#747474',
		marginBottom: 5,
	},

	ville_adresse: {
		color: '#333333',
		fontWeight: 'bold',
	},

	//SWIPER

	wrapper: {
		backgroundColor: '#F7F9F9',
		height: 270,
		alignItems: 'center',
		marginTop: -40,
	},
	slide1: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center', 
	  marginTop: 10,
	  marginRight: 10,
	  marginBottom: 10,
	  marginLeft:10,
	},
	slide2: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center', 
	  marginTop: 10,
	  marginRight: 10,
	  marginBottom: 10,
	  marginLeft:10,
	},
	slide3: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center', 
	  marginTop: 10,
	  marginRight: 10,
	  marginBottom: 10,
	  marginLeft:10,
	},
	texte: {
	  color: '#fff',
	  fontSize: 30,
	  fontWeight: 'bold',
	  marginTop: 10,
	  marginRight: 10,
	  marginBottom: 10,
	  marginLeft:10,
	},

	//VERIFICATION
	verif: {
		backgroundColor: '#F7F9F9',
		height: 320,
		alignItems: 'center',
		paddingLeft: 10,
		paddingBottom: 10,
		paddingTop: 10,
		marginTop: -30,
		marginBottom: 10,
	},

	carte_verif: {
		backgroundColor: 'white',
		height: 80,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		//borderBottomWidth: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
		fontSize: 16,
		marginRight: 10,
		marginLeft: 20,
		marginTop: 10,
		marginBottom: 10,
		width: 290,
	},


	// RECAPITULATIF
	recap: {
		backgroundColor: '#F7F9F9',
		height: 170,
		alignItems: 'flex-start',
		paddingLeft: 10,
		paddingTop: 10,
		marginTop: 10,
	},

	recap_label: {
		color: '#333333',
		fontWeight: 'bold',  
    fontSize: 18,
		marginBottom: 5,
		paddingLeft: 10,
	},


	//IMAGE DE BUBBLE
	img_bubbles:{
		height: 130,
		marginBottom: 10,
		marginTop: 10,
	},

	bubble_pink: {
		height: 37,
		width: 37,
		backgroundColor: '#eb396e',
		borderRadius: 30,
		alignSelf: 'center',
		marginTop: 5,
	},

	bubble_yellow: {
		height: 44,
		width: 44,
		backgroundColor: '#ffbd3c',
		borderRadius: 30,
		alignSelf: 'center',
		transform: [{ rotate: '120deg'}],
		marginRight: 90,
		marginBottom: -15,
	},

	 bubble_light_blue_opacity: {
		 height: 71,
		 width: 71,
		 backgroundColor: '#82d3f3',
		 borderRadius: 50,
		 opacity: 0.3,
		 alignSelf: 'center',
		 paddingBottom: 60,
		 marginTop: -25,
		 marginLeft: 30,
	 },

	 bubble_light_blue: {
		 height: 38,
		 width: 38,
		 backgroundColor: '#82d3f3',
		 borderRadius: 30,
		 alignSelf: 'center',
		 marginTop: -55,
		 marginLeft: 30,
	 },




});
