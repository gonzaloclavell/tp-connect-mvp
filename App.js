import React, { Component} from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { Constants } from 'expo';
  const env = {
    urlBase: 'http://198.18.128.169:39104/oauth/private/v1',
    redirectUri: 'exp://198.18.128.169:19000'
    
  };

export default class App extends Component {

  constructor (props, context) {
    super(props);
    //http://198.18.128.195:9999/oauth/private/v1/token?grant_type=authorization_code&client_id=form&client_secret=formsecret&retredirect_uri=exp://198.18.128.195:19000&code=
    this.state = {
      code: "",
      authorizeUrl: env.urlBase+'/authorize?response_type=code&client_id=form&scope=read&redirect_uri='+env.redirectUri,
      getTokenUrl: env.urlBase+'/token?grant_type=authorization_code&client_id=form&client_secret=formsecret&redirect_uri='+env.redirectUri+"&code=",
      authorizationToken: ""
    };
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this._fetchAuthorizationToken = this._fetchAuthorizationToken.bind(this);
  }

  componentDidMount() {
    console.log("agrego listener");
    Linking.addEventListener('url', this.handleOpenURL);
  }
  
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  
  handleOpenURL(event) {
    let url,codeString,authorizationCode;
    console.log("code = "+ event.url);    
    url = event.url;
    codeString = url.split("?")[1];
    console.log(codeString);
    authorizationCode = codeString.split("=")[1];
    console.log(authorizationCode);
    this.setState( (previousState) => {
      console.log("entre a setear estado");
      console.log(previousState);
      console.log(previousState.getTokenUrl+authorizationCode);
      return {
        code: authorizationCode,
        getTokenUrl: previousState.getTokenUrl+authorizationCode,
        authorizeUrl: previousState.authorizeUrl
      };
    });
    console.log("code = "+ this.state.code);    
    
  }

  _fetchAuthorizationToken() {
    console.log("entre a fetch");
    fetch(this.state.getTokenUrl, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson);  
      this.setState( (previousState) => {
        return {
          code: previousState.code,
          getTokenUrl: previousState.getTokenUrl,
          authorizeUrl: previousState.authorizeUrl,
          authorizationToken: JSON.stringify(responseJson)
        };
      });
    })
    .catch((error, errorDescription) => {
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
        <Text>
          authorizationToken :{this.state.authorizationToken}
        </Text>
      </View>

      </View> 
    );
  }
}