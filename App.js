//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';

//export default class App extends React.Component {
//  render() {
//    return (
//      <View style={styles.container}>
//        <Text>Open up App.js to start working on your app!</Text>
//      </View>
//    );
//  }
//}

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//});



import React, { Component} from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { Constants } from 'expo';
//oauth2.marathon.l4lb.thisdcos.directory:9999
//http://oauth2.marathon.l4lb.thisdcos.directory:9999/oauth/private/v1/authorize?response_type=code&client_id=form&scope=read&redirect_uri={{urlOAuth}}

  const source = {
    uri: 'http://198.18.128.169:39044/oauth/private/v1/authorize?response_type=code&client_id=form&scope=read&redirect_uri=localhost:9999',
    headers: {
      "Authorization": "Basic Zm9ybTpmb3Jtc2VjcmV0" // base64 of 'foo:bar'
    }
  };

export default class App extends Component {

  constructor (props, context) {
    super(props);
    this.state = {texto: "Hola"};
  }

  render() {
//
    return (
      <View style={{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
      <View>
        <Button
          onPress={ () => { Linking.openURL('http://198.18.128.169:39009/oauth/private/v1/authorize?response_type=code&client_id=form&scope=read&redirect_uri=http://www.google.com') }}
          title="TP CONNECT"
        />
      </View>

      </View> 
    );
  }
}