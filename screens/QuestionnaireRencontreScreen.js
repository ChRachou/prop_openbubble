import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground,Image, Animated, Easing, TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';

import { get_by_id } from "../api/pof-meetings";
import { get_user_by_id } from "../api/pof-users";
import { api_post_survey } from "../api/pof-surveys";
import { get_spot_by_id } from "../api/pof-spots";
import Logo from './composant/LogoScreen';

export default class QuestionnaireScreen extends React.Component {
	static navigationOptions = {
		title: 'Questionnaire',
	};

	constructor(props) {
        super(props);  
        
		// State
        this.state = {  
            etape: 1,
            nbQuestion: 5,
            question_1: {
                question: "Votre rencontre avec [] a-t-elle respecté les codes éthiques d'OpenBubble ?",
                reponse: true
            },
            question_2: {
                question: "Comment qualiferiez vous votre rencontre avec [] ?",
                reponse: "top"
            },
            question_3: {
                question: "Est-ce que [] est un endroit propice pour à votre rencontre ?",
                reponse: "oui"
            },
            question_4: {
                question: "Pour garantir la sécurité de tous, pouvez-vous confirmez le genre de [] :",
                reponse: "homme"
            },
            question_5: {
                question: "Avez-vous un commentaire sur votre rencontre ou sur le lieu ?",
                reponse: ""
            }
      	}
 
    }
    

    /**
     *  FUNCTION
     */

 	// Update state au changement de "Page" (suivante)
     _button_suivant = () => {
		let updateEtape = this.state.etape;

		if (this.state.etape <= 4) {
			updateEtape++
		} 

		this._update_etape(updateEtape)
	}

	// Update state au changement de "Page" (précédente)
	_button_retour = () => {
		let updateEtape = this.state.etape;

		if (this.state.etape <= 4 && this.state.etape > 1) {
			updateEtape--
		}

		this._update_etape(updateEtape)
    }
    

	// Update state à la modification de l'étape
	_update_etape = (num) => {
		this.setState({
			etape: num
		})
    }

    _handleChange = (questionNb, value) => {
        let key = `question_${questionNb}`

        this.setState({
            [key]: {
               ...this.state[key],
               reponse: value
            }
        })
    }
    
    _envoyerQuestionnaire = () => {
        const questionsArray = []

        for (let index = 1; index <= this.state.nbQuestion; index++) {
            questionsArray.push( this.state[`question_${index}`] )
        }

        api_post_survey ( this.state.userId , this.state.meetingId , questionsArray )
        .then(json => { 
            this.props.navigation.navigate("EnvoyerQuestionnaire")
        })
        .catch(error => { console.error(error) })
    } 
	
 
    componentDidMount() {
        const { navigation } = this.props;
        const meetingId = navigation.getParam('meetingId');
        
        // Get the meeting
        get_by_id( meetingId )
		.then(json => { 

            this.setState({
                userId: json[0].userId,
                personId: json[0].person.userId
            })

            get_spot_by_id ( json[0].spotId )
			.then(json => {
				
				this.setState({
                    question_3: {
                        ...this.state.question_3,
                        question: this.state.question_3.question.replace('[]', json[0].name)
                    },
                })

                // Get the person
                get_user_by_id( this.state.personId )
                .then(json => { 

                    this.setState({
                        firstname: json[0].firstname,
                        meetingId: meetingId,

                        question_1: {
                            ...this.state.question_1,
                            question: this.state.question_1.question.replace('[]', json[0].firstname)
                        },
                        question_2: {
                            ...this.state.question_2,
                            question: this.state.question_2.question.replace('[]', json[0].firstname)
                        },
                        question_4: {
                            ...this.state.question_4,
                            question: this.state.question_4.question.replace('[]', json[0].firstname)
                        }
                    })
                    
                })
                .catch(error => { console.error(error) })
			})
            .catch(error => { console.error(error) })
		})
		.catch(error => { console.error(error) })  
    }

   


	// RENDER ------------------------------------------------------------------------------------------------------   
	 
 
	render() {
		return (
            <View style={styles.container}> 

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <ImageBackground  source={require('../assets/images/Loader.png')} style={styles.img_bg}  > 

                        <Logo/> 

                    </ImageBackground>

                    
                    {/*DESCRIPTIF*/}
                    {this.state.etape == 1 &&
                        <View style={styles.margin_top_block} > 
                    
                        <Text style={styles.title_h1}>Votre rencontre avec : { this.state.firstname }</Text>

                            <View>
                                <Text style={styles.text} >Nous prenons très au sérieux le faite d'être le&nbsp;moyen de rencontrer des inconnus en&nbsp;toute confiance. Aussi, après chaque rendez-vous, nous vous posons quelques questions pour nous assurer que tout s'est bien passé.</Text>
                            </View>

                        </View> 
                    }


                    {/*PREMIERE QUESITON*/}
                    {this.state.etape == 1 &&
                        <View>
                            <Text style={styles.title_h1}>Question n°1 : </Text>
                            <View style={styles.bloc_question}>
                                <Text style={[styles.text, {textTransform: "uppercase"}]} >{ this.state.question_1.question }</Text>
                                <CheckBox title='Oui' checked={this.state.question_1.reponse} onPress={ () => this._handleChange(1, true) } />
                                <CheckBox title='Non' checked={!this.state.question_1.reponse} onPress={ () => this._handleChange(1, false) } />                                
                            </View>
                        </View>
                    }

                     {/*DEUXIEME QUESITON*/}
                     {this.state.etape == 2 &&
                        <View style={styles.margin_top_block} >
                            <Text style={styles.title_h1}>Question n°2 : </Text>
                            <View style={styles.bloc_question}>
                                <Text style={[styles.text, {textTransform: "uppercase"}]} >{ this.state.question_2.question }</Text>
                                <CheckBox title='TOP' checked={this.state.question_2.reponse == "top"} onPress={ () => this._handleChange(2, "top") } />
                                <CheckBox title='SUPER' checked={this.state.question_2.reponse == "super"} onPress={ () => this._handleChange(2, "super") } />
                                <CheckBox title='BIEN' checked={this.state.question_2.reponse == "bien"} onPress={ () => this._handleChange(2, "bien") } />
                                <CheckBox title='CORRECT' checked={this.state.question_2.reponse == "correct"} onPress={ () => this._handleChange(2, "correct") } />
                                <CheckBox title='NAZE' checked={this.state.question_2.reponse == "naze"} onPress={ () => this._handleChange(2, "naze") } />
                            </View>
                        </View>
                    }

                   
                    {/*TROISIEME QUESITON*/}
                    {this.state.etape == 3 &&
                        <View style={styles.margin_top_block} >
                            <Text style={styles.title_h1}>Question n°3 : </Text>
                            <View style={styles.bloc_question}>
                                <Text style={[styles.text, {textTransform: "uppercase"}]} >{ this.state.question_3.question }</Text>
                                <CheckBox title='OUI' checked={this.state.question_3.reponse == "oui"} onPress={ () => this._handleChange(3, "oui") } />
                                <CheckBox title='NON' checked={this.state.question_3.reponse == "non"} onPress={ () => this._handleChange(3, "non") } />
                                <CheckBox title='Nous sommes allés ailleurs' checked={this.state.question_3.reponse == "ailleurs"} onPress={ () => this._handleChange(3, "ailleurs") } />
                                <CheckBox title='Je ne veux pas répondre' checked={this.state.question_3.reponse == "no_reponse"} onPress={ () => this._handleChange(3, "no_reponse") } /> 
                            </View>
                        </View>
                    }

                    {/*QUATRIEME QUESITON*/}
                    {this.state.etape == 4 &&
                        <View style={styles.margin_top_block} >
                            <Text style={styles.title_h1}>Question n°4 : </Text>
                            <View style={styles.bloc_question}>
                                <Text style={[styles.text, {textTransform: "uppercase"}]} >{ this.state.question_4.question }</Text>
                                <CheckBox title='Un homme' checked={this.state.question_4.reponse == "homme"} onPress={ () => this._handleChange(4, "homme") } />
                                <CheckBox title='Une femme' checked={this.state.question_4.reponse == "femme"} onPress={ () => this._handleChange(4, "femme") } />
                                <CheckBox title='Je ne veux pas répondre' checked={this.state.question_4.reponse == "no_reponse"} onPress={ () => this._handleChange(4, "no_reponse") } /> 
                            </View>

                            <View style={styles.bloc_question}>
                                <Text style={[styles.text, {textTransform: "uppercase"}]} >{ this.state.question_5.question }</Text>
                                <TextInput
                                    style={{height: 40, borderColor: '#F7F9F9', borderWidth: 1}}
                                    onChangeText={ value => this._handleChange(5, value) }
                                    value={this.state.question_5.reponse}
                                    placeholder={"Commentaires"}
                                    multiline={true}  /> 
                            </View>
                        </View>
                    }

                    {/*BOUTON SLIDES*/}
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

                        <View style={[ this.state.etape == 4 ? styles.button_slides_actif :  styles.button_slides_inactif ]}>
                            <TouchableOpacity onPress={() => { this._button_retour()  }} style={styles.buton_slides_inactif}>
                                <Text style={styles.button_text}>   </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/*BOUTON DE NAVIGATION*/}
                    <View style={styles.buttons}>
                        <View style={styles.button}>

                            { this.state.etape < 4 &&
                                <TouchableOpacity onPress={() => { this._button_suivant() }}> 
                                    <Text style={styles.button_text}> Suivant   </Text>
                                </TouchableOpacity>
                            }
                            { this.state.etape == 4 &&
                                <TouchableOpacity  onPress={() => this._envoyerQuestionnaire() }> 
                                    <Text style={styles.button_text}> Terminer !  </Text>
                                </TouchableOpacity> 
                            }
                        </View>

                        <TouchableOpacity onPress={() => { this._button_retour()  }}>
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
        paddingTop: 5,
        paddingBottom: 10, 
    },
  
    contentContainer: {
        paddingTop: 0,
    },

    //MARGIN BLOC
    margin_top_block: {
        zIndex:2, 
        marginTop: -145,  
    },
  
    //BACKGROUND
    img_bg :{
    minWidth:  390,
    height: 200,
    marginRight: 0,
    marginBottom: 0,
    zIndex: 1, 
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

    //BLOCK QUESTION
    bloc_question : {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingTop:10,
        paddingBottom: 10,
        backgroundColor: "#F7F9F9", 
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
     
});