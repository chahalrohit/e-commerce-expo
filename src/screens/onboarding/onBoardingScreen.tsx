import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Fonts, Sizes } from '../../constants/styles';

const { width } = Dimensions.get('window');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

/** Types */
type Quote = {
  image: ImageSourcePropType;
  title: string;
  descriptions: string;
};

type NavigationLike = {
  push: (route: string) => void;
};

type CircleProps = {
  navigation: NavigationLike;
  onPress: () => void;
  index: number;
  quotes: Quote[];
  animatedValue: Animated.Value;
  animatedValue2: Animated.Value;
};

/** Data */
const quotes: Quote[] = [
  {
    image: require('../../assets/images/onboarding_images/onboarding_1.png'),
    title: 'Welcome To STYLO',
    descriptions: 'All Fashion Products at One Shop Stop',
  },
  {
    image: require('../../assets/images/onboarding_images/onboarding_2.png'),
    title: 'Beautiful UI',
    descriptions: 'STYLO is a Beautiful and Perfect UI for Fashion Store.',
  },
  {
    image: require('../../assets/images/onboarding_images/onboarding_3.png'),
    title: 'Easy & Secure',
    descriptions: 'Your Security Matters.',
  },
];

const colors: {
  initialBgColor: string;
  bgColor: string;
  nextBgColor: string;
}[] = [
  { initialBgColor: '#A36562', bgColor: '#E57373', nextBgColor: '#A36562' },
  { initialBgColor: '#E91E63', bgColor: '#E57373', nextBgColor: '#E91E63' },
  { initialBgColor: '#E57373', bgColor: '#E91E63', nextBgColor: '#E57373' },
];

const Circle: React.FC<CircleProps> = ({
  navigation,
  onPress,
  index,
  animatedValue,
  animatedValue2,
}) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });

  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        // Animated color typed as any to satisfy RN style types
        { backgroundColor } as any,
      ]}
    >
      {index === 2 ? (
        <Text onPress={onPress} style={styles.startAndSkipTextStyle}>
          Start
        </Text>
      ) : (
        <Text
          onPress={() => navigation.push('Login')}
          style={styles.startAndSkipTextStyle}
        >
          Skip
        </Text>
      )}

      <Animated.View
        style={[
          styles.circle,
          { backgroundColor: dotBgColor } as any,
          {
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }) as any,
              },
              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }) as any,
              },
              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0.5, 1],
                }) as any,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={index === 2 ? () => navigation.push('Login') : onPress}
        >
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                    }) as any,
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ['0deg', '180deg', '180deg', '180deg'],
                    }) as any,
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }) as any,
              },
            ]}
          >
            <AnimatedAntDesign name="arrowright" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

type OnboardingProps = {
  navigation: NavigationLike;
};

const OnboardingScreen: React.FC<OnboardingProps> = ({ navigation }) => {
  const [backClickCount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [onCirclePress, setOnCirclePress] = useState<boolean>(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = useRef(new Animated.Value(0)).current;

  const inputRange = [...Array(quotes.length).keys()];

  // NOTE: This reproduces the original auto-advance timer,
  // but scopes it to an effect to avoid multiple timers on re-render.
  useEffect(() => {
    const t = setTimeout(() => {
      if (onCirclePress) {
        const t2 = setTimeout(() => setOnCirclePress(false), 2000);
        return () => clearTimeout(t2);
      } else {
        onPress();
      }
    }, 5000);
    return () => clearTimeout(t);
    // intentionally include flags that affect behavior
  }, [index, onCirclePress]);

  const animate = (i: number) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex(index !== 2 ? index + 1 : 0);
  };

  const indicator = ({ pageIndex }: { pageIndex: number }) =>
    index === pageIndex ? (
      <View style={styles.activeIndicatorStyle} />
    ) : (
      <View style={styles.inactiveIndicatorStyle} />
    );

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBar translucent backgroundColor="transparent" />

      <Circle
        index={index}
        onPress={() => {
          setOnCirclePress(true);
          onPress();
        }}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
        quotes={quotes}
        navigation={navigation}
      />

      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: quotes.map((_, i) => -i * width * 2),
              }) as any,
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
              i => i / 2,
            ),
            outputRange: [...Array(quotes.length * 2 + 1).keys()].map(i =>
              i % 2 === 0 ? 1 : 0,
            ),
          }) as any,
        }}
      >
        {quotes.map(({ title, descriptions, image }, i) => (
          <View style={{ paddingRight: width, width: width * 2 }} key={i}>
            <Image
              source={image}
              style={{ alignSelf: 'center', width: 200, height: 200 }}
              resizeMode="contain"
            />
            <Text
              style={{
                marginVertical: Sizes.fixPadding * 2.0,
                textAlign: 'center',
                ...Fonts.whiteColor25Bold,
              }}
            >
              {title}
            </Text>
            <Text style={styles.descriptionTextStyle}>{descriptions}</Text>
            <View style={styles.pageIndicatorWrapStyle}>
              {indicator({ pageIndex: 0 })}
              {indicator({ pageIndex: 1 })}
              {indicator({ pageIndex: 2 })}
            </View>
          </View>
        ))}
      </Animated.View>

      {backClickCount === 1 ? (
        <View style={styles.animatedView}>
          <Text style={{ ...Fonts.whiteColor14SemiBold }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 8,
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    alignItems: 'flex-end',
    backgroundColor: 'turquoise',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  animatedView: {
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicatorStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: Sizes.fixPadding - 5.0,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  inactiveIndicatorStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: Sizes.fixPadding - 5.0,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  descriptionTextStyle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontFamily: 'Montserrat_Medium',
  },
  pageIndicatorWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.fixPadding * 3.0,
  },
  startAndSkipTextStyle: {
    position: 'absolute',
    left: 20.0,
    bottom: 45.0,
    ...Fonts.whiteColor15Bold,
  },
});

export default OnboardingScreen;
