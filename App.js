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
    urlBase: 'http://198.18.128.169:39009/oauth/private/v1',
    redirectUri: 'exp://198.18.128.169:19000'
    
  };

export default class App extends Component {

  constructor (props, context) {
    super(props);
    this.state = {
      code: "",
      getTokenUrl: env.urlBase+'/token?grant_type=authorization_code&client_id=form&client_secret=formsecret&retredirect_uri='+env.redirectUri,
      authorizeUrl: env.urlBase+'/authorize?response_type=code&client_id=form&scope=read&redirect_uri='+env.redirectUri
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
    console.log(event.url);
    const route = e.url.replace(/.*?:\/\//g, '');
    console.log("ROUTE "+route);
    // do something with the url, in our case navigate(route)
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
          onPress={ () => { 
              Linking.openURL(this.state.getTokenUrl+this.state.code) 
            }
          }
          title="GET TOKEN"
        />
        <Text></Text>
      </View>

      </View> 
    );
  }
}