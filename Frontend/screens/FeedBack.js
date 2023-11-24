import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button, TouchableOpacity, Image, FlatList,ScrollView,} from 'react-native';
import { UserType } from "../UserContext";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';


const FeedBack = () => {
  const route = useRoute();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const { userId } = useContext(UserType);
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [userImage, setUserImage] = useState('');
  const { boardingId } = route.params;
  const navigation = useNavigation();
  const [editedName, setEditedName] = useState('');
  const [editedText, setEditedText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentCreatorName, setCommentCreatorName] = useState('');
  const[commentText,setCommentText]= useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
 

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:8000/api/user/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          
          setUserName(data.name);
          setUserImage(data.image); // Update userName state with the retrieved name
        } else {
          console.log("Error fetching user details", response.status);
        }
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserDetails();
    fetchComments();
  }, [userName]); // Fetch user details whenever userId changes

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://192.168.1.13:8000/api/comments/boardings/${boardingId}/comments`);
      const data = await response.json();
      if (response.ok) {
        const filteredComments = data.filter(comment => comment.userId === userId);
        setComments(filteredComments); // Update comments state with the retrieved comments
      } else {
        console.log("Error fetching comments", response.status);
      }
    } catch (error) {
      console.log("Error fetching comments", error);
    }
  };

  const toggleCreateModal = () => {
    setCreateModalVisible(!isCreateModalVisible);
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };
 
  const handleEditComment = (commentId, commentName) => {
    setSelectedCommentId(commentId);
    setCommentCreatorName(commentName);
    const selectedComment = comments.find(comment => comment._id === commentId);
    setEditedText(selectedComment.text);
    toggleEditModal();
  };

  const handledeleteComment = (commentId, commentName,commentText) => {
    setSelectedCommentId(commentId);
    setCommentCreatorName(commentName);
    setCommentText(commentText);
    toggleDeleteModal(); // Show delete confirmation modal
  };
  
  
  const handleDeleteComment = () => {
    if (selectedCommentId) {
      axios.delete(`http://192.168.1.13:8000/api/comments/comments/${selectedCommentId}`)
      .then(() => {
        // Remove the deleted comment from the UI
        const updatedComments = comments.filter(comment => comment._id !== selectedCommentId);
        setComments(updatedComments);
        // Close the delete confirmation modal
        toggleDeleteModal();
        setSelectedCommentId(null);
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
    }
  };
  

  const handleUpdateComment = () => {
    // Send the update request to the server
    if (selectedCommentId) {
      axios.put(`http://192.168.1.13:8000/api/comments/comments/${selectedCommentId}`, {
        text: editedText,
        
      })
      .then(() => {
        // Update the UI with the edited comment text
        const updatedComments = comments.map(comment => {
          if (comment._id === selectedCommentId) {
            return { ...comment, text: editedText };
          }
          return comment;
        });
        setComments(updatedComments);
        // Close the edit modal
        setCreateModalVisible(false);
        setEditedText('');
        setSelectedCommentId(null);
        toggleEditModal();
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
    }
  };

  const handleSubmit = async () => {
    try {
      // Create a new comment object
      const commentData = {
        text: text,
        name: userName,
        uid: userId,
        boardingId: boardingId,
        uimage: userImage,
        
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
      toggleCreateModal(); // Close the modal after submission
      
    } catch (error) {
      console.log('Error creating comment', error);
    }
    fetchComments();
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={toggleCreateModal} style={styles.commentContainer1}>
   <View>
    <Image source={require('../assets/plusbutton.png')} style={styles.itemImage1} />
      <Text style={styles.modalTitle}>Add Review</Text>
      </View>
    </TouchableOpacity>
    <FlatList
  data={comments}
  renderItem={({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentItem}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}: </Text>
        <Text style={{ flexWrap: 'wrap', maxWidth: '70%', }}>{item.text} </Text>
        
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // style={[styles.button1, { backgroundColor: '#27ae60' }]}
          onPress={() => handleEditComment(item._id, item.name)} 
        >
          <Image source={require('../assets/edit_3597089.png')} style={styles.itemImage} />
          {/* <Text style={styles.buttonText}>Update</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          // style={[styles.button1, { backgroundColor: '#e74c3c' }]}
          onPress={() => handledeleteComment(item._id, item.name, item.text)}
        >
          <Image source={require('../assets/delete_1214428.png')} style={styles.itemImage} />
          {/* <Text style={styles.buttonText}></Text> */}
        </TouchableOpacity>
      </View>
    </View>
  )}
  keyExtractor={(item) => item._id.toString()}
/>
   
<Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Edit comment form */}
          <Text style={styles.modalTitle}>Update Review</Text>
          <TextInput
            value={commentCreatorName}
            editable={false}
            style={styles.input}
        />
          {/* Display the comment creator's name */}
          
          <TextInput
            placeholder="Edit Comment"
            value={editedText}
            onChangeText={setEditedText}
            multiline
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Update" onPress={handleUpdateComment} color="green" />
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="red" />
          </View>
        </View>
      </View>
    </Modal>


      <Modal visible={isCreateModalVisible} animationType="slide" transparent={true}>
        {/* ...Modal Content (same as previous example) */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Review</Text>
            <TextInput
              placeholder="Name"
              value={userName}
              editable={false}
              onChangeText={(text) => setUserName(text)}
              style={styles.input}
            />
            
            <TextInput
              placeholder="Review "
              value={text}
              onChangeText={(text) => setText(text)}
              multiline
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} color="green"/>
            <Button title="Cancel" onPress={() => setCreateModalVisible(false)}  color="red"
                textColor="#4CAF50" />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isDeleteModalVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Delete Review</Text>
      {/* <Text style={styles.creatorName}>{commentCreatorName}</Text>
      <Text style={styles.creatorName}>{commentText}</Text> */}
                  <TextInput
                    value={commentCreatorName}
                    editable={false}
                    style={styles.input}
                    />

                  <TextInput
                    value={commentText}
                    editable={false}
                    style={styles.input}
                  />
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={handleDeleteComment} color="green" />
        <Button title="Cancel" onPress={toggleDeleteModal} color="red" />
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    paddingTop: 20, // Add padding to the top to move content down
   
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  button: {
    backgroundColor: '#3498db', // Background color of the button
    padding: 10, // Padding around the text inside the button
    borderRadius: 5, // Border radius to round the corners of the button
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    marginTop: 20, // Margin from the top
    width: '80%', // Set a specific width for the button if needed
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
  commentContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent:'center',
    width: 350,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1, // Set the width of the border
    borderColor: '#1dab87', // Set the color of the border
    borderRadius: 10, // Optional: Set border radius for rounded corners
    height: 70,
    marginLeft: 10,
    marginRight: 0,
    backgroundColor:'#1dab87',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
 
  
  commentItem: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
     // Adjust this based on your layout requirements
    width: '30%', // Adjust the width as needed
    gap:10,
    marginLeft: -60,
    gap:20,
  },
  itemImage: {
    width: 25, // Set the width of the image
    height: 25, // Set the height of the image
    marginRight: 5, // Optional: Add some margin to the right of the image
  },
  itemImage1: {
    width: 25, // Set the width of the image
    height: 25, // Set the height of the image
    marginRight: 10, // Optional: Add some margin to the right of the image
    marginLeft: 40,

  },
  button1: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  // ...Other styles (same as previous example)
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
    justifyContent: 'center', // Vertically center the content
  alignItems: 'center',
    
  },
  modalTitle: {
    fontSize: 24, // Set the font size
    color: '#000000', // Set the text color
    fontWeight: 'bold', // Set the font weight
    marginBottom: 10, // Add some margin at the bottom if needed
    
  },
  creatorName: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    
    
  }
});

export default FeedBack;
