import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WalletScreen from '../screens/WalletScreen';
import RequestScreen from '../screens/RequestScreen';

const RequestStack = createStackNavigator({
  Request: RequestScreen,
});

RequestStack.navigationOptions = {
  tabBarLabel: 'Request',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : `${focused ? 'md-radio-button-on' : 'md-radio-button-off'}`
      }
    />
  ),
  tabBarOptions:{
    style: {
      backgroundColor: '#000000',
    }
  }
};

const WalletStack = createStackNavigator({
  Wallet: WalletScreen,
});

WalletStack.navigationOptions = {
  tabBarLabel: 'Wallet',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-card'
      }
    />
  ),
  tabBarOptions:{
    style: {
      backgroundColor: '#000000',
    }
  }
};

export default createBottomTabNavigator({
  RequestStack,
  WalletStack
});
