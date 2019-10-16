import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class CreerCompte2Screen extends React.Component {
    static navigationOptions = {
        title: 'Créer mon compte',
    };

    _creerCompte = () => {
        this.props.navigation.navigate("CreerCompte3")
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
                <Text>Règle n°1</Text>
                <Text>[ILLUSTRATION]</Text>
                <Text>OpenBubble est un espace de bienveillance et de courtoisie</Text>
            </View>

            <View>
                <Text>Règle n°2</Text>
                <Text>[ILLUSTRATION]</Text>
                <Text>Tout ce que vous allez vous dire restera entre vous et chacun doit se sentir  en sécurité et en confiance</Text>
            </View>

            <View>
                <Text>Règle n°3</Text>
                <Text>[ILLUSTRATION]</Text>
                <Text>OpenBubble est une communauté ouverte à tous où la seule règle est l'ouverture et le curiosité de l'autre</Text>
            </View>

            <View>
                <Text>Règle n°4</Text>
                <Text>[ILLUSTRATION]</Text>
                <Text>Sauf cas exceptionnel une rencontre dure 15 minutes au minimum, afin d'avoir réellement le temps de commencer à faire connaissance</Text>
            </View>

            <View>
                <Text>Règle n°5</Text>
                <Text>[ILLUSTRATION]</Text>
                <Text>Aucune forme de prosélytisme ou de démarchage quel qu'il soit n'a sa place dans OpenBubble</Text>
            </View>

            <View>
                <Text>Règle n°6</Text>
                <Text>[ILLUSTRATION]</Text>
                <Text>Nous avons besoin de connaître votre position pour déterminer les lieux autour de vous quand vous vous connectez. C'est tout.</Text>
            </View>

            <View>
                <TouchableOpacity onPress={() => { this._creerCompte(); }}>
                    <Text>J'ai compris</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity >
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
