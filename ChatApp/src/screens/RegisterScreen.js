import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { colors } from '../theme/colors';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    await auth().createUserWithEmailAndPassword(email, password);
    navigation.replace('Chat');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail}/>
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword}/>
      <Button title="Register" color={colors.primary} onPress={register}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', padding:20, backgroundColor:colors.background },
  input:{ backgroundColor:colors.white, padding:12, borderRadius:8, marginBottom:12 }
});
