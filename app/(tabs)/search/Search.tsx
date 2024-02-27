import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchProfileResult from '../../../components/SearchProfileResult';
import { ProfilePreview } from '../../../components/ProfilePreview';
import { Link, router } from 'expo-router';
import { FIRESTORE_DB } from '../../../firebase/firebaseConfig';
import { UserData, getUserSearch } from '../../../firebase/UserData';

interface Props {}

export default function Search ({} : Props) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<null|UserData[]>([]);
  
  const updateSearch = async () => {
    const response = await getUserSearch(search);
    
    if (response) {
      setSearchResults(response);
    }
  }
  
  const handleSubmit = () => {
    if (!searchResults || searchResults.length === 0) {
      setSearchResults([])
    } else {
      console.log(searchResults);
    }
  }
  
  
  useEffect(() => {
    updateSearch();
  }, [search])
  
  const closeme = () => {
    Keyboard.dismiss();
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.search} onPress={closeme}>
        <Searchbar 
          placeholder="Type Here..."
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(t) => setSearch(t)}
          value={search}
          onSubmitEditing={handleSubmit}/>
        <View style={styles.results}>
          {searchResults && searchResults.map((user) => {
              return (<SearchProfileResult key={user.id} user={user}/>)})}
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    paddingLeft: 5,
  },
  container: {
    marginTop: -30,
    margin: 20
  },
  results: {
    padding: 10
  },
  search: {
    height: '100%',
  }
});


