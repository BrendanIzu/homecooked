import AsyncStorage from "@react-native-async-storage/async-storage"
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { FIRESTORE_DB } from "./firebaseConfig"

export interface UserData {
  id: string
  displayname: string
  email: string
  followers: string[]
  following: string[]
  pfp: string
}

const mapData = (doc: DocumentData) => {
  const data: UserData = {
    id: doc.id,
    displayname: doc.data().displayname || '',
    email: doc.data().email || '',
    followers: doc.data().followers || [],
    following: doc.data().following || [],
    pfp: doc.data().pfp || ''
  }
  return data;
}

export const signUpUser = async (email: string, displayname: string) => {
  const usersRef = collection(FIRESTORE_DB, 'users');
  await addDoc(usersRef, {
    displayname: displayname, email: email, followers: [], following: [], pfp: 'https://firebasestorage.googleapis.com/v0/b/homecooked-ecf13.appspot.com/o/pfps%2FDefault_pfp.jpg?alt=media&token=5a742921-a1ac-489b-bc4f-190c20cf7dfb'
  })
}

export const populateRootUser = async () => {
  const email = await AsyncStorage.getItem('email');
  const usersRef = collection(FIRESTORE_DB, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q); ;

  querySnapshot.forEach((doc) => {
    // TODO: will need to update this when I add first and last name
    AsyncStorage.setItem('userid', doc.id);
    AsyncStorage.setItem('displayname', doc.data().displayname);
    AsyncStorage.setItem('pfp', doc.data().pfp);
    AsyncStorage.setItem('followers', JSON.stringify(doc.data().followers));
    AsyncStorage.setItem('following', JSON.stringify(doc.data().following));
  });
}

export const getUserFromId = async (id: string) => {
  const usersRef = collection(FIRESTORE_DB, 'users');
  const userDoc = doc(usersRef, id);
  const docSnapshot = await getDoc(userDoc);
  
  return (docSnapshot.exists() ? mapData(docSnapshot) : null);
}

export const getUserSearch = async (search: string) => {
  const usersRef = collection(FIRESTORE_DB, 'users');
  const q = query(usersRef, where('displayname', '==', search));
  const querySnapshot = await getDocs(q);
  
  const res = querySnapshot.docs.map(mapData);
  return res.length > 0 ? res : [];
} 

export const followUser = async (targetid: string) => {
  const userid = await AsyncStorage.getItem('userid');
  const response = await AsyncStorage.getItem('following');
  
  if (response && userid) {
    const following = JSON.parse(response);
    const index = following.indexOf(userid);
    
    if (index == -1) {
      following.push(userid);
      AsyncStorage.setItem('following', JSON.stringify(following));
      
      const usersRef = collection(FIRESTORE_DB, 'users');
      const userDoc = doc(usersRef, userid);
      await updateDoc(userDoc, {following: following});
    }
    
    // update target users followers
    const user = await getUserFromId(targetid);
    if (user) {
      const followers = user.followers;
      const index = followers.indexOf(userid);
      
      if (index == -1) {
        followers.push(userid);
      
        const usersRef = collection(FIRESTORE_DB, 'users');
        const userDoc2 = doc(usersRef, targetid)
        await updateDoc(userDoc2, {followers: followers});
      }
    }
  }
}

export const unfollowUser = async (targetid: string) => {
  const userid = await AsyncStorage.getItem('userid');
  const response = await AsyncStorage.getItem('following');
  
  if (response && userid) {
    const following = JSON.parse(response);
    const index = following.indexOf(targetid);
    if (index > -1) {
      following.splice(index, 1);
      AsyncStorage.setItem('following', JSON.stringify(following));
      
      const usersRef = collection(FIRESTORE_DB, 'users');
      const userDoc = doc(usersRef, userid);
      await updateDoc(userDoc, {following: following});
    }
    
    // update target users followers
    const user = await getUserFromId(targetid);
    if (user) {
      const followers = user.followers;
      const index = followers.indexOf(userid);
      
      if (index > -1) {
        followers.splice(index, 1);
        
        const usersRef = collection(FIRESTORE_DB, 'users');
        const userDoc2 = doc(usersRef, targetid)
        await updateDoc(userDoc2, {followers: followers});
      }
    }
  }
}

export const getIsFollowing = async (id: string) => {
  const response = await AsyncStorage.getItem('following');
  
  if (response) {
    const following = JSON.parse(response);
    return following.includes(id);
  }
}