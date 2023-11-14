export type MainStackNavigatorParamList = {
  Home: undefined;
  AddStatus: undefined;
  HighLight: undefined;
};

export type HomeStackNavigatorParamList = NativeStackNavigationProp<
  MainStackNavigatorParamList,
  'Home'
>;

export type StatusStackNavigatorParamList = NativeStackNavigationProp<
  MainStackNavigatorParamList,
  'AddStatus'
>;

export type HighLightStackNavigatorParamList = NativeStackNavigationProp<
  MainStackNavigatorParamList,
  'HighLight'
>;

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
