import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans'

interface Props {
  value: string;
  bold?: boolean;
  size?: number;
  color?: string;
  numberOfLines?: number; // Add optional numberOfLines prop
  ellipsize?: boolean; // Add optional ellipsize prop for text truncation
  // Add more props as needed (e.g., underline, textDecorationLine)
}

export const MyText = ({
  value,
  bold,
  size,
  color,
  numberOfLines,
  ellipsize,
  ...restProps // Spread remaining props for flexibility
}: Props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: size || 16, // Set default size if not provided
      color: color,
      fontFamily: 'DMSans_400Regular',
      ...(bold && { fontFamily: 'DMSans_700Bold' }), // Apply bold style conditionally
      ...(numberOfLines && { numberOfLines }), // Apply numberOfLines if provided
      ...(ellipsize && { textOverflow: 'ellipsis' }), // Apply text truncation if needed
    },
  });

  return (
    <Text style={styles.text}>{/* Spread remaining styles */}
      {value}
    </Text>
  );
};

