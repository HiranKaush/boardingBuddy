import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  Modal,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext, useLayoutEffect, useEffect,useRef } from "react";
import { Feather } from "@expo/vector-icons";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';


import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";


const ChatMessagesScreen = () => {

  const { userId, setUserId,userRole,setUserRole } = useContext(UserType);
  const [modalVisible, setModalVisible] = useState(false);

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("")
  const [isAdd, setIsAdd] = useState("");
  const route = useRoute();
  const { recepientId } = route.params;
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [boarding, setBoarding] = useState(null);
  const [items, setItems] = useState([]);
  //const boardingId = "652fd465ecc41770f2f531e5"

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom()
  },[]);

  const scrollToBottom = () => {
      if(scrollViewRef.current){
          scrollViewRef.current.scrollToEnd({animated:false})
      }
  }

  const handleContentSizeChange = () => {
      scrollToBottom();
  }

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const addTenant = async () => {
    console.log(recepientData?.myboarding +" == "+boarding); // Log the response for now

    if (recepientData?.myboarding) {
      Alert.alert("This tenant already in a boarding");
    } 
    else if(boarding == null){
      Alert.alert("please select a boarding");

    }
         else {
      try {
        const response = await axios.put(
          `http://192.168.1.13:8000/api/boardings/${boarding}/addtenant`,
          { tenantId:recepientId }
        );
        console.log("rep id ----- "+recepientId); // Log the response for now
        Alert.alert("Add successfully");
  
        // Handle response
        console.log(response.data); // Log the response for now
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to add tenant to boarding.');
      }
    }
  };

  //------------------------------------------ testing -----------------------------------------


  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/user/messages/${userId}/${recepientId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages cms", error);
    }
  };

  const fetchRecepientData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/user/user/${recepientId}`
      );

      const data = await response.json();
      setRecepientData(data);
    } catch (error) {
      console.log("error retrieving details", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchRecepientData();
    //console.log("message fetched")
  },[messages]);


  //------------------------------------------ testing -----------------------------------------
  
  const handleSend = async (messageType, imageUri) => {
    if(message === ""){
      Alert.alert('please enter a message');
      return;
    }
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      //if the message type id image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const response = await fetch("http://192.168.1.13:8000/api/user/messages", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("");
        setSelectedImage("");

        fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  //console.log("messages", selectedMessages);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recepientData?.image }}
              />

              <Text style={{ marginLeft: 15, fontSize: 19, fontWeight: "bold", color:"#1DAB87"}}>
                {recepientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>(
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : userRole === "tenant" ? (
          <View></View>
         
        ): userRole === "landlord" ?( 

          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: "#1DAB87",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 20,
              gap: 7,
              marginHorizontal: 8,
              height: 40,
              width:100,
              
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Add Tenant</Text>
          </Pressable>
        ):null
      }
           </View>
        ),
    });
  }, [recepientData, selectedMessages]);


  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch("http://192.168.1.13:8000/deleteMessages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageIds }),
      });

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
        prevSelectedMessages.filter((id) => !messageIds.includes(id))
      );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };
  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  const fetchboardingdata = async () => {
    try {
        const response = await fetch(
            `http://192.168.1.13:8000/api/user/getownboardings/${userId}`
        );

        const data = await response.json();

        //setBardingData(data);
        const formattedData = data.map(boarding => ({
            label: boarding.name,
            value: boarding.id
        }));
        setItems(formattedData);
    } catch (error) {
        console.log("error retrieving details", error);
    }
};

useEffect(() => {
    fetchboardingdata();
}, []);

  return (
      <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          style={{ flex: 1, backgroundColor: "#F0F0F0"}}
          >

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add tenant to boarding</Text>

            <DropDownPicker
                open={open}
                value={boarding}
                items={items}
                setOpen={setOpen}
                setValue={setBoarding}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.textStyle}
                placeholderTextColor="#a6a6a6"
                placeholder="Type"
            />
            <View style={styles.buttonContainer}>
              
              <TouchableOpacity style={styles.button} onPress={() => addTenant()}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      <ScrollView ref={scrollViewRef} contentContainerStyle={{flexGrow:1}} onContentSizeChange={handleContentSizeChange} style={[styles.scrollview]}>
      
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#1D3A70",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "#2f3336",
                        // borderWidth:1,
                        // borderColor:"#1D3A70",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#ffffff",
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "#ffffff",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }

          if (item.messageType === "image") {
            const baseUrl =
              "/Users/sujananand/Build/messenger-project/api/files/";
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const source = { uri: baseUrl + filename };
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={source}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      position: "absolute",
                      right: 10,
                      bottom: 7,
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
        {/* </ImageBackground> */}
      </ScrollView>
      <ImageBackground
            style={[styles.fixed, styles.containter, {zIndex: -1}, {opacity:0.3}]}
            source={require("../assets/chatBackground.png")}
            resizeMode="repeat"
        />    

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingBottom: 60,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          backgroundColor:"#1D3A70",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 15,
          //marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        {/* <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        /> */}

        <TextInput
          placeholder="Type Your message..."
          placeholderTextColor="#a6a6a6"
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            backgroundColor:"#ffffff",
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          
        />

        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View> */}

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#1DAB87",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
            gap: 7,
            marginHorizontal: 8,
            height: 40,
            width:70,
            
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
       
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 ,backgroundColor:"#ffffff",}}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({
  containter: {
  //width: Dimensions.get("window").width, //for full screen
  //height: Dimensions.get("window").height //for full screen
},
fixed: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
},
scrollview: {
 backgroundColor: 'transparent'
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 20,
  fontWeight: "bold",
  color: "#000000",
},
popupimage: {
  width: 200,
  height: 200,
  marginBottom: 15,
},
buttonContainer: {
  flexDirection: "row",
  justifyContent: "space-evenly",
  width: "90%",
  marginTop: 20,
},
button: {
  width: 100,
  backgroundColor: "#1DAB87",
  padding: 10,
  alignItems: "center",
  borderRadius: 5,
},
buttonText: {
  color: "white",
},
});
