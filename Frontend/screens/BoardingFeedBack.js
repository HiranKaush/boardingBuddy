import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button, TouchableOpacity, FlatList, Image} from 'react-native';
import { UserType } from "../UserContext";
import { useRoute } from '@react-navigation/native';


const BoardingFeedBack = () => {
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(false);
  const { userId } = useContext(UserType);
  const [userName, setUserName] = useState('');
  // const [userImage, setUserImage] = useState('');
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const { boardingId } = route.params;
  

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:8000/api/user/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserName(data.name);
          // setUserImage(data.image); // Update userName state with the retrieved name
        } else {
          console.log("Error fetching user details", response.status);
        }
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserDetails();
    fetchComments();
  }, [userId]); // Fetch user details whenever userId changes

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://192.168.1.13:8000/api/comments/boardings/${boardingId}/comments`);
      const data = await response.json();
      if (response.ok) {
        setComments(data); // Update comments state with the retrieved comments
      } else {
        console.log("Error fetching comments", response.status);
      }
    } catch (error) {
      console.log("Error fetching comments", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  

  

  const handleSubmit = async () => {
    try {
      // Create a new comment object
      const commentData = {
        text: text,
        name: userName,
        boardingId: boardingId,
      };

      // Send a POST request to create the comment in the backend
      const response = await fetch(`http://192.168.1.13:8000/api/comments/boardings/${boardingId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        // Comment created successfully, you can handle the response if needed
        console.log('Comment created successfully');
      } else {
        console.log('Error creating comment', response.status);
      }

      // Reset name and text states
      setUserName('');
      setText('');
      toggleModal(); // Close the modal after submission
    } catch (error) {
      console.log('Error creating comment', error);
    }
  };

  return (
    <View style={styles.container}>
     
      {/* <Text>Welcome, {userName}!</Text> */}
      {/* <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text>Add Review</Text>
     

      </TouchableOpacity> */}
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          
          <View style={styles.commentContainer}>
            
          <View style={styles.commentItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover", marginRight: 10 }}
        source={{ uri: item.userimage}}
      />
           
          <Text style={{ fontWeight: 'bold' }}>{item.name}: </Text>
            <Text style={{ flexWrap: 'wrap', maxWidth: '100%', }}>{item.text} </Text>
            
          </View>
          </View>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
       
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10, // Add padding to the top to move content down
    marginBottom:120,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  commentItem: {
    marginVertical: 5,
  },
  // ...Other styles (same as previous example)
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1, // Set the width of the border
    borderColor: '#1dab87', // Set the color of the border
    borderRadius: 10, // Optional: Set border radius for rounded corners
    minHeight: 70,
    marginLeft: 10,
    marginRight: 0,
  },
  modalTitle: {
    fontSize: 24, // Set the font size
    color: '#333', // Set the text color
    fontWeight: 'bold', // Set the font weight
    marginBottom: 10, // Add some margin at the bottom if needed
  },
});

export default BoardingFeedBack;
