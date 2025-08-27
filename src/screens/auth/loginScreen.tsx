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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts, Sizes } from '../../constants/styles';

interface NavigationProps {
  navigate: (screen: string) => void;
  push: (screen: string) => void;
}

interface LoginScreenProps {
  navigation: NavigationProps;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [backClickCount, setBackClickCount] = useState<number>(0);

  const loginInfo = (): JSX.Element => {
    return (
      <View style={styles.loginInfoWrapStyle}>
        {emailTextField()}
        {passwordTextField()}
        {forgotPasswordText()}
        {loginButton()}
        {createAccountText()}
      </View>
    );
  };

  const createAccountText = (): JSX.Element => {
    return (
      <Text
        onPress={() => navigation.navigate('CreateAccount')}
        style={{
          marginBottom: Sizes.fixPadding,
          textAlign: 'center',
          ...Fonts.blackColor16Bold,
        }}
      >
        CREATE ACCOUNT
      </Text>
    );
  };

  const forgotPasswordText = (): JSX.Element => {
    return (
      <Text
        onPress={() => navigation.push('ResetPassword')}
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          textAlign: 'center',
          ...Fonts.blackColor16Bold,
        }}
      >
        FORGOT PASSWORD?
      </Text>
    );
  };

  const loginButton = (): JSX.Element => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('CreateAccount')}
        style={styles.loginButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor15Bold }}>LOGIN</Text>
      </TouchableOpacity>
    );
  };

  const passwordTextField = (): JSX.Element => {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons
          name="vpn-key"
          color={passwordFocus ? Colors.primaryColor : Colors.grayColor}
          size={24}
        />
        <TextInput
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
          placeholder="Password"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor15Medium,
          }}
        />
      </View>
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
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor15Medium,
          }}
          keyboardType="email-address"
        />
      </View>
    );
  };

  const appLogo = (): JSX.Element => {
    return (
      <Image
        source={require('../../assets/images/logo/stylo_transparent.png')}
        style={{ width: 80.0, height: 80.0, alignSelf: 'center' }}
        resizeMode="contain"
      />
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
          {loginInfo()}
        </ScrollView>
      </View>
      {backClickCount === 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor14SemiBold }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
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
  loginButtonStyle: {
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
  loginInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 2.5,
  },
  animatedView: {
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
