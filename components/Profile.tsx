import React, { useEffect, useState } from 'react';
import { Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProfileHeader } from './ProfileHeader';
import { ProfilePosts } from './ProfilePosts';
import { UserData, getUserFromId, getIsFollowing, unfollowUser, followUser } from '../firebase/UserData';
import { PostData, getUserPosts } from '../firebase/PostData';
import { MyText } from './MyText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stack } from '../interfaces/Stack';
import { MyButton } from './MyButton';

interface Props {
  userid: string
  stack : stack
}

export default function Profile({ userid, stack } : Props) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [user, setUser] = useState<UserData|null>(null);
  const [following, setFollowing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchIsFollowing = async () => {
    const response = await getIsFollowing(userid);
    if (response) {
      setFollowing(response);
    }
  }
  
  const fetchUser = async () => {
    const response = await getUserFromId(userid);
    if (response) {
      setUser(response);
    }
  }
  
  const fetchPosts = async () => {
    const response = await getUserPosts(userid);
    if (response) {
      setPosts(response);
    }
  }
  
  const handleFollow = async () => {
    if (following) {
      await unfollowUser(userid);
    } else {
      await followUser(userid);
    }
    setFollowing(!following);
  }
  
  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchIsFollowing();
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  
  
  return (
    <SafeAreaView>
      { user ? <ScrollView contentContainerStyle={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.header}>
            <ProfileHeader 
              followersCount={user.followers.length}
              followingCount={user.following.length}
              imageUrl={user.pfp != '' ? user.pfp : '../assets/splash.png'}
              displayname={user.displayname}/>
              <View style={styles.buttons}>
                {following ? 
                <MyButton onPress={handleFollow} color={'lightgrey'} textColor={'black'} title={'following'}/> : 
                <MyButton onPress={handleFollow} color={'skyblue'} textColor={'white'} title={'follow'}/>}
              </View>
            </View>
          <ProfilePosts posts={posts} stack={stack}/>
      </ScrollView> : <View><Text>loading</Text></View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttons: {
    width: 100,
    marginLeft: -50,
    
  },
  container: {
    height: '100%',
    paddingBottom: 100,
  },
  follow: {
    width: 100,
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginLeft: -55,
    alignItems: 'center'
  },
  not: {
    width: 100,
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    marginLeft: -55,
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  modal: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 200,
  }
})