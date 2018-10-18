import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
} from 'react-native';

export default class WeatherRequestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super()
    this.state = {
      currentCondition: "",
      currentTemperature: "",
      data: [
        {
          name: "Buenos Aires",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Tokyo",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Berlin",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Paris",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Munich",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Barcelona",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Prague",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "Amsterdam",
          currentCondition: "",
          currentTemperature: ""
        },
        {
          name: "New York",
          currentCondition: "",
          currentTemperature: ""
        },
      ]
    }
  }

  doWeatherRequest = () => {
    cities = this.state.data.map(item => '\"' + item.name + '\"');
    query = "https://query.yahooapis.com/v1/public/yql?q=select title, item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text in (" + cities + ")) and u='C'&format=json";
    fetch(query)
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.query.results.channel.length; i++) {
          var weather = responseJson.query.results.channel[i].item.condition;
          let data = [ ...this.state.data ];
          data[i] = {...data[i],
            currentCondition: weather.text + ", ",
            currentTemperature: weather.temp + "°"
          };
          this.setState({ data });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount(){
    this.doWeatherRequest();
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button
            title="Go to Weather"
            onPress={() => this.props.navigation.navigate('Weather', { params: this.state.data })}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
