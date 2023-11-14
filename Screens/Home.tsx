import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {FC, useLayoutEffect, useState} from 'react';
import {HomeStackNavigatorParamList} from '../typings';
import {data} from '../Utils/data';

interface HomeProps {
  navigation: HomeStackNavigatorParamList;
}

const Home: FC<HomeProps> = ({navigation}) => {
  const [dataArray, setDataArray] = useState(data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 flex-row items-center justify-center gap-x-5 bg-white">
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.shadow}
        className="w-[81px] h-[81px] p-2 bg-white rounded-full items-center justify-center overflow-hidden"
        onPress={() => navigation.navigate('AddStatus')}>
        <View className="">
          <Image className="" source={require('../assets/plus.png')} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.shadow}
        onPress={() => navigation.navigate('HighLight')}
        className="w-[91px] h-[91px] p-2 bg-grey_300 rounded-full items-center justify-center overflow-hidden">
        <View className="border-2 border-border_orange rounded-full">
          <Image
            className="w-[76px] h-[76px] rounded-full"
            source={require('../assets/profile.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -20,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
});
