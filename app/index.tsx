import { View } from 'react-native';
import { useEffect } from 'react';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from '../components/Login';
import { router } from 'expo-router';

export default function Page() {
  useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });
  
  const fetchUser = async () => {
    const response = await AsyncStorage.getItem('userid');
    
    if (response) {
      router.replace('./feed');
    }
  }
  
  useEffect(() => {
    fetchUser();
  }, [])
  
  return (
    <View style={{ height: '100%' }}>
      <Login/>
    </View>
  )
}