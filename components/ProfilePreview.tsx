import { DocumentData } from 'firebase/firestore';
import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

interface Props {
  user: DocumentData|null
}

export const ProfilePreview = ({user} : Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: user?.pfp}}></Image>
      <Text>{user?.displayname}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '98%',
    backgroundColor: 'red',
    padding: 20,
  },
  image: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 20,
  }
});
