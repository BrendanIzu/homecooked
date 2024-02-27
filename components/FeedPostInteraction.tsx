import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

interface componentNameProps {}

export const FeedPostInteraction = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => console.log('LIKE')}>
        <FontAwesome5 name="heart" size={40} color="black" />
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log('COMMENT')}>
        <FontAwesome6 name="comments" size={40} color="black" />
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log('REPOST')}>
        <AntDesign name="retweet" size={40} color="black" />
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  button: {
    margin: 10,
  }
});
