import React, { useEffect } from 'react';
import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import { Bounce } from 'react-native-animated-spinkit';
import { Colors, Sizes } from '../../constants/styles';

// If you're using React Navigation, you can replace this with the proper type.
// e.g. using @react-navigation/native-stack or @react-navigation/stack.
// For a minimal, dependency-free typing:
type SplashScreenProps = {
  navigation: {
    push: (screen: 'Onboarding') => void,
  },
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.push('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/logo/stylo_transparent.png')}
          style={{ width: 90, height: 90 }}
          resizeMode="contain"
        />
        <Bounce
          size={48}
          color={Colors.primaryColor}
          style={{ marginTop: Sizes.fixPadding * 3 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
