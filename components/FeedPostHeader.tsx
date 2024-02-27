import * as React from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { UserData, getUserFromId } from '../firebase/UserData';
import { MyText } from './MyText';
import { stack } from '../interfaces/Stack';

interface Props {
  userid: string,
  stack: stack,
  title: string,
}

export const FeedPostHeader = ({ userid, stack, title }: Props) => {
const [user, setUser] = useState<UserData|null>(null);

  const fetchUser = async () => {
    const response = await getUserFromId(userid);
    
    if (response) {
      setUser(response);
    } 
  }
  
  const handlePress = () => {
    router.push({
      pathname: `${stack}/users/[id]`,
      params: {id : userid}
    })
  }
  
  useEffect(() => {
    fetchUser();
  }, [])
  
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      { user && user.pfp && <Image style={styles.image} source={{uri: user.pfp}}/> }
      <View style={styles.description}>
        <MyText size={20} value={title} bold={true}/>
        { user && user.displayname && <MyText value={user.displayname}/>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    
  },
  description: {
    marginLeft: 4,
    padding: 3,
    flex: 4,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: 'auto',
    width: 'auto',
    margin: 1,

  },
  title: {
    
  }
});
