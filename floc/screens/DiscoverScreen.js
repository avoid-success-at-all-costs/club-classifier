import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default class DiscoverScreen extends Component {
  static navigationOptions = {
    header: 'Discover',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Text>Stuff</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
