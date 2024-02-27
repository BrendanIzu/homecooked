import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable } from 'react-native';
import { useState } from 'react';

import { router } from 'expo-router'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Timestamp, addDoc,collection, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_STORAGE, FIRESTORE_DB } from '../../firebase/firebaseConfig';
import { MyButton } from '../../components/MyButton';
import { MyText } from '../../components/MyText';

export default function CreatePost() {
  const [imageUri, setImageUri] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1 
    })
    
    if (!res.canceled) {
      setImageUri(res.assets[0].uri); 
    }
  }
  
  const closeme = () => {
    Keyboard.dismiss();
  }
  
  const uploadPost = async (uri: string, fileType: string) => {
    let response = await fetch(uri);
    let blob = await response.blob(); 
    
    const storageRef = ref(FIREBASE_STORAGE, "Stuff/"+new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress}% done`);
        setProgress(progress.toFixed());
      }, (error) => {
        console.log('Error in uploadPost function: ', error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          setImageUri('');
          saveRecord(fileType, downloadUrl, new Date().getTime().toString());
        })
      }
    )
  }
  
  const handleSubmitPost = () => {
    if (imageUri == '') {
      setError('A POST IS MISSING');
      return
    }
    uploadPost(imageUri, 'image');
    router.replace('/Feed')
  }
  
  const saveRecord = async (fileType: string, url: string, createdAt: string ) => {
    const user = await AsyncStorage.getItem('user');
    const response = await addDoc(collection(FIRESTORE_DB, "posts"), {
      userid: user,
      title: title,
      description: description,
      imageurl: url,
      timestamp: createdAt,
      comments: [],
      likes: 0,
    })
  }

  return (
    <Pressable style={styles.container} onPress={closeme}>
      <TouchableOpacity style={imageUri == '' ? styles.upload : styles.none} onPress={pickImage}>
        { imageUri == '' && <MyText bold={true} value={'UPLOAD IMAGE'}/>}
      </TouchableOpacity>
      {imageUri != '' && <Image style={styles.image} source={{uri: imageUri}}></Image>}
      <TextInput value={title} style={styles.input} placeholder='add title' onChangeText={(text) => setTitle(text)}></TextInput>
      <TextInput value={description} style={styles.input} placeholder='add description' onChangeText={(text) => setDescription(text)}></TextInput>
 
      <MyButton onPress={handleSubmitPost} textColor={'black'} title={'finish post'} color={'lightgreen'}/>
      {error != '' && <MyText value={error} color={'red'}/>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  error: {
    color: 'red'
  },
  image: {
    resizeMode: 'cover',
    width: 300,
    height: 300,
  },
  input: {
    backgroundColor: 'white',
    margin: 5,
    height: 50,
    width: 300,
    borderWidth: 1,
    paddingLeft: 10,
  }, 
  none: {},
  presscontainer: {
    height: '100%',
    backgroundColor: 'red',
    width: '100%'
  },
  upload: {
    height: 300,
    width: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
  }
});
