import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class ProfilScreen extends React.Component {
  static navigationOptions = {
    title: 'Profil',
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
            <Text>Prénom</Text>
          </View>

          <View>
            <Text>Nom</Text>
          </View>

          <View>
            <Text>Mot de passe</Text>
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
