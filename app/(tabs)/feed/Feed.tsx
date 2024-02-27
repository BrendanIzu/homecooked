import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FeedPost } from '../../../components/FeedPost';
import { PostData, getFeedPosts } from '../../../firebase/PostData';
import { MyText } from '../../../components/MyText';

export default function Feed() {
  const [posts, setPosts] = useState<PostData[]|null>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchPosts = async () => {
    const response = await getFeedPosts();
    
    if (response && response.length > 0) {
      setPosts(response);
      setIsLoading(false);
    } else {
      setPosts(null);
      setIsLoading(true);
    }
  }
  
  useEffect(() => {
    fetchPosts();
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  
  return(
      <SafeAreaView>
        {isLoading && 
        <View style={{height: '100%'}}>
          <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          </ScrollView>
        </View>
        }
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {posts?.map(({comments, description, id, imageurl, likes, timestamp, title, userid}) => {
            return (
              <FeedPost
                key={id}
                comments={comments}
                description={description}
                id={id}
                imageUrl={imageurl ? imageurl : '../assets/splash.png'}
                likes={likes}
                stack={'feed'}
                timestamp={timestamp}
                title={title}
                userid={userid}/>
            );
          })}
        </ScrollView>
      </SafeAreaView>
  )
}