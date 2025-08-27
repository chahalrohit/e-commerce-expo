import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors, Fonts, Sizes } from '../../constants/styles';

const { width } = Dimensions.get('window');

type WishlistItem = {
  key: string;
  productImage: any; // if you have image module declarations, replace with ImageSourcePropType
  productTitle: string;
  productPrice: number;
  productSize: string;
};

type NavigationLike = {
  pop: () => void;
  push: (route: string) => void;
};

type Props = {
  navigation: NavigationLike;
};

const wishlistsData: WishlistItem[] = [
  {
    key: '1',
    productImage: require('../../assets/images/products/product_21.jpg'),
    productTitle: 'Solid Round Neck T-shirt',
    productPrice: 49,
    productSize: 'L',
  },
  {
    key: '2',
    productImage: require('../../assets/images/products/product_11.jpg'),
    productTitle: 'Men Slim Fit Casual Shirt',
    productPrice: 39,
    productSize: 'M',
  },
];

const WishlistScreen: React.FC<Props> = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [listData, setListData] = useState<WishlistItem[]>(wishlistsData);

  // Persist per-row animated values across renders
  const rowTranslateAnimatedValues = useRef<Record<string, Animated.Value>>(
    {},
  ).current;

  // Ensure an Animated.Value exists for each current item key
  useEffect(() => {
    listData.forEach(item => {
      if (!rowTranslateAnimatedValues[item.key]) {
        rowTranslateAnimatedValues[item.key] = new Animated.Value(1);
      }
    });
  }, [listData, rowTranslateAnimatedValues]);

  const animationIsRunning = useRef<boolean>(false);

  const onSwipeValueChange = (swipeData: { key: string; value: number }) => {
    const { key, value } = swipeData;

    if ((value < -width || value > width) && !animationIsRunning.current) {
      animationIsRunning.current = true;

      const anim = rowTranslateAnimatedValues[key] ?? new Animated.Value(1);
      rowTranslateAnimatedValues[key] = anim;

      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false, // height interpolation uses layout, so keep false
      }).start(() => {
        const prevIndex = listData.findIndex(item => item.key === key);
        if (prevIndex !== -1) {
          const newData = [...listData];
          newData.splice(prevIndex, 1);
          setListData(newData);
          setShowSnackBar(true);
        }
        animationIsRunning.current = false;
      });
    }
  };

  function updateWishlist({ key }: { key: string }) {
    const newList = listData.filter(product => product.key !== key);
    setListData(newList);
    setShowSnackBar(true);
  }

  const renderItem = ({ item }: { item: WishlistItem }) => {
    const anim = rowTranslateAnimatedValues[item.key] ?? new Animated.Value(1);
    rowTranslateAnimatedValues[item.key] = anim;

    return (
      <Animated.View
        style={[
          {
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 170],
            }),
          },
        ]}
      >
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
          <View style={styles.productWrapStyle}>
            <Image
              source={item.productImage}
              style={styles.productImageStyle}
            />
            <View
              style={{
                marginVertical: Sizes.fixPadding,
                marginLeft: Sizes.fixPadding,
              }}
            >
              <Text
                style={{
                  maxWidth: width - 150,
                  ...Fonts.blackColor15SemiBold,
                }}
                numberOfLines={2}
              >
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
                  {item.productPrice}
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
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => updateWishlist({ key: item.key })}
                  style={styles.removeButtonStyle}
                >
                  <Text style={{ ...Fonts.whiteColor12SemiBold }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderHiddenItem = () => <View style={styles.rowBack} />;

  function wishlistEmptyInfo() {
    return (
      <View style={styles.noWishlistItemsWrapStyle}>
        <Text style={{ ...Fonts.blackColor18Bold }}>WISHLIST EMPTY</Text>
        <Text
          style={{
            marginVertical: Sizes.fixPadding - 5.0,
            textAlign: 'center',
            ...Fonts.lightGrayColor13Medium,
          }}
        >
          {`Save your favorite pleces of clothing in one\nplace. Add now, buy later.`}
        </Text>
        <Image
          source={require('../../assets/images/empty_wishlist.png')}
          style={styles.wishlistEmptyImageStyle}
          resizeMode="contain"
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push('Home')}
          style={styles.continueShoppingButtonStyle}
        >
          <Text style={{ ...Fonts.primaryColor16Bold }}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </View>
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
          MY WISHLIST
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
          {listData.length === 0 ? (
            wishlistEmptyInfo()
          ) : (
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-width}
              leftOpenValue={width}
              onSwipeValueChange={onSwipeValueChange}
              useNativeDriver={false}
              keyExtractor={item => item.key}
            />
          )}

          <Snackbar
            style={styles.snackBarStyle}
            visible={showSnackBar}
            onDismiss={() => setShowSnackBar(false)}
          >
            <Text style={{ ...Fonts.whiteColor12Medium }}>Item Removed</Text>
          </Snackbar>
        </View>
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
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  productWrapStyle: {
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    marginHorizontal: Sizes.fixPadding - 5.0,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginVertical: Sizes.fixPadding - 5.0,
  },
  productImageStyle: {
    height: 160.0,
    width: 120.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderBottomLeftRadius: Sizes.fixPadding - 5.0,
  },
  removeButtonStyle: {
    backgroundColor: '#9E9E9E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding - 6.0,
    paddingVertical: Sizes.fixPadding - 7.0,
  },
  continueShoppingButtonStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  noWishlistItemsWrapStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backColor,
  },
  wishlistEmptyImageStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding + 5.0,
    width: 130.0,
    height: 130.0,
  },
});

export default WishlistScreen;
