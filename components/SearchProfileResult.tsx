import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { UserData } from '../firebase/UserData';
import { MyText } from './MyText';

interface Props {
  user: UserData
}

export default function SearchProfileResult({ user } : Props) {
  const handlePress = () => {
    router.push({
      pathname: 'search/users/[id]',
      params: {id : user.id}
    })
  }
  
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: user.pfp}}></Image>
        <View style={styles.info}>
          <MyText size={20} value={user.displayname} bold={true}/>
          <MyText value={user.displayname}/>
        </View>
        
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  image: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 20,
  },
  info: {
    
  }
})