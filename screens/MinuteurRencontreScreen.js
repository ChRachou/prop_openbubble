import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated, Easing, TextInput} from 'react-native';
import Logo  from './composant/LogoScreen';

export default class MinuteurScreen extends React.Component {
	static navigationOptions = {
		title: 'Minuteur',
	};

	constructor(props) {
	super(props);
	
    // State
		this.state = {
			stop: false,
			pause: false, 
			scale_blue: new Animated.Value(1),
			hour: 0,
			min: 2,
			sec: 0,
			finish: '',
		};
	}


	/**
     *  FUNCTION
     */

	//Lancement du timer au demargage de la page
	_lancement_timer = () => {
		//Vérification des secondes
		// Si les secondes sont inférieurs à 0
		if (this.state.sec <= 59 && this.state.sec > 0) {
			this.setState({
				sec: this.state.sec - 1,
			});
		}

		//Sinon j'enlève une minute et je relance les secondes
		//S'il y reste plus d'une minute
		if (this.state.sec == 0 && this.state.min > 0) {
			this.setState({
				sec: 59,
				min: this.state.min - 1,
			});
		}

		//Sinon je mets les minutes à 0
		if (this.state.min == 0 && this.state.sec == 0) {
			this.setState({
				stop: true,
			});
			clearInterval(this.time);
		}
	};

	_recommencer_timer = () => {
		this.setState({
			stop: false,
			min: 2,
			sec: 0,
		});
		this.time = setInterval(() => this._lancement_timer(), 1000);
		this._animation_blue();
	};

	_stop_timer = () => {
		this.setState({
			pause: true,
		});
		clearInterval(this.time); 
		this.state.scale_blue.stopAnimation(value => {
			console.log('fin animation' + value);
		});
	};

	_reprendre_timer = () => {
		this.setState({
			pause: false,
		});
		this.time = setInterval(() => this._lancement_timer(), 1000);
		this._animation_blue();
	};

	_arreter = () => {
		clearInterval(this.time);
		this.setState({
			min: 0,
			sec: 0,
			stop: false,
			pause: false,
		});
	};

	//Animation des bubbles 
	_animation_blue = () => {
		this.state.scale_blue.setValue(1);
		Animated.timing(this.state.scale_blue, {
			toValue: 1.2,
			duration: 800,
			easing: Easing.linear,
		}).start(o => {
			if (o.finished) {
				this._animation_blue();
			}
		});
	};  

	componentWillMount() {
		this.time = setInterval(() => this._lancement_timer(), 1000); 
		this._animation_blue();

		const { navigation } = this.props;
		this.setState({
			meetingId: navigation.getParam('meetingId')
		})
	}
	



	
	// RENDER ------------------------------------------------------------------------------------------------------   
 
	render() {
		{ /* VARIABLE DE NAVIGATION*/ }
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}>

					{/*LOGO*/}
					<Logo />

					{/*TITRE ET DESCRIPTION*/}
					<Text style={styles.title_h1}>Bon moment ! </Text>
					<Text style={styles.text}>Votre rencontre commence maintenant.</Text>

					{/*Minuteur*/}
					<View style={styles.minuteur}>
						<View>
							<Animated.View
								style={[
									styles.bubble_light_blue_opacity,
									{ transform: [{ scale: this.state.scale_blue }] },
								]}
							/>
							<View style={ styles.bubble_light_blue }>
							</View>
						</View>
					</View>

					{/* TIMER*/}
					<View style={styles.timer}>
						<Text style={styles.timer_min}>
							{' '}
							{this.state.hour < 10
								? '0' + this.state.hour
								: this.state.hour} :{' '}
							{this.state.min < 10 ? '0' + this.state.min : this.state.min} :{' '}
							{this.state.sec < 10 ? '0' + this.state.sec : this.state.sec}{' '}
						</Text>
					</View>

					{/*BOUTON STOP */}
					<View style={styles.buttons}>
						{!this.state.stop && (
							<View>
								{!this.state.pause && (
									<TouchableOpacity onPress={() => this._stop_timer()}>
										<View style={styles.button_inverse}>
											<Text style={styles.button_text_inverse}>Stop </Text>
										</View>
									</TouchableOpacity>
								)}
								{this.state.pause && (
									<View>
										<TouchableOpacity onPress={() => this._reprendre_timer()}>
											<View style={styles.button_inverse}>
												<Text style={styles.button_text_inverse}>
													Reprendre{' '}
												</Text>
											</View>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => this._arreter()}>
											<View style={styles.button_inverse}>
												<Text style={styles.button_text_inverse}>Arrêter</Text>
											</View>
										</TouchableOpacity>
										<TouchableOpacity onPress={() =>  navigate("QuestionnaireScreen", { meetingId: this.state.meetingId })}
										>
											<View style={styles.button}>
												<Text style={styles.button_text}>Questionnaire</Text>
											</View>
										</TouchableOpacity>
									</View>
								)}
							</View>
						)}
						{this.state.stop && (
							<View>
								<TouchableOpacity onPress={() => this._recommencer_timer()}>
									<View style={styles.button}>
										<Text style={styles.button_text}>Recommencer</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => navigate('QuestionnaireScreen', { meetingId: this.state.meetingId })}>
									<View style={styles.button}>
										<Text style={styles.button_text}>Questionnaire</Text>
									</View>
								</TouchableOpacity>
							</View>
						)}
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
  img_bg: {
    width: 390,
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

  //TITRES
  title_h1: {
    fontSize: 28,
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'Roboto Slab Bold',
    color: '#333333',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  //MINUTEUR
  minuteur: {
    flex: 1,
    //backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },

  //BOUTON 'OFFICIEL'
   

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

  button_text_inverse: {
    fontSize: 18,
    paddingTop: 7,
    alignSelf: 'center',
    color: 'black',
    marginLeft: 4,
  },

  button_text: {
    fontSize: 18,
    paddingTop: 7,
    alignSelf: 'center',
    color: 'white',
    marginLeft: 4,
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
    transform: [{ rotate: '120deg' }],
    marginRight: 90,
    marginBottom: -15,
  },

  bubble_light_blue_opacity: {
    height: 180,
    width: 180,
    backgroundColor: '#82d3f3',
    borderRadius: 100,
    opacity: 0.3,
    alignSelf: 'center',
    paddingTop: 25,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bubble_light_blue: {
    height: 150,
    width: 150,
    backgroundColor: '#82d3f3',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: -165,
    marginLeft: 3,
  },

  //TIMER
  timer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  timer_min: {
    fontSize: 24,
    fontFamily: 'Roboto Slab Bold',
  },
});
