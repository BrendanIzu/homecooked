import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Login } from './components/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from './firebaseConfig';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Page from './app/index';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User|null>(null);
  
  return (
    <View/>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
    //     { user ? (<Stack.Screen name='Home' component={Home}></Stack.Screen>) : (<Stack.Screen name='Login' component={Login}></Stack.Screen>)}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'DMSans_700Bold',
  },
});
