import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { JSX } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';

interface AboutAppScreenProps {
  navigation: {
    pop: () => void;
  };
}

const AboutAppScreen: React.FC<AboutAppScreenProps> = ({ navigation }) => {
  const aboutApp = (): JSX.Element => {
    return (
      <View style={{ margin: Sizes.fixPadding + 5.0 }}>
        <Text style={{ ...Fonts.blackColor17SemiBold }}>
          STYLO Fashion Ecommerce App UI in React Native
        </Text>
        <Text
          style={{
            marginVertical: Sizes.fixPadding - 2.0,
            ...Fonts.lightGrayColor13Medium,
          }}
        >
          STYLO is a multipurpose ecommerce app ui template. STYLO is built in
          React Native.React Native is a Hybrid App Development Platform. So,
          STYLO Compatible with Android and iOs both.
        </Text>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 2.0,
            ...Fonts.lightGrayColor13Medium,
          }}
        >
          STYLO is a developed by Render Code. We are expert React Native
          developer team.
        </Text>
        <Text style={{ ...Fonts.blackColor13SemiBold }}>
          Thanks for Installing our App
        </Text>
        <View style={{ backgroundColor: '#cccccc', height: 0.5 }} />
        <Text
          style={{
            marginVertical: Sizes.fixPadding - 2.0,
            ...Fonts.blueColor13SemiBold,
          }}
        >
          render_code
        </Text>
      </View>
    );
  };

  const header = (): JSX.Element => {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={Colors.blackColor}
          size={25}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}
        >
          ABOUT STYLO APP
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {aboutApp()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    elevation: 2.0,
  },
});

export default AboutAppScreen;
