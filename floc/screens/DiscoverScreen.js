import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'

export default class DiscoverScreen extends Component {
  static navigationOptions = {
    header: 'Discover',
  };

  constructor() {
    super();
    this.state = {
      search: '',
      clubs: []
    }
  }

  search() {
    fetch('http://104.131.74.102:5000/api/search?from=0&to=20&query=' + this.state.search)
      .then( (responce) => responce.json() )
      .then( (jsonResponce) => this.setState({ clubs: jsonResponce }) )

  }

  renderResults() {
    return this.state.clubs.map( (item, index) => <Text key={index} style={styles.listItem}>{item.object.name}</Text> )
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Take this survey to find clubs and events! :)</Text>

        <FormLabel>Major</FormLabel>
        <FormInput />

        <FormLabel>Year</FormLabel>
        <FormInput />

        <FormLabel>Dorm</FormLabel>
        <FormInput />

        <FormLabel>Favorite Food</FormLabel>
        <FormInput />

        <FormLabel>Favorite Activity</FormLabel>
        <FormInput onChangeText={ (search) => this.setState({ search }) } />

        <Button style={{ paddingTop: 20 }} title={'Submit'} onPress={ () => this.search() } />

        {this.renderResults()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20
  }
});
