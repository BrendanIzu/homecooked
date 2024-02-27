import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Login } from '../components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig';

export default function Page() {
  useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });
  
  return (
    <View style={{ height: '100%' }}>
      <Login/>
    </View>
  )
}