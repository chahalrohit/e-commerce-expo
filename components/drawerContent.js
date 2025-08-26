import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Dialog } from '@rneui/themed';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles';

const { width } = Dimensions.get('window');

const CustomDrawer = props => {
  const [logoutDialog, setLogoutDialog] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.whiteColor,
        }}
        showsVerticalScrollIndicator={false}
      >
        {drawerContent()}
      </DrawerContentScrollView>
      {logoutInfo()}
    </View>
  );

  function logoutInfo() {
    return (
      <Dialog
        visible={logoutDialog}
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
                props.navigation.push('Login');
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
  }

  function drawerContent() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        <View style={{ ...styles.appIconBackgroundStyle }}>
          <Image
            source={require('../src/assets/images/logo/stylo_transparent.png')}
            style={{ width: 80.0, height: 80.0 }}
            resizeMode="contain"
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}>
            {category({ categoryName: 'MEN' })}
            {category({ categoryName: 'WOMEN' })}
            {category({ categoryName: 'KIDS' })}
            {category({ categoryName: 'HOME & LIVING' })}
            {category({ categoryName: 'BEAUTY' })}
          </View>
          {drawerDivider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.push('Orders')}
          >
            {drawerItems({
              icon: (
                <MaterialCommunityIcons
                  name="wallet"
                  color={Colors.grayColor}
                  size={22}
                />
              ),
              title: 'My Orders',
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.push('Bag')}
          >
            {drawerItems({
              icon: (
                <FontAwesome5
                  name="shopping-bag"
                  size={22}
                  color={Colors.grayColor}
                />
              ),
              title: 'My Bag',
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.push('Wishlist')}
          >
            {drawerItems({
              icon: (
                <MaterialIcons
                  name="favorite-border"
                  size={22}
                  color={Colors.grayColor}
                />
              ),
              title: 'My Wishlist',
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.push('Account')}
          >
            {drawerItems({
              icon: (
                <MaterialIcons
                  name="person"
                  size={22}
                  color={Colors.grayColor}
                />
              ),
              title: 'My Account',
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.push('Notifications')}
          >
            {drawerItems({
              icon: (
                <MaterialIcons
                  name="notifications"
                  size={22}
                  color={Colors.grayColor}
                />
              ),
              title: 'My Notification',
            })}
          </TouchableOpacity>
          {drawerDivider()}
          <View style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}>
            <Text
              onPress={() => props.navigation.push('Faq')}
              style={{
                marginVertical: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14SemiBold,
              }}
            >
              FAQ
            </Text>
            <Text
              onPress={() => props.navigation.push('AboutApp')}
              style={{
                marginVertical: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14SemiBold,
              }}
            >
              About App
            </Text>
            <Text
              onPress={() => setLogoutDialog(true)}
              style={{
                marginVertical: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14SemiBold,
              }}
            >
              Logout
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  function category({ categoryName }) {
    return (
      <Text
        onPress={() => props.navigation.push('CategoryDetail')}
        style={{
          marginVertical: Sizes.fixPadding - 5.0,
          ...Fonts.blackColor17SemiBold,
        }}
      >
        {categoryName}
      </Text>
    );
  }

  function drawerDivider() {
    return (
      <View
        style={{
          backgroundColor: '#CCCCCC',
          marginVertical: Sizes.fixPadding,
          height: 1.0,
        }}
      />
    );
  }

  function drawerItems({ icon, title }) {
    return (
      <View style={{ ...styles.drawerItemWrapStyle }}>
        {icon}
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.grayColor14SemiBold,
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  logoutTextStyle: {
    marginTop: Sizes.fixPadding - 7.0,
    lineHeight: 18.0,
    textAlign: 'center',
    ...Fonts.blackColor16SemiBold,
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
  appIconBackgroundStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200.0,
    marginBottom: Sizes.fixPadding - 5.0,
  },
  drawerItemWrapStyle: {
    marginVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding + 5.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawer;
