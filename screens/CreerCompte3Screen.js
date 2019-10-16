import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity,  Button } from 'react-native';
import Logo from './composant/LogoScreen.js';
import { Input, CheckBox } from 'react-native-elements';

export default class CreerCompte3Screen extends React.Component {
    static navigationOptions = {
        title: 'Inscription',
    };

    constructor(props) {
        super(props);

        this.state = {
            prenom: '',
            dateNaissance: '',
            nationalite: '',
            telephone: '',
            langues: [],
            formp1: true, 
            sexe: 0,
        }

        //Pensé au non binaire etc .. refléxion de collègue
        this.sexes = [
            {label: 'Femme', value: 0 },
            {label: 'Homme', value: 1 }
        ];

        this.nationalites = [
            {
                label: 'Française',
                value: 'francaise',
            },
            {
                label: 'Anglaise',
                value: 'anglaise',
            },
            {
                label: 'Chinoise',
                value: 'chinoise',
            },
        ];

        this.langues = [
            'Français',
            'Anglais',
            'Expagnol',
            'Portuguais',
            'Arabe',
            'Chinois',
            'Japonais'
        ];
    }

    _retour = () => {
        this.props.navigation.navigate("CreerCompte1")
    }

    _creerCompte = () => {
        this.props.navigation.navigate("DemarrerRencontre")
    }

    _handleChange = (e) => {
        const name = e.target.name    
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    _suivant = () => {
        this.setState({
            formp1 : false 
        }) 
    }

    _precedent = () => {
        this.setState({
            formp1 : true 
        }) 
    }

   /* _change_sexe = (val) =>{
         
        this.setState({
            sexe: val
        }) 
         
    }*/

    _handleChangeLangues = (e) => {
        const value = e.target.value
        const langues = this.state.langues

        langues.push(value)

        this.setState({
            langues: langues
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            
            <Logo/> 

            <View >
                <Text style={styles.title_h1}>Créer un compte</Text>
            </View>

            <View style={styles.form}>

            
			{ this.state.formp1 &&
                <View >
                    <View style={styles.marge_form} >
                        <Text style={styles.label}>Mon prénom</Text>
                        <Input placeholder='Prénom' style={styles.input}
                        onChangeText={(prenom) => this.setState({prenom})} />
                    </View>
                    <View style={styles.marge_form} >
                        <Text style={styles.label}>Ma date de naissance</Text>
                        <Input placeholder='Date de naissance' onChangeText={this._handleChange.bind(this)} name="dateNaissance"/> 
                    </View>
                    <View style={styles.marge_form} >
                    <Text style={styles.label}>Genre   (information non divulguée)</Text> 
                        
                        <View style={styles.buttons_genre}>

                            <View style={styles.button_genre_actif}>
                                <TouchableOpacity onPress="">
                                    <Text style={styles.button_genre_actif_text}>Homme</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.button_genre_actif}>
                                <TouchableOpacity onPress="">
                                    <Text style={styles.button_genre_actif_text}>Femme</Text>
                                </TouchableOpacity>
                            </View>
                           
                            
                        </View>
                    </View> 
                </View>

            }
  
            { !this.state.formp1 &&

                <View  > 
                <View>
                        <Text>Mon numéro de mobile</Text>
                        <Input placeholder='Téléphone' onChangeText={this._handleChange.bind(this)} name="telephone"/>
                    </View>

            <View>
                <Text>Mes langues parlées</Text>
                { this.langues.map( (value , key) => 
                    <CheckBox key={key} title={value} name="langues" onPress={this._handleChangeLangues.bind(this)} />
                )}
            </View>

           
                </View>

           
           
            }
 

             </View>

              <View style={styles.buttons_slides}> 

                  <View style={[this.state.formp1 ? styles.button_slides_actif : styles.button_slides_inactif]} >
                    <TouchableOpacity onPress={() => { this._suivant()  }} style={styles.buton_slides_actif}>
                        <Text style={styles.button_text}>   </Text>
                    </TouchableOpacity>
                </View>

                <View style={[ !this.state.formp1 ? styles.button_slides_actif :  styles.button_slides_inactif ]}>
                    <TouchableOpacity onPress={() => { this._precedent()  }} style={styles.buton_slides_inactif}>
                        <Text style={styles.button_text}>   </Text>
                    </TouchableOpacity>
                </View>

                
             </View>  

             <View style={styles.buttons}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => { this._suivant()  }}>
                        <Text style={styles.button_text}> Suivant   </Text>
                    </TouchableOpacity>
                </View>
                

                <TouchableOpacity onPress={() => { this._precedent()  }}>
						 	<Text style={styles.button_retour}>Retour</Text>
				 </TouchableOpacity>
  
            </View>

             



            {/* <View>
                <Text>Ma nationalité</Text>
                <RNPickerSelect
                    placeholder="Sélectionnez"
                    items={this.nationalites}
                    onValueChange={(value) => {
                        this.setState({
                            nationalite: value,
                        });
                    }}
                    // onUpArrow={() => {
                    //     this.inputRefs.firstTextInput.focus();
                    // }}
                    // onDownArrow={() => {
                    //     this.inputRefs.favSport1.togglePicker();
                    // }}
                    value={this.state.nationalite}
                    ref={(el) => {
                        this.inputRefs.nationalite = el;
                    }}
                />
            </View> */}

          

            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({

    //PAGE GLOABAL
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 5,
        fontFamily: 'Proza Libre',
        fontSize: 16,
    },

    
    helpLink: {
        paddingVertical: 15,
    },

    //TITRES

    
    title_h1: {
        fontSize: 28, 
        textAlign: 'left', 
        marginLeft: 10,
        fontWeight: 'bold', 
        fontFamily: 'Roboto Slab',
        color: '#333333',
    },

    //FORM
    form : {
        marginLeft: 10,
        marginRight: 10,
    },

    marge_form:{
        marginTop: 10,
        marginBottom: 10,
    },

    //INPUT
    input : { 
        fontFamily: 'Proza Libre Medium'
    },

    //LABEL
    label : {
        textTransform: 'uppercase',
        fontSize: 14, 
        color: 'black',
        opacity: 0.54,
        fontFamily: 'Proza Libre',
        marginLeft: 6,
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

    button_text:{
        fontSize: 18,
        paddingTop: 7, 
        alignSelf: 'center',
        color: 'white' , 
        marginLeft: 2,
    },

    button_retour: {
		color: '#333333',
		fontSize: 17,
		alignSelf: 'center',
	},

    //BOUTON GENRE

    buttons_genre:{ 
        flexDirection: 'row',
        justifyContent: 'center',
        height: 45,
      //  backgroundColor: '#82d3f3',

    },
    button_genre_actif: { 
       backgroundColor: '#82d3f3',
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10, 
        marginTop: 10,
        color: 'white', 
        height: 30,
        width: 150,
    },

    button_genre_actif_text:
    {
        fontSize: 16,
        paddingTop: 4, 
        alignSelf: 'center',
        color: 'white' , 
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
    }

});
