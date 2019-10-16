import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class RencontreScreen extends React.Component {
  static navigationOptions = {
    title: 'Rencontre',
  };

  _minuteur = () => {
    this.props.navigation.navigate("Minuteur")
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
            <Text>Jean Dupont et vous êtes prêts à vous rencontrer. Utilisez le chat pour vous retrouver.</Text>
          </View>

          <View>
            <Text>Chat</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => { this._minuteur(); }} >
              <Text>Nous nous sommes trouvés</Text>
            </TouchableOpacity>
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
