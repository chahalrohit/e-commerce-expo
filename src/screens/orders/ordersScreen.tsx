import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  ListRenderItemInfo,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../../constants/styles';

const { width } = Dimensions.get('window');

/** Types */
type OrderStatus = 'Out for Delivery' | 'Shipped' | 'Delivered';

type OrderItem = {
  productId: number;
  productImage: ImageSourcePropType;
  productTitle: string;
  price: string; // keep as string to match source data
  productSize: string;
  uniqueId: string;
  orderStatus: OrderStatus;
};

type Props = {
  navigation: {
    pop: () => void;
  };
};

/** Data */
const ordersList: OrderItem[] = [
  {
    productId: 11,
    productImage: require('../../assets/images/products/product_11.jpg'),
    productTitle: 'Men Slim Fit Casual Shirt',
    price: '57',
    productSize: 'L',
    uniqueId: 'product14',
    orderStatus: 'Out for Delivery',
  },
  {
    productId: 21,
    productImage: require('../../assets/images/products/product_21.jpg'),
    productTitle: 'Solid Round Neck T-shirt',
    price: '71',
    productSize: 'M',
    uniqueId: 'product21',
    orderStatus: 'Shipped',
  },
  {
    productId: 17,
    productImage: require('../../assets/images/products/product_17.jpg'),
    productTitle: 'Solid Shirt Style Top',
    price: '30',
    productSize: 'L',
    uniqueId: 'product4',
    orderStatus: 'Delivered',
  },
];

const OrdersScreen: React.FC<Props> = ({ navigation }) => {
  const header = () => (
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
        MY ORDERS
      </Text>
    </View>
  );

  const renderItem = ({ item }: ListRenderItemInfo<OrderItem>) => (
    <View style={styles.orderInfoWrapStyle}>
      <Image source={item.productImage} style={{ width: 120, height: 160 }} />
      <View
        style={{
          marginVertical: Sizes.fixPadding,
          marginLeft: Sizes.fixPadding,
        }}
      >
        <Text style={{ maxWidth: width - 150, ...Fonts.blackColor15SemiBold }}>
          {item.productTitle}
        </Text>

        <View
          style={{
            marginVertical: Sizes.fixPadding - 2.0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              marginRight: Sizes.fixPadding,
              ...Fonts.lightGrayColor13Medium,
            }}
          >
            Price:
          </Text>
          <Text style={{ ...Fonts.blueColor13SemiBold }}>
            {'$'}
            {item.price}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...Fonts.lightGrayColor13Medium }}>Size:</Text>
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding,
              ...Fonts.blueColor13SemiBold,
            }}
          >
            {item.productSize}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor:
            item.orderStatus === 'Out for Delivery'
              ? Colors.blueColor
              : item.orderStatus === 'Shipped'
              ? Colors.yellowColor
              : Colors.greenColor,
          ...styles.orderStatusWrapStyle,
        }}
      >
        <Text style={{ ...Fonts.whiteColor11Medium }}>{item.orderStatus}</Text>
      </View>
    </View>
  );

  const orders = () => (
    <FlatList<OrderItem>
      data={ordersList}
      keyExtractor={item => item.uniqueId}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {orders()}
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
  orderStatusWrapStyle: {
    position: 'absolute',
    right: 0.0,
    top: 0.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  orderInfoWrapStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding - 5.0,
    elevation: 5.0,
    alignItems: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    paddingLeft: Sizes.fixPadding - 7.0,
    marginBottom: Sizes.fixPadding,
  },
});

export default OrdersScreen;
