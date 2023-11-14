import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {data} from '../Utils/data';
import {StatusStackNavigatorParamList} from '../typings';
import {CameraOptions, launchImageLibrary} from 'react-native-image-picker';

interface Props {
  navigation: StatusStackNavigatorParamList;
}

const AddStatus = ({navigation}: Props) => {
  const [dataArray, setDataArray] = useState(data);
  const {width, height} = useWindowDimensions();

  const activeStatus = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  let options: CameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
    // includeBase64: true
    // includeExtra: true,
  };

  const openGallery = async () => {
    const result: any = await launchImageLibrary(options);
    const newImage = `file://${result.assets[0].uri}`;

    // Add newImage to the data array
    setDataArray(prevData => [...prevData, newImage]);
  };

  useEffect(() => {
    activeStatus.addListener(({value}) => {
      const index = Math.floor(value / width);
      setCurrentIndex(index);
    });

    return () => {
      activeStatus.removeAllListeners();
    };
  }, [activeStatus, currentIndex]);

  useEffect(() => {
    if (dataArray.length === 0) {
      navigation.goBack();
    }
  }, [dataArray]);

  const removeItem = () => {
    const updatedData = [...dataArray];
    updatedData.splice(currentIndex, 1); // Remove item at currentIndex
    setDataArray(updatedData);
  };

  return (
    <View className="w-full h-full relative justify-between px-[18px]">
      {/* Background picture */}
      {dataArray.map((pic, index) => {
        console.log(pic);
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const opacity = activeStatus.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          //   extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{width: width, height: height, opacity: opacity}}
            className="absolute "
            key={index}>
            <Image source={{uri: pic}} className="w-full h-full" />
          </Animated.View>
        );
      })}

      {/* Header component */}
      <View className="mt-2">
        {/* Status bar */}
        <View className="flex-row items-center justify-around space-x-1 w-full">
          {dataArray.map((_, i) => {
            return (
              <Animated.View
                key={i}
                style={{
                  width: width / data.length,
                  backgroundColor: i === currentIndex ? '#fff' : '#9a9999',
                }}
                className="flex-1 h-[4px] rounded-[11.87px] bg-status_bar relative">
                {/* <View className="w-[55px] h-[4.75px] rounded-[11.87px] bg-[#fff]" /> */}
              </Animated.View>
            );
          })}
        </View>

        {/* Profile component */}
        <View className="flex-row items-center justify-between">
          <View className="mt-2 flex-row items-center gap-x-3">
            <View className="w-[29px] h-[29px] bg-bgWhite rounded-full overflow-hidden">
              <Image source={require('../assets/profile2.png')} />
            </View>
            <Text className="text-bgWhite text-[19px] font-semibold">
              David Ayewah
            </Text>
          </View>

          {/* Close */}
          <TouchableOpacity className="" onPress={removeItem}>
            <Image
              source={require('../assets/close.png')}
              className="w-[13px] h-[13px]"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom component */}
      <View className="mb-5">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => openGallery()}
            className="w-[40px] h-[40px] p-2 bg-white rounded-full items-center justify-center">
            <Image className="" source={require('../assets/plus.png')} />
          </TouchableOpacity>
          <FlatList
            data={dataArray}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            renderItem={({item, index}) => {
              return (
                <View className="w-[52px] h-[52px] rounded-[5px] ml-2 relative overflow-hidden">
                  <TouchableOpacity
                    onPress={() =>
                      Animated.timing(activeStatus, {
                        toValue: index * width,
                        duration: 150,
                        useNativeDriver: true,
                      }).start()
                    }>
                    <Image source={{uri: item}} className="w-full h-full" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="absolute top-1 right-1"
                    onPress={removeItem}>
                    <Image
                      source={require('../assets/status-close.png')}
                      className="w-3 h-3"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: activeStatus}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={6}
          />
        </View>
        <View className="w-full h-[49px] mt-[9px] relative flex-row items-center rounded-md">
          <View className="w-full h-[49px] bg-[#E5E2DA] rounded-md opacity-60 absolute top-0"></View>
          <TextInput
            placeholder="Type here..."
            className="flex-1 text-[#AAACAD] text-sm font-normal ml-[11px]"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('HighLight')}
            className="mr-[11px]">
            <Image source={require('../assets/send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddStatus;
