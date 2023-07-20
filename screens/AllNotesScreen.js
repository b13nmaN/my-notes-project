import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Modal, Text } from 'react-native';
import { NotesContext } from '../context/NotesContextProvider';
import NoteCard from '../components/NoteCard';
import AddButton from '../components/AddButton';
import PrimaryButton from '../components/PrimaryButton';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { setupNotificationService } from '../services/NotificationService';
import { auth, db} from '../config';
import { doc, onSnapshot } from 'firebase/firestore';

const AllNotesScreen = ({ navigation}) => {


  // using values from user Notescontext
  const { 
    addNote, 
    getNotes, 
    uDataArray, 
    nameOfUser, 
    shareData, 
    getAllUsers,
    getSharedNotes} = useContext(NotesContext);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [sharedNotes, setSharedNotes] = useState([])
  const [sharedData, setSharedData] = useState[{
    sharedBy:'',
    title:'',
    body:''
  }]

  const richEditorRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const { expoPushToken, notification, schedulePushNotification } = setupNotificationService();

  // Get the userId from Firebase Authentication
  const user = auth.currentUser;
  const userId = user.uid;
  

  //Todo Use getAllUsers() function to get the cuurent user...
  //TODO: and retrive the name of the user. Then pass the name...
  //TODO: to the new notes object

  const handleSharedNotes = async (id) => {
    try {
      const newNote = sharedData
      
      const shareUserData = await shareData(id, newNote);
      
      console.log("Your note has been sent");
    } catch (error) {
      // Handle the error or display a message or update the UI to indicate failure
      console.error("Error sharing note:", error);
    }
  };
 


  useEffect(() => {
    // Call the getNotes function and update the state
    const fetchNotes = async () => {
      try {

        const notes = await getNotes(userId);
        

        // Do something with the notes
      } catch (error) {
        // Handle the error as needed
        console.error("Error getting notes:", error);
      }
    };

    fetchNotes();
  }, []); // Run once when the component mounts

  useEffect(() => {
    const LoadUserInfo = async () => {
      try {
        const userInfo = await getAllUsers();
       
        // Do something with the shared notes details
      } catch (error) {
        // Handle the error as needed
        console.error("Error getting info:", error);
      }
  };

    LoadUserInfo();
  }, []);

  useEffect(() => {
    const LoadSharedNotes = async () => {
      try {
        const userInfo = await getSharedNotes(userId);
        setSharedNotes(userInfo)
        console.log('this is the user info:', userInfo)
       
        // Do something with the shared notes details
      } catch (error) {
        // Handle the error as needed
        console.error("Error getting shared notes:", error);
      }
  };

    LoadSharedNotes();
  }, [userId]);
 
 
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User signed out successfully.');
        navigation.navigate('LoginIn');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  // function removeHtmlTags(htmlString) {
  //   return htmlString.replace(/<[^>]+>/g, '');
  // }

  // const handleNoteDetailsPress = (noteId) => {
  //   const note = notes.find((item) => item.id === noteId);
  //   navigation.navigate('NoteDetailsScreen', { note });
  // };

  // const handleDeleteNote = (noteId) => {
  //   deleteNote(noteId);
  // };

  const handleAddNote = async (userId) => {
    const newNote = addNote(userId, title, body)

    // setModalVisible(!modalVisible);

    // await schedulePushNotification();
  };

  useEffect(() => {
    if (notification) {
      console.log(notification);
    }
  }, [notification]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.registerLink} onPress={handleSignOut}>
        Sign Out
      </Text>
      <View style={styles.container}>
        <Text>Welcome, {nameOfUser}</Text>
        <PrimaryButton onPress={()=>handleSharedNotes(idArray[0])} title={'Share note'}/>
        <Text>Shared notes</Text>
         <FlatList
          data={sharedNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity >
              <NoteCard title={item.title
              } body={item.body} name={item.sharedBy} />
            </TouchableOpacity>
          )}
        /> 

        <TouchableOpacity style={styles.addButtonContainer} onPress={() => bottomSheetRef.current.open()}>
          <AddButton onPress={() => setModalVisible(true)} iconName="plus" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.inputContainer}>
              <RichToolbar style={styles.richToolbar} editor={richEditorRef} selectedIconTint="#2ecc71" />
              <View style={{ marginBottom: 5 }}>
                <PrimaryButton onPress={()=>handleAddNote(userId, title, body)} title="Add" />
              </View>
              <PrimaryButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Cancel"
              />

              <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />

              <RichEditor
                ref={richEditorRef}
                style={styles.richEditor}
                placeholder="Body"
                onChange={setBody}
                scrollEnabled={true}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  inputContainer: {
    flex: 1,
  },
  titleInput: {
    padding: 16,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  richEditor: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  richToolbar: {
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AllNotesScreen;
