import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Logo from './composant/LogoScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Accueil',
  };

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

          {/* LES BUBBLES */}
          <View style={styles.bubbles}>
            <View style={styles.img_bubbles}>
              <View style={styles.bubble_pink} />
              <View>
                <View style={styles.bubble_yellow} />
                <View style={styles.bubble_light_blue_opacity}>
                  <View style={styles.bubble_light_blue} />
                </View>
              </View>
            </View>
          </View>

          {/*TITRE & DESCRIPTION */}
          <Text style={styles.bubbles_h1}>Bienvenue</Text>
          <Text style={styles.bubbles_h2}>
            Le hasard au coeur de la rencontre entre deux inconnus.
          </Text>

          {/*LES BOUTONS DE CONNEXION*/}
          <View style={styles.buttons}>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => navigate('CreerCompte')}>
                <Text style={styles.button_text}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button_inverse}>
              <TouchableOpacity onPress={() => navigate('DemarrerRencontre')}>
                <Text style={styles.button_text_inverse}>S'identifier</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //PAGE GLOBAL
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  contentContainer: {
    paddingTop: 0,
  },

  // LES BUBBLES
  bubbles: {
    paddingTop: 5,
    height: 210,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
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
    height: 48,
    width: 48,
    backgroundColor: '#82D3F3',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
    zIndex: 1,
  },

  //TITRE & DESCRIPTION
  bubbles_h1: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: "RobotoSlab-Bold",
    color: "#333333",
  },

  bubbles_h2: {
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
    color: "#757575",
    //opacity: 0.54,
  },

  //BOUTTONS DE CONNEXION
  buttons: {
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

  button_text: {
    fontSize: 18,
    paddingTop: 7,
    alignSelf: 'center',
    color: 'white',
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

  button_text_inverse: {
    fontSize: 18,
    paddingTop: 7,
    alignSelf: 'center',
    color: 'black',
    marginLeft: 4,
  },
});
