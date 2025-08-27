import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dialog } from '@rneui/themed';
import React, { JSX, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';

const { width } = Dimensions.get('window');

interface NavigationProps {
  pop: () => void;
  push: (screen: string) => void;
}

interface AccountSettingScreenProps {
  navigation: NavigationProps;
}

interface InformationShortProps {
  title: string;
}

const AccountSettingScreen: React.FC<AccountSettingScreenProps> = ({
  navigation,
}) => {
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const logoutInfo = (): JSX.Element => {
    return (
      <Dialog
        isVisible={logoutDialog}
        onRequestClose={() => {
          setLogoutDialog(false);
        }}
        overlayStyle={styles.dialogWrapStyle}
      >
        <View style={{ backgroundColor: Colors.whiteColor }}>
          <Text style={{ ...Fonts.blackColor18Bold }}>Confirm</Text>
          <Text
            style={{
              ...Fonts.blackColor15Medium,
              marginVertical: Sizes.fixPadding * 2.0,
            }}
          >
            Are you Sure want to Logout?
          </Text>
          <View style={styles.closeAndLogoutTextWrapStyle}>
            <Text
              onPress={() => setLogoutDialog(false)}
              style={{ ...Fonts.primaryColor13SemiBold }}
            >
              Close
            </Text>
            <Text
              onPress={() => {
                setLogoutDialog(false);
                navigation.push('Login');
              }}
              style={{
                marginLeft: Sizes.fixPadding * 2.0,
                ...Fonts.primaryColor13SemiBold,
              }}
            >
              Logout
            </Text>
          </View>
        </View>
      </Dialog>
    );
  };

  const logoutText = (): JSX.Element => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setLogoutDialog(true);
        }}
        style={{
          backgroundColor: Colors.whiteColor,
          paddingTop: Sizes.fixPadding + 5.0,
          paddingHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    );
  };

  const settingInfo = (): JSX.Element => {
    return (
      <View style={styles.settingInfoWrapStyle}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}
        >
          Setting
        </Text>
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
          {informationShort({ title: 'Order Notifications' })}
          {informationShort({ title: 'Discount Notifications' })}
          {informationShort({ title: 'Credit Card' })}
        </View>
      </View>
    );
  };

  const accountInfo = (): JSX.Element => {
    return (
      <View style={styles.accountInfoWrapStyle}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}
        >
          Account
        </Text>
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
          {informationShort({ title: 'Address' })}
          {informationShort({ title: 'Telephone' })}
          {informationShort({ title: 'Email' })}
        </View>
      </View>
    );
  };

  const informationShort = ({ title }: InformationShortProps): JSX.Element => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...Fonts.lightGrayColor16Medium }}>{title}</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.lightGrayColor}
            size={25}
          />
        </View>
        <View
          style={{
            backgroundColor: '#eeeeee',
            height: 1.0,
            marginVertical: Sizes.fixPadding + 5.0,
          }}
        />
      </>
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
          ACCOUNT SETTING
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {accountInfo()}
          {settingInfo()}
          {logoutText()}
        </ScrollView>
      </View>
      {logoutInfo()}
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
  settingInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  accountInfoWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  dialogWrapStyle: {
    width: width - 50,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 4.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  closeAndLogoutTextWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Sizes.fixPadding * 3.0,
  },
});

export default AccountSettingScreen;
