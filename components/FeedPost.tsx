import * as React from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { FeedPostHeader } from './FeedPostHeader';
import { FeedPostInteraction } from './FeedPostInteraction';
import { router } from 'expo-router';
import { MyText } from './MyText';
import { stack } from '../interfaces/Stack';

interface Props {
  comments: string[]
  description: string
  id: string 
  imageUrl: string
  likes: number
  stack: stack
  title: string
  timestamp: string
  userid: string
}

export const FeedPost = ({ comments, description, id, imageUrl, likes, stack, timestamp, title, userid }: Props) => {
  const handlePress = () => {
    console.log('stack');
    router.push({
      pathname: `${stack}/userposts/[id]`,
      params: {postid : id}
    })
  }
  
  return (
    <View style={styles.container}>
      <FeedPostHeader userid={userid} stack={stack} title={title}/>
    
        <View style={styles.body}> 
          <Image style={styles.image} source={{uri: imageUrl}}/>
        </View>
        
        <FeedPostInteraction/>
        {/* <Pressable onPress={handlePress}><Text>more details</Text></Pressable> */}
        
        <View style={styles.description}> 
          <MyText value={description}/>
        </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  body: {
    flex: 5,
  },
  container: {
    height: 600,
    margin: 10,
    backgroundColor: 'white',
  },
  description: {
    flex: 2,
    padding: 8
  },
  header: {
    backgroundColor: 'red',
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
});
