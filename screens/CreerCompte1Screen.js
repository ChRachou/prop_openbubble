import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class CreerCompte1Screen extends React.Component {
    static navigationOptions = {
        title: 'Créer mon compte',
    };

    _connexion = () => {
        this.props.navigation.navigate("Connexion")
    }

    _creerCompte = () => {
        this.props.navigation.navigate("CreerCompte2")
    }

    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            
            <View>
                <Text>OpenBubble</Text>
                <Text>Sortez de votre bulle !</Text>
            </View>

            <View>
                <Text>Créer mon compte</Text>
            </View>

            <View>
                <Text>Code éthique</Text>
            </View>

            <View>
                <Text>OpenBubble n'est pas une pallication de rencontre comme les autres. Vous arrivez comme vous êtes avec vos richesses et vos différences, devant une personne inconnue, sans a priori ni objectif particulier. Chacun de vous doit se sentir accueilli et reconnu, la bienveillance et le curiosité sont essentielles. Jouez le jeu il n'en sortira que du bon. Merci de lire et d'accepter chaun des points suivants pour commencer votre inscription sur OpenBubble.</Text>
            </View>

            <View>
                <Text>De notre côté nous nous engageons à ce qu'aucune des informations que vous nous confierez ne soit diffusée, votre sécurité et celle de vos données sont essentielles pour nous.</Text>
            </View>

            <View>
                <TouchableOpacity onPress={() => { this._creerCompte(); }} >
                    <Text>J'ai compris</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={() => { this._connexion(); }} >
                    <Text>Retour</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
        </View>
        );
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
