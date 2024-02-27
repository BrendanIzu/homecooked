import React, { Component, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User, onAuthStateChanged } from 'firebase/auth';

import { router } from 'expo-router';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { populateRootUser, signUpUser } from '../firebase/UserData';
import { MyText } from './MyText';

export const Login = () => {
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState<User|null>(null);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('izububs4444@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  
  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      router.replace('./feed');
    } catch (error) {
      console.log('Error in SignIn function: ', error);
    }
  }
  
  const SignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      
      if (response) {
        signUpUser(email, displayname);
        router.replace('./feed');
      }
      
    } catch (error) {
      console.log('Error in SignUp function: ', error);
    }
  }
  
  const fetchUser = async () => {
    await populateRootUser();
  }
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user && user.email) {
        console.log('yes');
        AsyncStorage.setItem('email', user.email);
        fetchUser();
      }
    })
  }, [])
  
  return(
    <View style={styles.container}>
      {signup ? 
      <>
        <TextInput autoCapitalize={'none'} autoCorrect={false} value={displayname} style={styles.input} placeholder='username' onChangeText={(text) => setDisplayname(text)}/>
        <TextInput autoCapitalize={'words'} value={firstname} style={styles.input} placeholder='firstname' onChangeText={(text) => setFirstName(text)}/>
        <TextInput autoCapitalize={'words'} value={lastname} style={styles.input} placeholder='lastname' onChangeText={(text) => setLastName(text)}/>
        <TextInput autoCapitalize={'none'} value={email} style={styles.input} placeholder='email' onChangeText={(text) => setEmail(text)}/>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='password' onChangeText={(text) => setPassword(text)}/>
        <Button title='Sign Up' onPress={SignUp}></Button>
        <Pressable onPress={() => setSignup(!signup)}>
          <MyText value={'Already have an account? Sign up '}/>
        </Pressable>
      </>
      
      :
      
      <>
        <TextInput value={email} style={styles.input} placeholder='email' onChangeText={(text) => setEmail(text)}/>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='password' onChangeText={(text) => setPassword(text)}/>
        <Button title='Sign In' onPress={SignIn}></Button>
        <Pressable onPress={() => setSignup(!signup)}>
          <MyText value={'Don\'t have an account? Sign up '}/>
        </Pressable>
      </>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    margin: 10,
  },
  input: {
    backgroundColor: 'white',
    margin: 5,
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
  }
})
