import React from 'react';
import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import { Bounce } from 'react-native-animated-spinkit';
import { Colors, Sizes } from '../../constants/styles';

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.push('Onboarding');
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {appLogo()}
        <Bounce
          size={48}
          color={Colors.primaryColor}
          style={{
            marginTop: Sizes.fixPadding * 3.0,
          }}
        />
      </View>
    </SafeAreaView>
  );

  function appLogo() {
    return (
      <Image
        source={require('../assets/images/logo/stylo_transparent.png')}
        style={{ width: 90.0, height: 90.0 }}
        resizeMode="contain"
      />
    );
  }
};

export default SplashScreen;
