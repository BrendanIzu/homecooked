import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MyText } from './MyText';

interface Props {
  label: string
  value: string
}

export const ProfileInfoBar = ({label, value} : Props) => {
  return (
    <View style={styles.container}>
      <MyText value={label}/>
      <MyText value={value}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20, 
    width: 200,
    flexDirection: 'row',
    margin: 5,
  }
});
