import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { JSX, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../../constants/styles';
import { StackNavigationProp } from '@react-navigation/stack';

// ---------- TYPES ----------
interface Price {
  id: string;
  isSelected: boolean;
  discount: string;
}

interface Brand {
  id: string;
  isSelected: boolean;
  brand: string;
}

interface Occasion {
  id: string;
  isSelected: boolean;
  occasion: string;
}

type RootStackParamList = {
  Filter: undefined;
  // Add other screens here if you want
};

type FilterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Filter'
>;

type FilterScreenProps = {
  navigation: FilterScreenNavigationProp;
};

// ---------- DATA ----------
const pricesList: Price[] = [
  { id: '1', isSelected: false, discount: '$49 and below' },
  { id: '2', isSelected: false, discount: '$50 to $99' },
  { id: '3', isSelected: false, discount: '$100 and above' },
];

const brandsList: Brand[] = [
  { id: '1', isSelected: false, brand: 'Calvin Klein' },
  { id: '2', isSelected: false, brand: 'Nike' },
  { id: '3', isSelected: false, brand: 'Puma' },
];

const occasionList: Occasion[] = [
  { id: '1', isSelected: false, occasion: 'Casual' },
  { id: '2', isSelected: false, occasion: 'Party & Festive' },
  { id: '3', isSelected: false, occasion: 'Wedding' },
];

// ---------- COMPONENT ----------
const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const [prices, setPrices] = useState<Price[]>(pricesList);
  const [brands, setBrands] = useState<Brand[]>(brandsList);
  const [occasions, setOccasions] = useState<Occasion[]>(occasionList);

  const cancelAndApplyButton = (): JSX.Element => {
    return (
      <View style={styles.cancelAndApplyButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.pop()}
          style={{
            backgroundColor: Colors.whiteColor,
            ...styles.cancelAndApplyButtonStyle,
          }}
        >
          <Text style={{ ...Fonts.blackColor15Bold }}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.pop()}
          style={{
            backgroundColor: Colors.primaryColor,
            ...styles.cancelAndApplyButtonStyle,
          }}
        >
          <Text style={{ ...Fonts.whiteColor15Bold }}>APPLY</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const occasionInfo = (): JSX.Element => {
    return (
      <View>
        {divider()}
        <Text
          style={{
            paddingVertical: Sizes.fixPadding,
            ...Fonts.blackColor15SemiBold,
            textAlign: 'center',
          }}
        >
          OCCASION
        </Text>
        {divider()}
        {occasions.map((item, index) => (
          <View key={item.id}>
            <View
              style={{
                marginTop: index === 0 ? Sizes.fixPadding + 5.0 : 0.0,
                ...styles.chackBoxWithTextWrapStyle,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggleOccasionCheck({ id: item.id })}
                style={{
                  ...styles.checkBoxStyle,
                  backgroundColor: item.isSelected
                    ? Colors.primaryColor
                    : Colors.whiteColor,
                  borderColor: item.isSelected
                    ? Colors.primaryColor
                    : Colors.lightGrayColor,
                }}
              >
                {item.isSelected && (
                  <MaterialIcons
                    name="check"
                    size={15}
                    color={Colors.whiteColor}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding + 5.0,
                  ...Fonts.blackColor13Medium,
                }}
              >
                {item.occasion}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const brandInfo = (): JSX.Element => {
    return (
      <View>
        {divider()}
        <Text
          style={{
            marginVertical: Sizes.fixPadding,
            ...Fonts.blackColor15SemiBold,
            textAlign: 'center',
          }}
        >
          BRAND
        </Text>
        {divider()}
        {brands.map((item, index) => (
          <View key={item.id}>
            <View
              style={{
                marginTop: index === 0 ? Sizes.fixPadding + 5.0 : 0.0,
                ...styles.chackBoxWithTextWrapStyle,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggleBrandCheck({ id: item.id })}
                style={{
                  ...styles.checkBoxStyle,
                  backgroundColor: item.isSelected
                    ? Colors.primaryColor
                    : Colors.whiteColor,
                  borderColor: item.isSelected
                    ? Colors.primaryColor
                    : Colors.lightGrayColor,
                }}
              >
                {item.isSelected && (
                  <MaterialIcons
                    name="check"
                    size={15}
                    color={Colors.whiteColor}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding + 5.0,
                  ...Fonts.blackColor13Medium,
                }}
              >
                {item.brand}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const priceInfo = (): JSX.Element => {
    return (
      <View>
        <Text
          style={{
            marginVertical: Sizes.fixPadding,
            ...Fonts.blackColor15SemiBold,
            textAlign: 'center',
          }}
        >
          PRICE
        </Text>
        {divider()}
        {prices.map((item, index) => (
          <View key={item.id}>
            <View
              style={{
                marginTop: index === 0 ? Sizes.fixPadding + 5.0 : 0.0,
                ...styles.chackBoxWithTextWrapStyle,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => togglePricesCheck({ id: item.id })}
                style={{
                  ...styles.checkBoxStyle,
                  backgroundColor: item.isSelected
                    ? Colors.primaryColor
                    : Colors.whiteColor,
                  borderColor: item.isSelected
                    ? Colors.primaryColor
                    : Colors.lightGrayColor,
                }}
              >
                {item.isSelected && (
                  <MaterialIcons
                    name="check"
                    size={15}
                    color={Colors.whiteColor}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding + 5.0,
                  ...Fonts.blackColor13Medium,
                }}
              >
                {item.discount}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const toggleOccasionCheck = ({ id }: { id: string }) => {
    setOccasions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const toggleBrandCheck = ({ id }: { id: string }) => {
    setBrands(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const togglePricesCheck = ({ id }: { id: string }) => {
    setPrices(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const divider = (): JSX.Element => {
    return (
      <View
        style={{
          backgroundColor: '#e0e0e0',
          height: 1.0,
          marginHorizontal: Sizes.fixPadding - 5.0,
        }}
      />
    );
  };

  const header = (): JSX.Element => {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}
        >
          FILTER
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
          {priceInfo()}
          {brandInfo()}
          {occasionInfo()}
        </ScrollView>
        {cancelAndApplyButton()}
      </View>
    </SafeAreaView>
  );
};

// ---------- STYLES ----------
const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    elevation: 2.0,
  },
  checkBoxStyle: {
    height: 19.0,
    width: 19.0,
    borderWidth: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chackBoxWithTextWrapStyle: {
    flexDirection: 'row',
    marginBottom: Sizes.fixPadding + 15.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: 'center',
  },
  cancelAndApplyButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  cancelAndApplyButtonWrapStyle: {
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.0,
  },
});

export default FilterScreen;
