import {
  View,
  Text,
  useWindowDimensions,
  Animated,
  Image,
  TouchableOpacity,
  Easing,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {data} from '../Utils/data';
import {HighLightStackNavigatorParamList} from '../typings';

interface Props {
  navigation: HighLightStackNavigatorParamList;
}

const HighlightStatus = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();

  const activeImageStatus = useRef(new Animated.Value(0)).current;
  const activeProgressBarStatus = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  //   const pauseAnimations = () => {
  //     console.log('first');
  //      useRef(
  //         Animated.timing(activeImageStatus, {
  //             toValue: (currentIndex + 1) * width,
  //             duration: 500, // Adjust duration for the image transition
  //             easing: Easing.linear,
  //             useNativeDriver: false,
  //           }).stop()
  //     ).current

  //   };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      Animated.timing(activeImageStatus, {
        toValue: (currentIndex + 1) * width,
        duration: 500, // Adjust duration for the image transition
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);

        // Check if it's the last image
        if (nextIndex === 0) {
          // Run your navigation function here
          navigation.navigate('Home'); // Replace 'Home' with your actual screen name
        }
      });
    }, 9000); // Interval set to 8 seconds for image transition

    const progressBarInterval = setInterval(() => {
      Animated.timing(activeProgressBarStatus, {
        toValue: (currentIndex + 1) * width,
        duration: 2800, // Adjust duration for the progress bar
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, 50); // Interval set to 3 seconds for progress bar

    return () => {
      clearInterval(imageInterval);
      clearInterval(progressBarInterval);
      //   pauseAnimations();
      activeImageStatus.removeAllListeners();
      activeProgressBarStatus.removeAllListeners();
    };
  }, [activeImageStatus, activeProgressBarStatus, currentIndex, navigation]);

  return (
    <View className="w-full h-full relative justify-between px-[18px]">
      {/* Background picture */}
      {data.map((pic, index) => {
        console.log(pic);
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const opacity = activeImageStatus.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
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
      <View className="mt-3">
        <View className="flex-row items-center gap-x-4 mb-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="w-4 h-[14px]">
            <Image
              source={require('../assets/prevBtn.png')}
              className="w-4 h-[14px]"
            />
          </TouchableOpacity>
          <Text className="text-base text-bgWhite font-semibold">
            Highlights
          </Text>
        </View>
        {/* Status bar */}
        <View className="flex-row items-center justify-around space-x-1 w-full">
          {data.map((_, i) => {
            const translateX = activeProgressBarStatus.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0, 0, width / 4],
            });
            return (
              <View
                key={i}
                style={{
                  width: width / data.length,
                }}
                className="flex-1 h-[4px] rounded-[11.87px] bg-[#fff] relative overflow-hidden">
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }}
                  className="w-full h-[4.75px] absolute rounded-[11.87px] bg-[#9a9999]"
                />
              </View>
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
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-1 flex-row">
        {/* Left */}
        <TouchableOpacity style={{width: width * 0.25}} className="h-full">
          <View></View>
        </TouchableOpacity>

        {/* Middle */}
        <TouchableOpacity
          style={{width: width * 0.4}}
          activeOpacity={1}
          className="h-full"
          //   onPressIn={pauseAnimations}
        >
          <View></View>
        </TouchableOpacity>

        {/* Right */}
        <TouchableOpacity style={{width: width * 0.25}} className="h-full">
          <View></View>
        </TouchableOpacity>
      </View>

      {/* Bottom component */}
      <View className="items-center mb-6">
        <Text className="text-base text-bgWhite font-normal">
          Jane Weds John
        </Text>
      </View>
    </View>
  );
};

export default HighlightStatus;
