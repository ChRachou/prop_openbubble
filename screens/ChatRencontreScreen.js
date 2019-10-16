import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated, Easing, TextInput} from 'react-native';
import Logo  from './composant/LogoScreen';

export default class ChatRencontreScreen extends React.Component {
	static navigationOptions = {
		title: 'Chat',
	};

	constructor(props) {
		super(props); 

		// State
		this.state = {
			prenom: "Emma",  
			scale: new Animated.Value(1),
			scale_blue: new Animated.Value(1),
			attente: true,
			message: "",
		}
	}


	/**
     *  FUNCTION
     */

	//Animation des bubbles
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

    _message_arrive =() =>{
        this.setState({
            attente: false,
        })
    }
 
    componentDidMount() {
      	//Lancement d'animation
      	this._animation();
		this._animation_blue(); 

		//Time out le temps de l'animation
        setTimeout(() => {   
            this.state.scale.stopAnimation((value) => {
              	console.log('fin animation'+ value)
            });

            this.state.scale_blue.stopAnimation((value) => {
              	console.log('fin animation'+ value)
            });

            this._message_arrive();
		}, 6000);
    }

	
	// RENDER ------------------------------------------------------------------------------------------------------   
  
 
	render() {
		//var Navigation
		const {navigate} = this.props.navigation;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

					<ImageBackground  source={require('../assets/images/Loader.png')} style={styles.img_bg}  >
					  	<Logo/> 

						<View > 
							<Text style={styles.title_h1}>Demasquez votre inconnu(e) ! </Text> 
						</View>
					</ImageBackground>

					<Text  style={[styles.text, styles.text_marginT, styles.text_marginR]} >Vous allez rencontrez {this.state.prenom} à l'endroit convenu. Pour vous reconnaître, décrivez vous brièvement à l'aide de ce chat.</Text>

					<View style={styles.chat}>
						{ this.state.attente &&
							<View>
								<View> 
									<Animated.View style={[styles.bubble_pink, { 
										transform: [{ scale: this.state.scale }],
									}]} />
								</View>

								<View>
									<View >
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

						{ !this.state.attente &&
							<View>
								<ScrollView>
									<Text> Les futurs messages </Text>
								</ScrollView>
							</View>
						}

					</View>
 
					<View style={styles.buttons}>
						<TouchableOpacity onPress={() =>  navigate('MinuteurRencontre')} >
							<View style={styles.button}>
								<Text style={styles.button_text}>[Icone] Je l'ai vu !   </Text>
							</View>
						</TouchableOpacity>
             
						<TextInput
							style={styles.input}
							onChangeText={(text) => this.setState({text})}
							value={this.state.text} placeholder="Ecrivez votre message"
						/>
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
  
    //TEXTES
		text: {
		marginLeft: 10,
		marginRight: 20,
		color: '#747474',
		fontSize: 16, 
	},

    text_marginR: {
		marginRight: 50,
    },

	text_marginT: {
		marginTop: -20,
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
		marginRight: 10,
	},

    //CHAT
    chat:{
		flex: 1,
		borderTopColor: "black",
		borderTopWidth: 1,
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 15,
		paddingBottom: 10,
    },
	   
	//BOUTON 'OFFICIEL'
    buttons:{
		height: 130,
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
  
  	//IMAGE DE BUBBLE 
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

   // MESSAGE
	input : {
		borderColor: "#747474",
		height: 40,
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 30,
		paddingLeft: 10,
	}

});
