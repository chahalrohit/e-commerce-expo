import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Colors, Fonts, Sizes } from '../../../constants/styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Delivery: undefined;
  Payment: undefined;
};

type DeliveryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Delivery'>;
};

const DeliveryScreen: React.FC<DeliveryScreenProps> = ({ navigation }) => {
  const [pincode, setPincode] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateValue, setStateValue] = useState<string>('');

  function gotoPaymentButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('Payment')}
        style={styles.gotoPaymentButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor14Bold }}>GO TO PAYMENT</Text>
      </TouchableOpacity>
    );
  }

  function addressInfo() {
    return (
      <>
        {pinCodeTextField()}
        {localityTextField()}
        {cityTextField()}
        {stateTextField()}
      </>
    );
  }

  function stateTextField() {
    return (
      <TextInput
        mode="flat"
        label="State"
        value={stateValue}
        onChangeText={(text: string) => setStateValue(text)}
        style={styles.textFieldStyle}
        theme={{
          colors: {
            placeholder: Colors.lightGrayColor,
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function cityTextField() {
    return (
      <TextInput
        mode="flat"
        label="City"
        value={city}
        onChangeText={(text: string) => setCity(text)}
        style={styles.textFieldStyle}
        theme={{
          colors: {
            placeholder: Colors.lightGrayColor,
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function localityTextField() {
    return (
      <TextInput
        mode="flat"
        label="Locality"
        value={locality}
        onChangeText={(text: string) => setLocality(text)}
        style={styles.textFieldStyle}
        theme={{
          colors: {
            placeholder: Colors.lightGrayColor,
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function pinCodeTextField() {
    return (
      <TextInput
        mode="flat"
        label="Pin Code"
        keyboardType="numeric"
        value={pincode}
        onChangeText={(text: string) => setPincode(text)}
        style={styles.textFieldStyle}
        theme={{
          colors: {
            placeholder: Colors.lightGrayColor,
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function title() {
    return (
      <Text
        style={{
          margin: Sizes.fixPadding + 5.0,
          textAlign: 'center',
          ...Fonts.lightGrayColor25Bold,
        }}
      >
        Where are your Ordered Item Shipped?
      </Text>
    );
  }

  function header() {
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
          DELIVERY
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsHorizontalScrollIndicator={false}>
          {title()}
          {addressInfo()}
          {gotoPaymentButton()}
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
  gotoPaymentButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding * 3.0,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding + 5.0,
    elevation: 10.0,
  },
  textFieldStyle: {
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding + 5.0,
    ...Fonts.blackColor15SemiBold,
    backgroundColor: 'transparent',
  },
});

export default DeliveryScreen;
