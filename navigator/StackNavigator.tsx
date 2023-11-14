import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddStatus, HighlightStatus, Home} from '../Screens';
import {MainStackNavigatorParamList} from '../typings';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddStatus" component={AddStatus} />
      <Stack.Screen name="HighLight" component={HighlightStatus} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
