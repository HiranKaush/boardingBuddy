import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const PremiumPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
              style={[styles.button, styles.greenButton]}
              onPress={() => navigation.navigate('Tab3')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Link your Uber Eats</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
              style={[styles.button, styles.yellowButton]}
              onPress={() => navigation.navigate('Tab3')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Link your Pick me Eats</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
              style={[styles.button, styles.blueButton]}
              onPress={() => navigation.navigate('Tab3')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Schedule an Offer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
              style={[styles.button, styles.blueButton]}
              onPress={() => navigation.navigate('Tab3')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Apply Discount</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%', // Make buttons fill the screen width
    padding: 18,
    borderRadius: 18,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding : 10,
  },
  buttonContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: '10%',
   },
  greenButton: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#06C167',
  },
  yellowButton: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#FDD128',
  },
  blueButton: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
  },
});

export default PremiumPage;
