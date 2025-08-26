import React, { useState } from 'react';
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
import { Colors, Fonts, Sizes } from '../../../constants/styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [backClickCount, setBackClickCount] = useState(0);

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
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor14SemiBold }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function loginInfo() {
    return (
      <View style={styles.loginInfoWrapStyle}>
        {emailTextField()}
        {passwordTextField()}
        {forgotPasswordText()}
        {loginButton()}
        {createAccountText()}
      </View>
    );
  }

  function createAccountText() {
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
  }

  function forgotPasswordText() {
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
  }

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('CreateAccount')}
        style={styles.loginButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor15Bold }}>LOGIN</Text>
      </TouchableOpacity>
    );
  }

  function passwordTextField() {
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
          onChangeText={text => setPassword(text)}
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
  }

  function emailTextField() {
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
          onChangeText={text => setEmail(text)}
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
  }

  function appLogo() {
    return (
      <Image
        source={require('../../assets/images/logo/stylo_transparent.png')}
        style={{ width: 80.0, height: 80.0, alignSelf: 'center' }}
        resizeMode="contain"
      />
    );
  }
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
