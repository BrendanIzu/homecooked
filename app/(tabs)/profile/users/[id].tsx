import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Profile from '../../../../components/Profile';

const ProfilePage = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  
  return (
    <View style={styles.container}>
      <Profile userid={id ? id : ''}></Profile>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {}
});
