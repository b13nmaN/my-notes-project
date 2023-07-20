import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, onSnapshot, addDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../config';

// Create a context for the notes
const NotesContext = createContext();

const NotesContextProvider = ({ children }) => {

  // State to store the notes
  const [uDataArray, setUDataArray] = useState([]);
  const [nameOfUser, setNameOfUser] = useState('');
  const [sharedNotes, setSharedNotes] = useState([]);
 

  // Function to get all users in the database
  const getAllUsers = async () => {
    try {
      // Get all user ids
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const allUserData = snapshot.docs.map((doc) => doc.data());

      // Get the login user's name
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setNameOfUser(userData.name);
          // Display the user name before the screen changes to the home screen
        } else {
          console.log('No such user document!');
        }
      });
      // Update the idArray with all user ids
      setUDataArray(...uDataArray, allUserData);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  };

  const getNotes = async (userId) => {
    try {
      // Use the full path of the notes collection with the state from userId
      const notesRef = collection(db, `users/${userId}/notes`);
      const snapshot = await getDocs(notesRef);
      // Get an array of document data from the snapshot
      const notes = snapshot.docs.map((doc) => doc.data());
      console.log(notes);
      // return notes;
    } catch (error) {
      console.error('Error getting notes:', error);
    }
  };

  // const getSharedNotes = async (userId) => {
  //   try {
  //     // Use the full path of the notes collection with the state from userId
  //     const notesRef = collection(db, `users/${userId}/sharedNotes`);
  //     const snapshot = await getDocs(notesRef);
  //     // Get an array of document data from the snapshot
  //     const Notes = snapshot.docs.map((doc) => doc.data());
    
  //     console.log('This is the array of user shared notes: ', Notes[0]);
  //     // return notes;
  //   } catch (error) {
  //     console.error('Error getting shared notes:', error);
  //   }
  // };

  const getSharedNotes = async (userId) => {
    try {
      // Use the full path of the notes collection with the state from userId
      const notesRef = collection(db, `users/${userId}/sharedNotes`);
      const snapshot = await getDocs(notesRef);
      // Get an array of document data from the snapshot
      const notesData = snapshot.docs.map((doc) => doc.data());
      
      const sharedNotesArray = [];

      // Update the data and push it into sharedNotesArray
      sharedNotesArray.length = 0; // Clear the array to prevent duplicates if this function is called multiple times
      notesData.forEach((note) => {
        const { title, body, sharedBy } = note;
        sharedNotesArray.push({ 
          title:title, 
          body:body, 
          sharedBy:sharedBy });
      });

      return sharedNotesArray
      console.log('This is the array of user shared notes: ', sharedNotesArray);
      // return notes;
    } catch (error) {
      console.error('Error getting shared notes:', error);
    }
  };


  // Sharing data between users
  const shareData = async (userID, data) => {
    try {
      // Use the full path of the notes collection
      const userNoteRef = collection(db, `users/${userID}/sharedNotes`);
      const docRef = await addDoc(userNoteRef, data);
      console.log(`New note added:`, docRef.id);
    } catch (error) {
      console.error('Error sharing note:', error);
    }
  };

  // Add a new note based on userID
  const addNote = async (userId, title, body) => {
    const newNote = {
      title: title,
      body: body,
    };

    try {
      // Use the full path of the notes collection
      const userNoteRef = collection(db, `users/${userId}/notes`);
      const docRef = await addDoc(userNoteRef, newNote);
      console.log(`New note added:`, docRef.id);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Function to delete a note
  // const deleteNote = (noteId) => {
  //   setNotes(notes.filter((note) => note.id !== noteId));
  //   console.log('Note deleted'); // Log a message after deleting the note
  // };

  // Provide the state and functions to the consuming components
  return (
    <NotesContext.Provider value={{ addNote, getNotes, shareData, getAllUsers, sharedNotes, nameOfUser, getSharedNotes, idArray }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesContextProvider };

