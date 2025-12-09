import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ChatBubble from '../components/ChatBubble';
import auth from '@react-native-firebase/auth';

export default function ChatRoomScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    return firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setMessages(snapshot.docs.map(doc => doc.data()))
      );
  }, []);

  const sendMessage = async () => {
    if (!message) return;
    await firestore().collection('messages').add({
       text: message,
       uid: auth().currentUser.uid,
       createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setMessage('');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <ChatBubble message={item} />}
      />
      <TextInput
        placeholder="Type message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
