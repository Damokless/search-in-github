import React, { useState } from 'react';
import fetch from 'node-fetch';
import { Text, TextInput, Button, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello github</Text>
      <TextInput placeholder='github Username' onChangeText={text => setUsername(text)} />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('ResultSearch', { username: username })}
      />
    </View>
  );
}

function ResultSearch({ route, navigation }) {
  const { username } = route.params;
  const [user, setUser] = useState({})

  async function getUserInfo(username) {
    const response = await fetch(`http://192.168.0.32:4242/user/${username}`);
    const data = await response.json();
    setUser(data)
  }
  getUserInfo(username)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.avatar} source={{uri: user.avatar_url}}/>
      <Text style={styles.title}>{user.login}</Text>
      <Text>{user.name}</Text>
      <Text>{user.bio}</Text>
      <Text>Followers {user.followers}</Text>
      <Text>Following {user.following}</Text>
      <Text>public_repos {user.public_repos}</Text>
      <Text>public_gists {user.public_gists}</Text>
      <Text>Location {user.location}</Text>
      <Text>Company {user.company}</Text>
      <Text>creation date {user.created_at.slice(0, 10).split('-').reverse().join('/')}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomePage" component={HomeScreen} options={{ title: 'Home Page' }} />
        <Stack.Screen name="ResultSearch" component={ResultSearch} options={{ title: 'Résultat de la recherche' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 100
  },
  title: { 
    fontSize: 30, 
    fontWeight:'bold',
  },
  bouton:{
    marginTop: 200
  }
});