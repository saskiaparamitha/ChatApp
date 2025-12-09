import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { colors } from '../theme/colors';

export default function ChatBubble({ message }) {
  const isMe = message.uid === auth().currentUser.uid;

  return (
    <View style={[
      styles.bubble,
      isMe ? styles.me : styles.other
    ]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble:{
    maxWidth:'70%',
    padding:10,
    borderRadius:12,
    marginVertical:4
  },
  me:{
    backgroundColor: colors.primary,
    alignSelf:'flex-end'
  },
  other:{
    backgroundColor:'#ddd',
    alignSelf:'flex-start'
  },
  text:{ color:'#000' }
});
