import React, { useEffect } from 'react';
import { View } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Fonts are already available after native bundle,
    // so you can navigate right away (or after a tiny tick).
    const id = setTimeout(() => navigation.replace('Splash'), 0);
    return () => clearTimeout(id);
  }, [navigation]);

  return <View style={{ flex: 1, backgroundColor: 'white' }} />;
};

export default LoadingScreen;
