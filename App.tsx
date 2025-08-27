import 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
  type DrawerScreenProps,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { LogBox } from 'react-native';

// Screens & components
import CustomDrawer from './src/components/drawerContent';
import LoadingScreen from './src/components/loadingScreen';
import AboutAppScreen from './src/screens/aboutApp/aboutAppScreen';
import AccountScreen from './src/screens/account/accountScreen';
import AccountSettingScreen from './src/screens/accountSetting/accountSettingScreen';
import CreateAccountScreen from './src/screens/auth/createAccountScreen';
import LoginScreen from './src/screens/auth/loginScreen';
import ResetPasswordScreen from './src/screens/auth/resetPasswordScreen';
import BagScreen from './src/screens/bag/bagScreen';
import CategoryDetailScreen from './src/screens/categoryDetail/categoryDetailScreen';
import DeliveryScreen from './src/screens/delivery/deliveryScreen';
import FaqScreen from './src/screens/faq/faqScreen';
import FilterScreen from './src/screens/filter/filterScreen';
import HomeScreen from './src/screens/home/homeScreen';
import NotificationsScreen from './src/screens/notifications/notificationsScreen';
import OnBoardingScreen from './src/screens/onboarding/onBoardingScreen';
import OrdersScreen from './src/screens/orders/ordersScreen';
import PaymentScreen from './src/screens/payment/paymentScreen';
import ProductDetailScreen from './src/screens/productDetail/productDetailScreen';
import ProductsScreen from './src/screens/products/productsScreen';
import SearchScreen from './src/screens/search/searchScreen';
import SizeChartScreen from './src/screens/sizeChart/sizeChartScreen';
import SplashScreen from './src/screens/splashScreen';
import WishlistScreen from './src/screens/wishlist/wishlistScreen';

LogBox.ignoreAllLogs();

/**
 * Drawer route params
 * (Add params later if you need them; use `undefined` for none.)
 */
export type DrawerParamList = {
  Drawer: undefined;
};

/**
 * Root stack route params
 * (Define screen-specific params here as needed.)
 */
export type RootStackParamList = {
  Loading: undefined;
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  CreateAccount: undefined;
  ResetPassword: undefined;
  Home: undefined; // hosts the Drawer
  Search: undefined;
  Notifications: undefined;
  Wishlist: undefined;
  Bag: undefined;
  Delivery: undefined;
  Payment: undefined;
  CategoryDetail: undefined;
  Products: undefined;
  Filter: undefined;
  ProductDetail: undefined;
  SizeChart: undefined;
  Orders: undefined;
  Account: undefined;
  AccountSetting: undefined;
  Faq: undefined;
  AboutApp: undefined;
};

/**
 * Helpful prop types you can import in screens
 * e.g. `type Props = RootStackScreenProps<'Login'>`
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
export type RootDrawerScreenProps<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T>;

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Drawer"
        component={HomeScreen}
        options={{ drawerStatusBarAnimation: 'fade' }}
      />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Bag" component={BagScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen
          name="CategoryDetail"
          component={CategoryDetailScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen name="SizeChart" component={SizeChartScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
        <Stack.Screen name="Faq" component={FaqScreen} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
