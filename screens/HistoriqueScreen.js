import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class HistoriqueScreen extends React.Component {
  static navigationOptions = {
    title: 'Historique',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View>
            <Text>Mon historique</Text>
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
