import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import moment from "moment";


export default class InscriptionScreen extends React.Component {
    static navigationOptions = {
        title: 'Inscription'
    };

    constructor(props) {
        super(props);

        this.state = {
            latitude: '',
            longitude: '',
            displayLanguageCode: 'fr',

            gender: '', // F ; M
            firstname: '', 
            dob: '', // 2019-03-29
            addresses: [],

            preferedSpokenLanguage: {
                code: "", // de
                label: "" // string
            },
            spokenLanguages: [
                {
                  code: "", // de
                  label: "" // string
                }
            ],
            avatarURL: "", // string
            acceptsCodeOfEthics: true,
            defaultGenderOption: "", // string

            password: "", // string
            oldPassword: "", // string

            clubs: [
                {
                    clubId: "", // string
                    name: "" // string
                }
            ],

            missingSurveyCount: 0,
            creationDate: "", // 2019-03-29T08:31:07.188Z

            isDateTimePickerVisible: false,
        }

        this.sexes = [
            {label: 'Femme', value: 'F' },
            {label: 'Homme', value: 'M' }
        ];

        this.nationalites = [
            {label: 'Française', value: 'fr'},
            {label: 'Anglaise',  value: 'an'},
            {label: 'Chinoise',  value: 'ch'},
        ];

        this.langues = [
            {label: 'Français',   value: 'fr'},
            {label: 'Anglais',    value: 'an'},
            {label: 'Chinois',    value: 'ch'},
            {label: 'Espagnol',   value: 'es'},
            {label: 'Portuguais', value: 'pt'},
            {label: 'Arabe',      value: 'ar'},
            {label: 'Japonais',   value: 'jp'}
        ];    
    }

    /**
     *  FUNCTION
     */
    // _handleChange = (e) => {
    //     console.log(e)
    //     // console.log(name)
    //     // console.log(e.target)
    //     const name = e.target.name    
    //     const value = e.target.value

    //     // this.setState({
    //     //     [name]: value
    //     // })
    // }

    _handleChange_addresses = (e) => {
        const value = e

        const newAddress = {
            type: "EML",
            phoneCountryCode: '33', // 33
            value: value // string
        }

        const allAdresses = this.state.adresses
        allAdresses.push(newAddress)

        this.setState({
            adresses: allAdresses
        })
    }

    _handleChange_preferedSpokenLanguage = (e) => {
        console.log(e)
        console.log(e.target)
        const value = e.target.value

        const lang = this.state.langues.find(item => item.value === value)
        console.log(lang)

        this.setState({
            preferedSpokenLanguage: {
                code: "", // de
                label: "" // string
            },
        })
    }




    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
    _handleDatePicked = (date) => {
        const newDate = moment(date, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD')
        this._hideDateTimePicker();

        this.setState({
            dob: newDate
        })
    };


    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            
                <View>
                    <Text>OpenBubble</Text>
                    <Text>Sortez de votre bulle !</Text>
                </View>

                <View>
                    <Text>Inscription</Text>
                </View>

                <Formik
                    initialValues={this.state}
                    onSubmit={values => { console.log(values); console.log(this.state)} } >

                    {props => (
                        <View>
                            <View>
                                <TextInput
                                    placeholder='Mon prénom' 
                                    onChangeText={props.handleChange('firstname')}
                                    onBlur={props.handleBlur('firstname')}
                                    value={props.firstname}
                                />
                            </View>

                            <View>
                                <Text>Genre (information non divulguée)</Text>
                                <RadioForm
                                    radio_props={this.sexes}
                                    initial={0}
                                    onPress={props.handleChange('gender')} /> 
                            </View>

                            <View>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <Text>Sélectionnez votre date de naissance</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                    // minimumDate="1919-01-01"
                                    // maximumDate="2001-12-31"
                                    confirmTextIOS="Valider"
                                    cancelTextIOS="Annuler"
                                    titleIOS="Sélectionnez une date"
                                />
                                {/* <Text>{this.state.dob}</Text> */}
                            </View>

                            <View>
                                <Text>Mon numéro de mobile</Text>
                                <Input placeholder='Téléphone' onChangeText={this._handleChange_addresses.bind(this)} name="telephone"/>
                            </View>

                            <Button onPress={props.handleSubmit} title="Submit" />

                        </View>
                        
                    )}
                </Formik>

                

                

                <View>
                    <Text>Ma langue de préférence</Text>
                    <RadioForm
                        radio_props={this.langues}
                        initial={0}
                        onPress={this._handleChange_preferedSpokenLanguage} />
                </View>

            </ScrollView>
        </View>
        )
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