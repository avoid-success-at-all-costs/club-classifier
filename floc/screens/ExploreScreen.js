import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements'

const catagories = [
 {
    name: 'Art, Design and Fashion',
    image: 'https://www.chesterfield.ac.uk/assets/000/000/470/shutterstock_93902407_video.jpg?1412554921'
 },
 {
    name: 'Architecture, Environment and Urban space',
    image: 'http://www.urbaninitiatives.com.au/wp-content/uploads/2013/07/Oxford_St-6.jpg'
 },
 {
   name: 'Business, Management and Entrepreneurship',
   image: 'https://business.missouri.edu/sites/default/files/styles/large/public/dsc_0488.jpg?itok=pZUKliRr'
 },
 {
   name: 'Culinary',
   image: 'http://cdn.shopify.com/s/files/1/1579/6607/products/cooking-product-image_grande.jpg?v=1513009072'
 },
 {
   name: 'Education',
   image: 'https://vasitars.com/assets/images/hero/education.jpg'
 },
 {
   name: 'Engineering',
   image: 'https://www.gulfcoast.edu/images/its/engineering.jpg'
 },
 {
   name: 'Ethics and Cultural',
   image: 'http://www.diverseethics.com/images/upload/aboutus.jpg'
 },
 {
   name: 'Fraternities and Sororities',
   image: 'https://www.bestcollegereviews.org/wp-content/uploads/2015/08/best-greek-life-bradley.jpg'
 },
 {
   name: 'Governance, Politics and Law',
   image: 'https://fthmb.tqn.com/SJ7ydb7TT-3A0OVYr7Z3V9uHO4o=/960x0/filters:no_upscale()/capitol-building-170402241-58ddb7bf5f9b58468374c174.jpg'
 }
]

export default class ExploreScreen extends Component {
  static navigationOptions = {
    title: 'Explore',
  };

  constructor() {
    super();
    this.state = { search: '', clubs: [] }
  }

  renderSearchbox() {
    return (
      <SearchBar
        style={{ marginTop: -50 }}
        lightTheme
        onChangeText={ (search) => this.setState({ search }) }
        onClear={ () => console.log('cleared') }
        placeholder='Type Here...' />
    );
  }

  renderCategoryButtons() {
    let {height, width} = Dimensions.get('window');
    return catagories.map((item, index) =>
      <View key={index}>
        <Image
          style={{ width, height: 200 }}
          source={{ uri: item.image }}>
        </Image>
        <Text style={{
          backgroundColor: 'powderblue',
          width: 340,
          marginTop: -40,
          paddingTop: 10,
          paddingLeft: 20,
          paddingBottom: 10,
          fontSize: 18 }}>{item.name}</Text>
      </View>

    )
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
    return (
      <ScrollView style={styles.container}>

        {this.renderSearchbox()}

        {this.state.search !== '' ? <Button title={'search'} onPress={ () => this.search() } /> : false }


        {this.renderResults()}

        {this.state.search === '' ? this.renderCategoryButtons() : false}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20
  }
});






// implemented without image with header
