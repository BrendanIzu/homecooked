import * as React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ProfilePost } from './ProfilePost';
import { PostData } from '../firebase/PostData';
import { stack } from '../interfaces/Stack';

interface Props {
  posts: PostData[]
  stack: stack
}

export const ProfilePosts = ({ posts, stack }: Props) => {
  return (
    <View style={styles.container}>
      {posts.map((post) => {
        return(
          <ProfilePost key={post.id} post={post} stack={stack}></ProfilePost>
        )
      })}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    margin: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
