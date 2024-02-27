import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Profile from '../../../../components/Profile';
import { DocumentData } from 'firebase/firestore';

const ProfilePage = () => {
  const local = useLocalSearchParams<DocumentData>();
  
  return (
    <View style={styles.container}>
      <Profile userid={local.id} stack={'search'}></Profile>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {}
});
