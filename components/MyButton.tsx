import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MyText } from './MyText';

interface Props {
  onPress: () => void
  color: string
  textColor: string
  title: string
  size?: 'small' | 'medium' | 'large'
}

export const MyButton = ({color, textColor, onPress, size, title}: Props) => {
  return (
    <Pressable style={[styles.container, {backgroundColor: color ? color : ''}]} onPress={onPress}>
      <MyText bold={true} color={textColor} value={title}/>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
});

{/* <Pressable onPress={handleFollow}>
                <View style={styles.not}>
                  <MyText bold={true} color={'white'} value={'follow'}/>
                </View>
              </Pressable>} */}
