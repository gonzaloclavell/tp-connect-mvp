import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { Card, CardTitle } from 'react-native-material-cards'

export default class WeatherScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super()
    this.state = {
      currentCondition: "",
      currentTemperature: "",
      data: []
    }
  }

  componentWillMount() {
    if (this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.params) {
      console.log(this.props.navigation.state.params.params);
      let data = this.props.navigation.state.params.params;
      this.setState({ data });
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.data.map((item, index) => {
            return(
              <Card isDark='true' style={styles.card} key={index} >
                <CardTitle subtitle={item.currentCondition + item.currentTemperature} title={item.name} />
              </Card>
            );
        })}
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
  },
  card: {
    backgroundColor: '#272727'
  }
});
