import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground,Image, Animated, Easing, TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements'; 
import Logo from './composant/LogoScreen';

export default class QuestionnaireScreen extends React.Component {
	static navigationOptions = {
		title: 'Envoie',
	};

	constructor(props) {
        super(props);  
        
		// State
        this.state = { 
          scale: new Animated.Value(1),
          scale_blue: new Animated.Value(1),  
      	}
 
    }

    	// Animation des bubbles
	_animation = () => {
		this.state.scale.setValue(1);
		Animated.timing(this.state.scale, {
            toValue: 1.2,
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
  
  componentDidMount() {
    this._animation();
			this._animation_blue();
  }
     
 	  
   


	// RENDER ------------------------------------------------------------------------------------------------------   
	 
 
	render() {
    { /* VARIABLE DE NAVIGATION*/ }
		const { navigate } = this.props.navigation;
		return (
            <View style={styles.container}> 

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                      <Logo/> 
                      
                      {/*TITRE ET DESCRIPTION*/}
                      <Text style={styles.title_h1}>Merci !</Text>
                      <Text style={styles.text}>Vos réponse nous aident à améliorer notre application en continue</Text>
                       


                     {/*ANIMATION BUBBLE*/} 
                    <View style={styles.bubbles}>
                      <View style={styles.img_bubbles}>
                        <View>
                            <Animated.View style={[styles.bubble_pink, { 
                              transform: [{ scale: this.state.scale }],
                            }]} />
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
                    </View>
                  </View>
 

                    {/*BOUTON*/}
                    <TouchableOpacity onPress={() => navigate('DemarrerRencontre')}>
										<View style={styles.button_inverse}>
											<Text style={styles.button_text_inverse}>Nouvelle rencontre</Text>
										</View>
									</TouchableOpacity>

                   
                 
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
        paddingTop: 5,
        paddingBottom: 10, 
    },
  
    contentContainer: {
        paddingTop: 0,
    },

     
    //TEXTES
    text: {
      marginLeft: 10,
      marginRight: 10,
      color: '#747474',
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

//BOUTON OFFICIEL
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



     // LES BUBBLES
  bubbles: {
    paddingTop: 5,
    height: 210,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },

  img_bubbles: {
    height: 200,
  },

  bubble_pink: {
    height: 47,
    width: 47,
    backgroundColor: '#eb396e',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 5,
  },

  bubble_yellow: {
    height: 64,
    width: 64,
    backgroundColor: '#ffbd3c',
    borderRadius: 15,
    alignSelf: 'center',
    transform: [{ rotate: '120deg' }],
    marginRight: 90,
  },

  bubble_light_blue_opacity: {
    height: 91,
    width: 91,
    backgroundColor: '#82d3f3',
    borderRadius: 50,
    opacity: 0.3,
    alignSelf: 'center',
    paddingBottom: 60,
    marginTop: -10,
    marginLeft: 30,
  },

  bubble_light_blue: {
    height: 38,
    width: 38,
    backgroundColor: '#82d3f3',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: -65,
    marginLeft: 30,
  },


});