import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomSheet } from '@rneui/themed';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Bounce } from 'react-native-animated-spinkit';
import { Colors, Fonts, Sizes } from '../../../constants/styles';
import MenProductsList from '../../components/products/men_products';
import AllProductsList from '../../components/products/products';
import WomenProductsList from '../../components/products/women_products';

const { width, height } = Dimensions.get('window');

const sortingCategoriesList = [
  'Popularity',
  'Price -- Low to High',
  'Price -- High to Low',
  'Newest First',
];

const productCategoriesList = [
  {
    id: '1',
    productCategory: 'ALL',
  },
  {
    id: '2',
    productCategory: 'MENS',
  },
  {
    id: '3',
    productCategory: 'WOMENS',
  },
];

const ProductsScreen = ({ navigation }) => {
  const [getProducts, setGetProducts] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState(
    productCategoriesList[0].productCategory,
  );
  const [productsList, setProductsList] = useState(AllProductsList);
  const [showSortBottomSheet, setShowSortBottomSheet] = useState(false);
  const [currentSortingCriteria, setCurrentSortingCriteria] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {getProducts ? (
          <FlatList
            ListHeaderComponent={
              <>
                {productsCategories()}
                {sortAndFilterCriteria()}
                {products()}
              </>
            }
            showsVerticalScrollIndicator={false}
          />
        ) : (
          getProductsData()
        )}
      </View>
      {productSortBySheet()}
    </SafeAreaView>
  );

  function productSortBySheet() {
    return (
      <BottomSheet
        isVisible={showSortBottomSheet}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        modalProps={{
          onRequestClose: () => {
            setShowSortBottomSheet(false);
          },
        }}
      >
        <TouchableWithoutFeedback onPress={() => setShowSortBottomSheet(false)}>
          <View style={{ flex: 1, height: height }}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomSheetWrapStyle}>
                <Text
                  style={{ textAlign: 'center', ...Fonts.blackColor16Bold }}
                >
                  SORT BY
                </Text>
                <View style={styles.bottomSheetDividerStyle} />
                {sortingCategoriesList.map((item, index) => (
                  <View key={`${index}`}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setCurrentSortingCriteria(item);
                        setShowSortBottomSheet(false);
                      }}
                      style={styles.sortCriteriaWrapStyle}
                    >
                      <View
                        style={{
                          ...styles.radioButtonOuterStyle,
                          borderColor:
                            currentSortingCriteria == item
                              ? Colors.blueColor
                              : Colors.lightGrayColor,
                        }}
                      >
                        {currentSortingCriteria == item ? (
                          <View style={styles.radioButtonInnerStyle} />
                        ) : null}
                      </View>
                      <Text
                        style={{
                          marginLeft: Sizes.fixPadding + 5.0,
                          ...Fonts.blackColor15Medium,
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>
    );
  }

  function products() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push('ProductDetail', { item })}
          style={{
            borderLeftColor: index % 2 != 0 ? '#cccccc' : 'transparent',
            borderRightColor: index % 2 == 0 ? '#cccccc' : 'transparent',
            ...styles.productsWrapStyle,
          }}
        >
          <Image
            source={item.productImage}
            style={{
              height: 230.0,
              width: width / 2.4,
              marginBottom: Sizes.fixPadding - 5.0,
            }}
          />
          <Text numberOfLines={1} style={{ ...Fonts.blackColor13SemiBold }}>
            {item.productTitle}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...Fonts.blackColor15Bold }}>
              {`$`}
              {item.price}
            </Text>
            <Text
              style={{
                marginHorizontal: Sizes.fixPadding - 5.0,
                textDecorationLine: 'line-through',
                ...Fonts.lightGrayColor12Medium,
              }}
            >
              {`$`}
              {item.oldPrice}
            </Text>
            <Text style={{ ...Fonts.greenColor12Medium }}>({item.offer})</Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={productsList}
        keyExtractor={item => `${item.uniqueId}`}
        renderItem={renderItem}
        numColumns={2}
      />
    );
  }

  function sortAndFilterCriteria() {
    return (
      <View>
        <View
          style={{
            marginTop: Sizes.fixPadding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowSortBottomSheet(true)}
            style={styles.sortAndFilterInfoWrapStyle}
          >
            <MaterialIcons
              name="sort"
              style={{ marginRight: Sizes.fixPadding }}
              color={Colors.blackColor}
              size={24}
            />
            <Text style={{ ...Fonts.blackColor16SemiBold }}>SORT</Text>
          </TouchableOpacity>
          <View
            style={{
              width: 1.0,
              height: 20.0,
              backgroundColor: Colors.lightGrayColor,
            }}
          ></View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('Filter')}
            style={styles.sortAndFilterInfoWrapStyle}
          >
            <MaterialIcons
              name="filter-list"
              color={Colors.blackColor}
              style={{ marginRight: Sizes.fixPadding }}
              size={24}
            />
            <Text style={{ ...Fonts.blackColor16SemiBold }}>FILTER</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            height: 1.0,
            marginVertical: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function getProductsData() {
    setTimeout(() => {
      setGetProducts(true);
    }, 1500);

    return (
      <Bounce
        size={48}
        color={Colors.primaryColor}
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  function productsCategories() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setGetProducts(false);
          setSelectedProductCategory(item.productCategory);
          setProductsList(
            item.productCategory == 'MENS'
              ? MenProductsList
              : item.productCategory == 'WOMENS'
              ? WomenProductsList
              : AllProductsList,
          );
        }}
        style={{
          borderColor:
            selectedProductCategory == item.productCategory
              ? Colors.primaryColor
              : Colors.lightGrayColor,
          ...styles.productCategoriesWrapStyle,
        }}
      >
        <Text
          style={
            selectedProductCategory == item.productCategory
              ? { ...Fonts.primaryColor15SemiBold }
              : { ...Fonts.blackColor15Medium }
          }
        >
          {item.productCategory}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <FlatList
          horizontal
          data={productCategoriesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 2.0,
          }}
        >
          <MaterialIcons
            name="arrow-back"
            size={25}
            color="black"
            style={{ marginRight: Sizes.fixPadding + 5.0 }}
            onPress={() => navigation.pop()}
          />
          <View>
            <Text style={{ ...Fonts.blackColor15Bold }}>PRODUCTS</Text>
            <Text style={{ ...Fonts.lightGrayColor12SemiBold }}>
              37024 ITEMS
            </Text>
          </View>
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
              <Text style={{ ...Fonts.whiteColor12Medium }}>3</Text>
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
    paddingVertical: Sizes.fixPadding,
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
  productCategoriesWrapStyle: {
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 4.0,
    paddingHorizontal: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
  },
  sortAndFilterInfoWrapStyle: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    flex: 1,
    paddingBottom: Sizes.fixPadding * 3.0,
    paddingTop: Sizes.fixPadding - 5.0,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1.0,
  },
  radioButtonOuterStyle: {
    width: 18.0,
    height: 18.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9.0,
    borderWidth: 2.0,
  },
  radioButtonInnerStyle: {
    backgroundColor: Colors.blueColor,
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
  },
  bottomSheetWrapStyle: {
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding,
  },
  bottomSheetDividerStyle: {
    backgroundColor: '#e0e0e0',
    height: 1.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 10.0,
  },
  sortCriteriaWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
});

export default ProductsScreen;
