import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomSheet } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageSourcePropType,
  ListRenderItemInfo,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import AllProductsList from '../../components/products/products';

const { width, height } = Dimensions.get('window');

/** Types */
type Product = {
  uniqueId?: string;
  productImage: ImageSourcePropType;
  productTitle: string;
  price: string | number;
  oldPrice?: string | number;
  offer?: string | number;
};

type RouteLike = {
  params: { item: Product };
};

type NavigationLike = {
  pop: () => void;
  push: (route: string) => void;
};

type Props = {
  route: RouteLike;
  navigation: NavigationLike;
};

type ProductImageItem = { productImage: ImageSourcePropType };

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const item = route.params.item;

  const description =
    "Slip into this trendy and attractive dress from Rudraaksha and look stylish effortlessly. Made to accentuate any body type, it will give you that extra oomph and make you stand out wherever you are. Keep the accessories minimal for that added elegant look, just your favorite heels and dangling earrings, and of course, don't forget your pretty smile!";

  const [productImages] = useState<ProductImageItem[]>([
    { productImage: item.productImage },
    { productImage: item.productImage },
    { productImage: item.productImage },
    { productImage: item.productImage },
    { productImage: item.productImage },
  ]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [selectedProductSize, setSelectedProductSize] = useState<string | null>(
    null,
  );
  const [selectedProductColor, setSelectedProductColor] = useState<
    string | null
  >(null);
  const [showProductDescriptionSheet, setShowProductDescriptionSheet] =
    useState<boolean>(false);
  const [isInFavorite, setIsInFavorite] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [bagItemCount, setBagItemCount] = useState<number>(3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {/* Using FlatList as a scroll container */}
        <FlatList
          data={[] as any[]}
          keyExtractor={(_, i) => String(i)}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              {productImagesSlider()}
              {divider()}
              {productNamePriceAndRatingInfo()}
              {productSizeAndColorInfo()}
              {productDetails()}
              {productDescriptionInfo()}
              {similarProductInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      {addToBagAndBuyNowButton()}
      {productDescrptionBottomSheet()}
      {snackBarInfo()}
    </SafeAreaView>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        style={styles.snackBarStyle}
        elevation={0}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        {isInFavorite ? 'Added to Wishlist' : 'Remove from Wishlist'}
      </Snackbar>
    );
  }

  function addToBagAndBuyNowButton() {
    return (
      <View style={styles.addToBagAndByNowButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBagItemCount(bagItemCount + 1)}
          style={{
            backgroundColor: Colors.whiteColor,
            ...styles.addToBagAndByNowButtonStyle,
          }}
        >
          <Text style={{ ...Fonts.blackColor15Bold }}>ADD TO BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push('Delivery')}
          style={{
            backgroundColor: Colors.primaryColor,
            ...styles.addToBagAndByNowButtonStyle,
          }}
        >
          <Text style={{ ...Fonts.whiteColor15Bold }}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function productDescrptionBottomSheet() {
    return (
      <BottomSheet
        isVisible={showProductDescriptionSheet}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        modalProps={{
          onRequestClose: () => {
            setShowProductDescriptionSheet(false);
          },
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowProductDescriptionSheet(false)}
        >
          <View style={{ flex: 1, height: height }}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomSheetWrapStyle}>
                <Text
                  style={{ textAlign: 'center', ...Fonts.blackColor16Bold }}
                >
                  Product Description
                </Text>
                <View style={styles.bottomSheetDividerStyle} />
                <Text
                  style={{
                    lineHeight: 18.0,
                    marginBottom: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor12Medium,
                  }}
                >
                  {description}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>
    );
  }

  function similarProductInfo() {
    const renderItem = ({ item }: ListRenderItemInfo<Product>) => (
      <View
        style={{
          borderColor: '#e0e0e0',
          ...styles.productsWrapStyle,
          marginRight: Sizes.fixPadding,
        }}
      >
        <Image
          source={item.productImage}
          style={{
            height: 230.0,
            width: 160,
            marginBottom: Sizes.fixPadding - 5.0,
          }}
        />
        <Text numberOfLines={1} style={{ ...Fonts.blackColor13SemiBold }}>
          {item.productTitle}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...Fonts.blackColor15SemiBold }}>
            {'$'}
            {item.price}
          </Text>
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding - 5.0,
              textDecorationLine: 'line-through',
              ...Fonts.lightGrayColor12Medium,
            }}
          >
            {'$'}
            {item.oldPrice}
          </Text>
        </View>
        <Text style={{ ...Fonts.greenColor12Medium }}>{item.offer}</Text>
      </View>
    );

    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor17SemiBold,
          }}
        >
          SIMILAR PRODUCTS
        </Text>
        <FlatList<Product>
          horizontal
          showsHorizontalScrollIndicator={false}
          data={AllProductsList as Product[]}
          keyExtractor={p => `${p.uniqueId ?? p.productTitle}`}
          renderItem={renderItem}
        />
      </View>
    );
  }

  function productDescriptionInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding,
          marginVertical: Sizes.fixPadding - 5.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor17SemiBold }}>
          PRODUCT DESCRIPTION
        </Text>
        <Text
          numberOfLines={5}
          style={{
            lineHeight: 18.0,
            marginTop: Sizes.fixPadding,
            ...Fonts.blackColor12Medium,
          }}
        >
          {description}
        </Text>
        <View
          style={{
            backgroundColor: '#ececec',
            height: 1.0,
            marginVertical: Sizes.fixPadding - 4.0,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowProductDescriptionSheet(true)}
        >
          <Text
            style={{
              marginBottom: Sizes.fixPadding - 4.0,
              textAlign: 'center',
              ...Fonts.primaryColor14SemiBold,
            }}
          >
            View More
          </Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#ececec', height: 1.0 }} />
      </View>
    );
  }

  function productDetails() {
    return (
      <View style={styles.productDetailWrapStyle}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor17SemiBold,
          }}
        >
          PRODUCT DETAILS
        </Text>
        {productDetailShort({ title: 'Color', value: 'Yellow' })}
        {productDetailShort({ title: 'Length', value: 'Knee Length' })}
        {productDetailShort({ title: 'Type', value: 'Bandage' })}
        {productDetailShort({ title: 'Sleeve', value: 'Cap Sleeve' })}
      </View>
    );
  }

  function productDetailShort({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: Sizes.fixPadding - 5.0,
          alignItems: 'center',
        }}
      >
        <Text style={{ flex: 1, ...Fonts.lightGrayColor15SemiBold }}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ flex: 1, ...Fonts.blackColor15Medium }}
        >
          {value}
        </Text>
      </View>
    );
  }

  function productSizeAndColorInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          marginVertical: Sizes.fixPadding - 5.0,
          padding: Sizes.fixPadding,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...Fonts.blackColor17SemiBold }}>SIZE</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('SizeChart')}
            style={styles.sizeChartButtonStyle}
          >
            <Text style={{ ...Fonts.primaryColor13SemiBold }}>SIZE CHART</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginVertical: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor11Medium,
          }}
        >
          Tip:For the best fit,buy one size larger than your usual size.
        </Text>

        <View style={styles.productSizesInfoWrapStyle}>
          {productSize({ size: 'XS' })}
          {productSize({ size: 'S' })}
          {productSize({ size: 'M' })}
          {productSize({ size: 'L' })}
        </View>

        <View
          style={{
            backgroundColor: '#ececec',
            height: 1.0,
            marginVertical: Sizes.fixPadding,
          }}
        />

        <Text style={{ ...Fonts.blackColor17SemiBold }}>COLOR</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          {productColor({ color: Colors.blackColor as string })}
          {productColor({ color: Colors.primaryColor as string })}
          {productColor({ color: Colors.blueColor as string })}
        </View>
      </View>
    );
  }

  function productColor({ color }: { color: string }) {
    const selected = selectedProductColor === color;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedProductColor(color)}
        style={{
          ...styles.productColorWrapStyle,
          backgroundColor: color,
          borderColor: selected ? Colors.primaryColor : 'transparent',
        }}
      >
        {selected ? (
          <MaterialIcons name="check" color={Colors.whiteColor} size={26} />
        ) : null}
      </TouchableOpacity>
    );
  }

  function productSize({ size }: { size: string }) {
    const selected = selectedProductSize === size;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedProductSize(size)}
        style={{
          backgroundColor: selected ? Colors.primaryColor : Colors.whiteColor,
          borderColor: '#e0e0e0',
          ...styles.sizesWrapStyle,
        }}
      >
        <Text
          style={
            selected
              ? { ...Fonts.whiteColor13Bold }
              : { ...Fonts.blackColor13Bold }
          }
        >
          {size}
        </Text>
      </TouchableOpacity>
    );
  }

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.whiteColor }}>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            height: 1.0,
            marginTop: Sizes.fixPadding,
            marginBottom: Sizes.fixPadding + 3.0,
          }}
        />
      </View>
    );
  }

  function productNamePriceAndRatingInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: Sizes.fixPadding,
        }}
      >
        <Text style={{ ...Fonts.blackColor17SemiBold }}>
          {item.productTitle}
        </Text>
        <View style={styles.specialPriceTextWrapStyle}>
          <Text style={{ ...Fonts.primaryColor11Medium }}>Special Price</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...Fonts.blackColor17SemiBold }}>
            {'$'}
            {item.price}
          </Text>
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding,
              textDecorationLine: 'line-through',
              ...Fonts.lightGrayColor14Medium,
            }}
          >
            {'$'}
            {item.oldPrice}
          </Text>
          <Text style={{ ...Fonts.primaryColor14Medium }}>₹{item.offer}</Text>
        </View>
        <View
          style={{
            marginVertical: Sizes.fixPadding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={styles.ratingWrapStyle}>
            <Text style={{ ...Fonts.whiteColor12Medium }}>4.3</Text>
            <MaterialIcons
              name="star"
              color={Colors.whiteColor}
              size={15}
              style={{ marginLeft: Sizes.fixPadding - 5.0 }}
            />
          </View>
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              ...Fonts.lightGrayColor13Medium,
            }}
          >
            2814 ratings
          </Text>
        </View>
      </View>
    );
  }

  function _renderItem({ item }: { item: ProductImageItem; index: number }) {
    return (
      <View
        style={{ backgroundColor: Colors.whiteColor, width, height: 410.0 }}
      >
        <ImageBackground
          source={item.productImage}
          style={{ width: width - 100, height: 410.0, alignSelf: 'center' }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[
              'transparent',
              'transparent',
              'transparent',
              'transparent',
              'transparent',
              'rgba(255,255,255,0.99)',
            ]}
            style={{ width: width - 100, height: 410.0, alignSelf: 'center' }}
          />
        </ImageBackground>
      </View>
    );
  }

  function productImagesSlider() {
    return (
      <View>
        <Carousel<ProductImageItem>
          data={productImages}
          sliderWidth={width}
          autoplay
          loop
          autoplayInterval={4000}
          itemWidth={width}
          renderItem={_renderItem}
          onSnapToItem={(i: number) => setActiveSlide(i)}
        />
        {pagination()}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setIsInFavorite(!isInFavorite);
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);
          }}
          style={styles.favoriteIconWrapStyle}
        >
          <MaterialIcons
            name={isInFavorite ? 'favorite' : 'favorite-border'}
            color={isInFavorite ? Colors.primaryColor : Colors.lightGrayColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={productImages.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={styles.backArrowAndProductTitleWrapStyle}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color="black"
            style={{ marginRight: Sizes.fixPadding + 5.0 }}
            onPress={() => navigation.pop()}
          />
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.blackColor18Bold }}
          >
            {item.productTitle}
          </Text>
        </View>

        <View style={styles.headerIconsWrapStyle}>
          <MaterialIcons
            name="search"
            color={Colors.blackColor}
            size={25}
            onPress={() => navigation.push('Search')}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('Wishlist')}
          >
            <MaterialIcons
              name="favorite-border"
              color={Colors.blackColor}
              size={25}
            />
            <View style={styles.favoritsAndShoppingsCountStyle}>
              <Text style={{ ...Fonts.whiteColor12Medium }}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('Bag')}
          >
            <FontAwesome5
              name="shopping-bag"
              size={24}
              color={Colors.blackColor}
            />
            <View style={styles.favoritsAndShoppingsCountStyle}>
              <Text style={{ ...Fonts.whiteColor12Medium }}>
                {bagItemCount}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Sizes.fixPadding * 2.0,
    paddingRight: Sizes.fixPadding + 1.0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    elevation: 2.0,
  },
  favoritsAndShoppingsCountStyle: {
    position: 'absolute',
    right: -10.0,
    top: -5.0,
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    backgroundColor: Colors.redColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconsWrapStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrowAndProductTitleWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2.0,
    marginRight: Sizes.fixPadding + 10.0,
  },
  sliderActiveDotStyle: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: Colors.blueColor,
    marginHorizontal: Sizes.fixPadding - 18.0,
  },
  sliderInactiveDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6.0,
    backgroundColor: Colors.grayColor,
  },
  sliderPaginationWrapStyle: {
    position: 'absolute',
    bottom: -20.0,
    left: 0.0,
    right: 0.0,
  },
  sizesWrapStyle: {
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    width: 50.0,
    height: 35.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingWrapStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 1.0,
    paddingHorizontal: Sizes.fixPadding - 3.0,
    alignItems: 'center',
    elevation: 10.0,
  },
  specialPriceTextWrapStyle: {
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 8.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginVertical: Sizes.fixPadding - 3.0,
  },
  sizeChartButtonStyle: {
    borderColor: Colors.lightGrayColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  productSizesInfoWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  productColorWrapStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    borderWidth: 2.0,
  },
  productDetailWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding - 5.0,
  },
  productsWrapStyle: {
    alignItems: 'center',
    paddingBottom: Sizes.fixPadding * 3.0,
    paddingTop: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderWidth: 2.0,
    elevation: 1.0,
  },
  bottomSheetWrapStyle: {
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  bottomSheetDividerStyle: {
    backgroundColor: '#e0e0e0',
    height: 1.0,
    marginVertical: Sizes.fixPadding,
  },
  addToBagAndByNowButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  addToBagAndByNowButtonWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ececec',
    borderTopWidth: 1.0,
  },
  favoriteIconWrapStyle: {
    position: 'absolute',
    right: 20.0,
    top: 20.0,
    width: 60.0,
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    elevation: 4.0,
    borderRadius: 30.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snackBarStyle: {
    position: 'absolute',
    bottom: 40.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
  },
});

export default ProductDetailScreen;
