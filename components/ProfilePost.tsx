import * as React from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { PostData } from '../firebase/PostData';
import { stack } from '../interfaces/Stack';

interface Props {
  post: PostData
  stack: stack
}

export const ProfilePost = ({ post, stack } : Props) => {
  const handlePress = () => {
    console.log(stack);
    router.push({
      pathname: `${stack}/userposts/[id]`,
      params: {id : post.id}
    })
  }
  
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: post.imageurl}}></Image>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 137,
    width: 137,
    borderRadius: 20,
    margin: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  }
});
