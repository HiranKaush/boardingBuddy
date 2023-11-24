//import liraries
import React, { useContext, useEffect, useState  } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image  } from 'react-native';
import { UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import Spinner from "../components/Spinner";




// create a component
const AccountInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { recepientinfo } = route.params;


    const { userId, setUserId } = useContext(UserType);
    const [recepientData, setRecepientData] = useState();
    const [isloading, setIsloading] = useState(false);


    // const fetchRecepientData = async () => {
    //   setIsloading(true)
    //     try {
    //       const response = await fetch(
    //         `http://192.168.1.13:8000/api/user/user/${userId}`
    //       );
    
    //       const data = await response.json();
    //       setRecepientData(data);
    //       setIsloading(false)

    //     } catch (error) {
    //       setIsloading(false)
    //       console.log("error retrieving details", error);
    //     }
    //   };
    
      useEffect(() => {
        // fetchRecepientData();
        //console.log("message fetched")
        setRecepientData(recepientinfo);
      },[recepientData]);
    
   
    return (
        <View style={styles.container}>
          {isloading && <Spinner/>}
           <Image
        style={{
          marginTop: 30,
          width: 100,
          height: 100,
          borderRadius: 50,
          borderColor: "#1DAB87",
          borderWidth: 1,
          resizeMode: "cover",
        }}
        source={{ uri: recepientData?.image }}
      />
       <Text style={styles.title}>Personal Info</Text>
       <View style={styles.viewContainer}>
  <View style={styles.infoContainer}>
    <Text style={styles.infoText}>Name: {recepientData?.name}</Text>
    <Text style={styles.infoText}>Gender: {recepientData?.gender}</Text>
    <Text style={styles.infoText}>NIC No: {recepientData?.nic}</Text>
  </View>
</View>

<Text style={styles.title}>Contact Info</Text>
<View style={styles.viewContainer}>
  <View style={styles.infoContainer}>
    <Text style={styles.infoText}>Phone Number: {recepientData?.phoneNum}</Text>
    <Text style={styles.infoText}>Email: {recepientData?.email}</Text>
  </View>
</View>

      <TouchableOpacity 
  style={styles.editButton}
  onPress={() => navigation.navigate("editaccountinfo", {
    recepientinfo: recepientData,
  })}
>
  <Text style={styles.editButtonText}>Edit</Text>
</TouchableOpacity>
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
      },
      viewContainer: {
       
        width:300,
        borderWidth: 1,
        borderColor: '#1DAB87',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
       

      },
      
      infoContainer:{
       marginTop:10, 
      },
      infoText: {
        fontSize: 18,
        marginBottom: 20,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#1DAB87',
        marginTop:20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft:30,
      },
      editButton: {
        width: 180,
    backgroundColor: '#ffffff', // Updated button background color
    padding: 15,
    marginTop: 30,
    alignSelf: 'center', // Use alignSelf instead of marginLeft and marginRight
    borderRadius: 10,
    borderColor:'#1D3A70',
    borderWidth:1,
      },
      editButtonText: {
        color: '#1D3A70',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

//make this component available to the app
export default AccountInfo;
