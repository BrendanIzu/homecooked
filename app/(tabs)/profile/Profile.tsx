import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { ProfileHeader } from '../../../components/ProfileHeader';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProfilePosts } from '../../../components/ProfilePosts';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DB } from '../../../firebase/firebaseConfig';
import { PostData, getUserPosts } from '../../../firebase/PostData';
import { MyButton } from '../../../components/MyButton';

export default function Profile() {
  const [pfp, setPfp] = useState('');
  const [userid, setUserid] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState<PostData[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  // STUFF FOR GETTING AND SETTING PFP
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1 
    })
    
    if (!res.canceled) {
      let response = await fetch(res.assets[0].uri);
      let blob = await response.blob(); 
      
      const storageRef = ref(FIREBASE_STORAGE, "pfps/"+email);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      
      uploadTask.on("state_changed",
        (snapshot) => {
          
        }, 
        (error) => {
          console.log(error);
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          updateUserPicture(downloadUrl);
          setPfp(downloadUrl);
        })
      })
    }
  }
  
  // TODO: fix
  const updateUserPicture = async (imageUrl: string) => {
    if (userid) {
      // const userRef = doc(FIRESTORE_DB, 'users', userId);
      // const docSnapshot = await getDoc(userRef);

      // if (docSnapshot.exists()) {
      //   const response = await updateDoc(userRef, { pfp: imageUrl });
      // }
    }
  }
  
  const fetchUserInfo = async () => {
    const pfp = await AsyncStorage.getItem('pfp');
    const userid = await AsyncStorage.getItem('userid');
    const displayname = await AsyncStorage.getItem('displayname');
    const email = await AsyncStorage.getItem('email');
    const followers = await AsyncStorage.getItem('followers');
    const following = await AsyncStorage.getItem('following');
    
    if (pfp) setPfp(pfp);
    if (userid) setUserid(userid);
    if (displayname) setDisplayname(displayname);
    if (email) setEmail(email);
    if (followers) setFollowersCount(JSON.parse(followers).length);
    if (following) setFollowingCount(JSON.parse(following).length);
  }

  const fetchPosts = async () => {
    const response = await getUserPosts(userid);
    if (response) {
      setPosts(response);
    }
  }

  const logout = () => {
    signOut(FIREBASE_AUTH).then(() => {
      router.replace('');
    }).catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(() => {
    fetchUserInfo();
  }, []);
  
  useEffect(() => {
    fetchPosts();
  }, [userid]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserInfo();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.header}>
            <ProfileHeader 
              followersCount={followersCount ? followersCount : 0}
              followingCount={followingCount ? followingCount : 0}
              imageUrl={pfp != '' ? pfp : '../assets/splash.png'}
              displayname={displayname}/>
            
            <View style={styles.button}></View>
              <MyButton onPress={pickImage} color={'lightgrey'} textColor={'black'} title={'edit'}/>        
            </View>
          {posts && <ProfilePosts posts={posts} stack={'profile'}/>}
          <Button title="logout" onPress={logout}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginLeft: -50
  },
  container: {
    height: '100%',
    paddingBottom: 100,
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