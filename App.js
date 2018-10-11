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

  const env = {
    urlBase: 'http://198.18.128.169:39136/oauth/private/v1',
    redirectUri: 'exp://198.18.128.169:19000'
    
  };

export default class App extends Component {

  constructor (props, context) {
    super(props);
    this.state = {
      code: "",
      getTokenUrl: env.urlBase+'/token?grant_type=authorization_code&client_id=form&client_secret=formsecret&retredirect_uri='+env.redirectUri,
      authorizeUrl: env.urlBase+'/authorize?response_type=code&client_id=form&scope=read&redirect_uri='+env.redirectUri,
      authorizationToken: ""
    };
  }

  componentDidMount() {
    console.log("agrego listener");
    Linking.addEventListener('url', this.handleOpenURL);
  }
  
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  
  handleOpenURL(event) {
    let url = event.url;
    let codeString = url.split("?")[1];
    let authorizationCode = codeString.split("=")[1];
    this.setState( previousState => {
      return {
        code: authorizationCode,
        getTokenUrl: previousState.getTokenUrl,
        authorizeUrl: previousState.authorizeUrl,
      };
    });
    console.log("code = "+ this.state.code);
  }

  _fetchAuthorizationToken() {
    fetch(this.state.getTokenUrl, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((responseJson) => {
      this.setState(previousState => {
        return {
          code: previousState.code,
          getTokenUrl: previousState.getTokenUrl,
          authorizeUrl: previousState.authorizeUrl,
          authorizationToken: responseJson
        };
      });
    })
    .catch((error) => {
      console.error(error);
    });
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
        <Text>
          authorizeUrl :{this.state.authorizeUrl}
        </Text>
        <Button
          onPress={ () => { 
              Linking.openURL(this.state.authorizeUrl) 
            }
          }
          title="TP CONNECT"
        />
        <Text>
          getTokenUrl :{this.state.getTokenUrl}
        </Text>
        <Button
          onPress={ this._fetchAuthorizationToken }
          title="GET TOKEN"
        />
      </View>

      </View> 
    );
  }
}