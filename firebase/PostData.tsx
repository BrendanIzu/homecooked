import AsyncStorage from "@react-native-async-storage/async-storage"
import { DocumentData, Timestamp, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { FIRESTORE_DB } from "./firebaseConfig"

export interface PostData {
  id: string
  title: string
  description: string
  imageurl: string
  userid: string
  comments: string[]
  likes: number
  timestamp: string
}

const mapData = (doc: DocumentData) => {
    const data: PostData = {
      id: doc.id,
      title: doc.data()?.title || '',
      description: doc.data()?.description || '',
      imageurl: doc.data()?.imageurl || '',
      userid: doc.data()?.userid || '',
      comments: doc.data()?.comments || [],
      likes: doc.data()?.likes || 0,
      timestamp: doc.data()?.timestamp || ''
    }
    return data;
}

// get all posts associated with given userid
export const getUserPosts = async (id: string) => {
  const postsRef = collection(FIRESTORE_DB, 'posts');
  const q = query(postsRef, where('userid', '==', id), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(mapData);
}

export const getFeedPosts = async () => {
  const response = await AsyncStorage.getItem('following');
  if (response) {
    const following = JSON.parse(response);
    
    if (following.length > 0) {
      const postsRef = collection(FIRESTORE_DB, 'posts');
      const q = query(postsRef, where('userid', 'in', following), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q); ;
      
      const res = querySnapshot.docs.map(mapData)
      return res.length > 0 ? res : [];
    }
  }
}

export const getPost = async (id: string) => {
  const postsRef = collection(FIRESTORE_DB, 'posts');
  const postsDoc = doc(postsRef, id);
  const docSnapshot = await getDoc(postsDoc);
  return (docSnapshot.exists() ? mapData(docSnapshot) : null);
}