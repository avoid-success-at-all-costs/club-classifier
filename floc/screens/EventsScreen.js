import React, { Component } from 'react';
import { Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class EventsScreen extends Component {
  static navigationOptions = {
    title: 'Events',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Text>Here are some events.</Text>;
  }
}
