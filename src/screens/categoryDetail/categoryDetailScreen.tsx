import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
} from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import { Colors, Fonts, Sizes } from '../../../constants/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
const itemWidth = Math.round(width * 0.76);

/* ---------- Navigation Types ---------- */
type RootStackParamList = {
  CategoryDetail: undefined;
  Products: undefined;
  Search: undefined;
  Wishlist: undefined;
  Bag: undefined;
};

type CategoryDetailScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  'CategoryDetail'
>;

/* ---------- Data Models ---------- */
interface WithId {
  id: string;
}

interface SafetyItem extends WithId {
  safetyImage: ImageSourcePropType;
}

interface BannerItem {
  bannerImage: ImageSourcePropType;
}

interface ExploreCategoryItem extends WithId {
  categoryImage: ImageSourcePropType;
}

interface SpotlightItem extends WithId {
  spotlightProductImage: ImageSourcePropType;
}

interface BrandItem extends WithId {
  brandImage: ImageSourcePropType;
}

interface KidsApparelItem extends WithId {
  kidsApparelsImage: ImageSourcePropType;
}

/* ---------- Static Data ---------- */
const safetyCheckListData: SafetyItem[] = [
  {
    id: '1',
    safetyImage: require('../../assets/images/safety_checklist/safety_1.jpg'),
  },
  {
    id: '2',
    safetyImage: require('../../assets/images/safety_checklist/safety_2.jpg'),
  },
  {
    id: '3',
    safetyImage: require('../../assets/images/safety_checklist/safety_3.jpg'),
  },
  {
    id: '4',
    safetyImage: require('../../assets/images/safety_checklist/safety_4.jpg'),
  },
  {
    id: '5',
    safetyImage: require('../../assets/images/safety_checklist/safety_5.jpg'),
  },
];

const categoryBannerSliderList: BannerItem[] = [
  {
    bannerImage: require('../../assets/images/category_page_slider/category_page_slider_1.jpg'),
  },
  {
    bannerImage: require('../../assets/images/category_page_slider/category_page_slider_2.jpg'),
  },
];

const exploreCategoriesList: ExploreCategoryItem[] = [
  {
    id: '1',
    categoryImage: require('../../assets/images/category_explore_category/category_explore_category_1.jpg'),
  },
  {
    id: '2',
    categoryImage: require('../../assets/images/category_explore_category/category_explore_category_2.jpg'),
  },
  {
    id: '3',
    categoryImage: require('../../assets/images/category_explore_category/category_explore_category_3.jpg'),
  },
  {
    id: '4',
    categoryImage: require('../../assets/images/category_explore_category/category_explore_category_4.jpg'),
  },
  {
    id: '5',
    categoryImage: require('../../assets/images/category_explore_category/category_explore_category_5.jpg'),
  },
  {
    id: '6',
    categoryImage: require('../../assets/images/category_explore_category/category_explore_category_6.jpg'),
  },
];

const spotlightProductsList: SpotlightItem[] = [
  {
    id: '1',
    spotlightProductImage: require('../../assets/images/in_the_spotlight/in_the_spotlight_1.jpg'),
  },
  {
    id: '2',
    spotlightProductImage: require('../../assets/images/in_the_spotlight/in_the_spotlight_2.jpg'),
  },
];

const exploreBrandsList: BrandItem[] = [
  {
    id: '1',
    brandImage: require('../../assets/images/explore_brands/explore_brands_1.jpg'),
  },
  {
    id: '2',
    brandImage: require('../../assets/images/explore_brands/explore_brands_2.jpg'),
  },
  {
    id: '3',
    brandImage: require('../../assets/images/explore_brands/explore_brands_3.jpg'),
  },
  {
    id: '4',
    brandImage: require('../../assets/images/explore_brands/explore_brands_4.jpg'),
  },
  {
    id: '5',
    brandImage: require('../../assets/images/explore_brands/explore_brands_5.jpg'),
  },
  {
    id: '6',
    brandImage: require('../../assets/images/explore_brands/explore_brands_6.jpg'),
  },
  {
    id: '7',
    brandImage: require('../../assets/images/explore_brands/explore_brands_7.jpg'),
  },
  {
    id: '8',
    brandImage: require('../../assets/images/explore_brands/explore_brands_8.jpg'),
  },
  {
    id: '9',
    brandImage: require('../../assets/images/explore_brands/explore_brands_9.jpg'),
  },
];

const kidsApparelsList: KidsApparelItem[] = [
  {
    id: '1',
    kidsApparelsImage: require('../../assets/images/kids_apparels/kids_apparels_1.jpg'),
  },
  {
    id: '2',
    kidsApparelsImage: require('../../assets/images/kids_apparels/kids_apparels_2.jpg'),
  },
];

/* ---------- Component ---------- */
type Props = {
  navigation: CategoryDetailScreenNav;
};

const CategoryDetailScreen: React.FC<Props> = ({ navigation }) => {
  const [categoryBannerSliderData] = useState<BannerItem[]>(
    categoryBannerSliderList,
  );
  const [activeSlide, setActiveSlide] = useState<number>(0);

  /* -------- Renderers -------- */
  const renderKidsApparelItem: ListRenderItem<KidsApparelItem> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push('Products')}
    >
      <Image
        source={item.kidsApparelsImage}
        style={styles.kidsApparelsImageStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderBrandItem: ListRenderItem<BrandItem> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push('Products')}
    >
      <Image
        source={item.brandImage}
        style={styles.brandImageStyle}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );

  const renderSpotlightItem: ListRenderItem<SpotlightItem> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push('Products')}
    >
      <Image
        source={item.spotlightProductImage}
        style={styles.spotlightProductImageStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderExploreCategoryItem: ListRenderItem<ExploreCategoryItem> = ({
    item,
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push('Products')}
    >
      <Image
        source={item.categoryImage}
        style={styles.exploreCategoriesImageStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderBannerItem: ListRenderItem<BannerItem> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push('Products')}
    >
      <Image
        source={item.bannerImage}
        style={{ width: width - 100, height: 250 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderSafetyItem: ListRenderItem<SafetyItem> = ({ item }) => (
    <Image
      source={item.safetyImage}
      style={styles.safetyImageStyle}
      resizeMode="contain"
    />
  );

  /* -------- Sections -------- */
  const kidsApparels = () => (
    <View>
      <Text style={styles.kidsApparelsTextStyle}>KIDS APPARELS</Text>
      <FlatList
        horizontal
        data={kidsApparelsList}
        keyExtractor={item => item.id}
        renderItem={renderKidsApparelItem}
        contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const exploreBrands = () => (
    <View>
      <Text style={styles.exploreBrandsTextStyle}>EXPLORE BRANDS</Text>
      <FlatList
        listKey="brandList"
        data={exploreBrandsList}
        keyExtractor={item => item.id}
        renderItem={renderBrandItem}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: 'red' }}
        columnWrapperStyle={{
          paddingHorizontal: Sizes.fixPadding - 5.0,
          flexDirection: 'row',
        }}
      />
    </View>
  );

  const spotlightProducts = () => (
    <View>
      <Text style={styles.inTheSpotlightTextStyle}>IN THE SPOTLIGHT</Text>
      <FlatList
        horizontal
        data={spotlightProductsList}
        keyExtractor={item => item.id}
        renderItem={renderSpotlightItem}
        contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const exploreCategories = () => (
    <View>
      <Text style={styles.exploreCategoriesTextStyle}>EXPLORE CATEGORY</Text>
      <FlatList
        listKey="categoryList"
        data={exploreCategoriesList}
        keyExtractor={item => item.id}
        renderItem={renderExploreCategoryItem}
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={{
          paddingHorizontal: Sizes.fixPadding - 5.0,
          flexDirection: 'row',
        }}
      />
    </View>
  );

  const bannerSlider = () => (
    <View
      style={{
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding - 7.0,
      }}
    >
      {/* If you see TS errors for this Carousel import, add a module declaration as noted above */}
      <Carousel
        data={categoryBannerSliderData}
        sliderWidth={width}
        itemWidth={itemWidth}
        renderItem={renderBannerItem}
        autoplay
        loop
        autoplayInterval={4000}
        onSnapToItem={(index: number) => setActiveSlide(index)}
      />
    </View>
  );

  const safetyCheckList = () => (
    <View>
      <FlatList
        horizontal
        data={safetyCheckListData}
        keyExtractor={item => item.id}
        renderItem={renderSafetyItem}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const header = () => (
    <View style={styles.headerWrapStyle}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2.0 }}>
        <MaterialIcons
          name="arrow-back"
          size={25}
          color="black"
          style={{ marginRight: Sizes.fixPadding + 5.0 }}
          onPress={() => navigation.pop()}
        />
        <Text style={{ ...Fonts.alatsiBlack18Regular }}>STYLO</Text>
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

  /* -------- Render -------- */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {safetyCheckList()}
              {bannerSlider()}
              {exploreCategories()}
              {spotlightProducts()}
              {exploreBrands()}
              {kidsApparels()}
            </>
          }
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding + 5.0 }}
          showsVerticalScrollIndicator={false}
          data={[]} /* required prop; using header-only list */
          renderItem={null}
        />
      </View>
    </SafeAreaView>
  );
};

/* ---------- Styles ---------- */
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
  exploreCategoriesImageStyle: {
    height: 160.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
    width: width / 3.34,
    marginBottom: Sizes.fixPadding - 5.0,
    alignSelf: 'center',
  },
  exploreCategoriesTextStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    ...Fonts.blackColor15SemiBold,
  },
  spotlightProductImageStyle: {
    width: 230,
    height: 290,
    borderColor: '#e0e0e0',
    borderWidth: 2.0,
    marginRight: Sizes.fixPadding - 3.0,
  },
  inTheSpotlightTextStyle: {
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    ...Fonts.blackColor15SemiBold,
  },
  exploreBrandsTextStyle: {
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding + 2.0,
    marginHorizontal: Sizes.fixPadding,
    ...Fonts.blackColor15SemiBold,
  },
  kidsApparelsTextStyle: {
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    ...Fonts.blackColor15SemiBold,
  },
  kidsApparelsImageStyle: {
    width: 230,
    height: 290,
    borderColor: '#e0e0e0',
    borderWidth: 2.0,
    marginRight: Sizes.fixPadding - 3.0,
  },
  brandImageStyle: {
    height: 150.0,
    width: width / 3.35,
    marginHorizontal: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
  },
  safetyImageStyle: {
    width: width - 120,
    height: 80,
    marginRight: Sizes.fixPadding,
  },
});

export default CategoryDetailScreen;
