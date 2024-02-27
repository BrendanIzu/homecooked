import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { PostData, getPost } from '../../../../firebase/PostData';
import { FeedPost } from '../../../../components/FeedPost';

const PostPage = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const [post, setPost] = useState<null|PostData>(null);
  
  const fetchPost = async () => {
    if (id) {
      const response = await getPost(id);
      
      if (response) { 
        setPost(response);
      }
    }
  }
  
  useEffect(() => {
    fetchPost();
  }, [])
  
  return (
    <View style={styles.container}>
      {post && <FeedPost
                key={id}
                comments={post.comments}
                description={post.description}
                id={post.id}
                imageUrl={post.imageurl}
                likes={post.likes}
                stack={'search'}
                timestamp={post.timestamp}
                title={post.title}
                userid={post.userid}/>}
    </View>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  container: {
  }
});
