import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { JSX, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../../constants/styles';

// Define the navigation prop type
interface NavigationProps {
  push: (screenName: string) => void;
}

interface ResetPasswordScreenProps {
  navigation: NavigationProps;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const appLogo = (): JSX.Element => {
    return (
      <Image
        source={require('../../assets/images/logo/stylo_transparent.png')}
        style={{ width: 80.0, height: 80.0, alignSelf: 'center' }}
        resizeMode="contain"
      />
    );
  };

  const emailTextField = (): JSX.Element => {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons
          name="email"
          color={emailFocus ? Colors.primaryColor : Colors.grayColor}
          size={24}
        />
        <TextInput
          selectionColor={Colors.primaryColor}
          placeholder="Enter Registered Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor15Medium,
          }}
        />
      </View>
    );
  };

  const resetPasswordButton = (): JSX.Element => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('Home')}
        style={styles.resetPasswordButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor15Bold }}>RESET PASSWORD</Text>
      </TouchableOpacity>
    );
  };

  const resetPasswordInfo = (): JSX.Element => {
    return (
      <View style={styles.resetPasswordInfoWrapStyle}>
        {emailTextField()}
        {resetPasswordButton()}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding * 10.0 }}
        >
          {appLogo()}
          {resetPasswordInfo()}
        </ScrollView>
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
  textFieldWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
  },
  resetPasswordButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding * 2.5,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding * 4.0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 10.0,
    marginVertical: Sizes.fixPadding + 10.0,
  },
  resetPasswordInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 2.5,
  },
});

export default ResetPasswordScreen;
