import React from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';

const Spinner = () => {
 
  return (
    <View style={styles.popupcontainer}>
    <ActivityIndicator size="large" color="#1DAB87" />
  </View>
  );
};

const styles = StyleSheet.create({
  popupcontainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
