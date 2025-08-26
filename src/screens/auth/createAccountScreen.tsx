import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

interface NavigationProps {
  push: (screen: string) => void;
}

interface CreateAccountScreenProps {
  navigation: NavigationProps;
}

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [repeatPasswordFocus, setRepeatPasswordFocus] =
    useState<boolean>(false);

  const createAccountInfo = (): JSX.Element => {
    return (
      <View style={styles.createAccountInfoWrapStyle}>
        {userNameTextField()}
        {emailTextField()}
        {passwordTextField()}
        {repeatPasswordTextField()}
        {createAccountButton()}
        <Text
          onPress={() => navigation.push('Login')}
          style={{
            marginBottom: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.blackColor16Bold,
          }}
        >
          LOGIN
        </Text>
      </View>
    );
  };

  const createAccountButton = (): JSX.Element => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('ResetPassword')}
        style={styles.createAccountButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor15Bold }}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    );
  };

  const repeatPasswordTextField = (): JSX.Element => {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialCommunityIcons
          name="shield-check"
          color={repeatPasswordFocus ? Colors.primaryColor : Colors.grayColor}
          size={24}
        />
        <TextInput
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
          placeholder="Repeat Password"
          value={repeatPassword}
          onChangeText={(text: string) => setRepeatPassword(text)}
          onFocus={() => setRepeatPasswordFocus(true)}
          onBlur={() => setRepeatPasswordFocus(false)}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor15Medium,
          }}
        />
      </View>
    );
  };

  const userNameTextField = (): JSX.Element => {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons
          name="person"
          color={usernameFocus ? Colors.primaryColor : Colors.grayColor}
          size={24}
        />
        <TextInput
          selectionColor={Colors.primaryColor}
          placeholder="Username"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor15Medium,
          }}
        />
      </View>
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
          onSubmitEditing={() => {}}
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
          {createAccountInfo()}
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
  createAccountButtonStyle: {
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
  createAccountInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 2.5,
  },
});

export default CreateAccountScreen;
