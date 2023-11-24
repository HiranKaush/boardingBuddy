import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";


const StoreDetails = ({ route }) => {
  const navigation = useNavigation();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId, setUserId } = useContext(UserType);

  const storeId = route.params.storeId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.13:8000/api/store/getStoreByStoreId/${storeId}`);
        setStore(response.data);
        console.log(store);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#ffffff" }}
    >
    <View style={styles.container}>
      <Image
        source={store.storeImage ? { uri: store.storeImage } : require('../../assets/1440x480_52.webp')}
        style={styles.image}
      />
      <Text style={styles.heading}>{store.storeName}</Text>
      <Text style={styles.itemText}>{store.storeRating}</Text>
      <Text style={styles.itemText}>{store.storeAddress}</Text>
      <Text style={styles.time}>
        {store.openingHours}-{store.closingHours}
      </Text>
      <Text style={styles.description}>{store.storeDescription}</Text>
      <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('StoreReviews')}>
        <Image style={styles.smallImage} source={require('../../assets/user.png')} />
        <Text style={styles.reviewTextBold}>{store.review[0].name}</Text>
        <Text style={styles.reviewTextMessage}>{store.review[0].message}</Text>
      </TouchableOpacity>
      {store.menu.map((item) => (
        <View style={styles.menuItem} key={item.id}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>Rs: {item.price}</Text>
          </View>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
              style={[styles.button, styles.greenButton]}
              onPress={() => navigation.navigate('Tab3')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Uber Eats</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
              style={[styles.button, styles.yellowButton]}
              onPress={() => navigation.navigate('Tab3')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Pick Me Eats</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    marginLeft: 10,
    marginBottom:180,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  reviewTextBold: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  image: {
    width: '95%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 18,
    justifyContent: 'center',
  },
  reviewButton: {
    width: '95%',
    borderRadius: 18,
    backgroundColor: '#C4C4C4',
    padding: 10,
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 18,
    marginBottom: 10,
    justifyContent: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'column',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  buttonContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: '1%',
   },
  greenButton: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#06C167',
    height: 50,
  },
  yellowButton: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#FDD128',
    height : 50,
  },
  buttonText: {
    paddingTop : 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default StoreDetails;
