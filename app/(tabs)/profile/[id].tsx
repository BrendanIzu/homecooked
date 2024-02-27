import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FeedPost } from '../../../components/FeedPost';
import { DocumentData } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';

interface Props {
  userid: string
}

const PostPage = () => {
  const local = useLocalSearchParams();
  
  return (
    <View>
      WIP
    </View>
    // <FeedPost
    //   comments={comments}
    //   description={description}
    //   imageUrl={imageurl ? imageurl : '../assets/splash.png'}
    //   likes={likes}
    //   timestamp={timestamp}
    //   title={title}
    //   userId={userid}/>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  container: {}
});
