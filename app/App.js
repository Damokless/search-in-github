import React, { useState } from 'react';
import fetch from 'node-fetch';
import { Text, TextInput, Button, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkerAlt, faBuilding, faBirthdayCake } from '@fortawesome/free-solid-svg-icons'

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
  const [date, setDate] = useState('')

  async function getUserInfo(username) {
    const response = await fetch(`http://192.168.0.32:4242/user/${username}`);
    const data = await response.json();
    setUser(data)
    setDate(user.created_at.slice(0, 10).split('-').reverse().join('/'))
  }
  getUserInfo(username)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <Image style={styles.avatar} source={{uri: user.avatar_url}}/>
      <Text style={styles.title}>{user.login}</Text>
      <Text style={styles.fullName}>{user.name}</Text>
      <Text style={styles.biography}>{user.bio}</Text>
      <Text><FontAwesomeIcon icon={ faMapMarkerAlt } />  {user.location}</Text>
      <Text><FontAwesomeIcon icon={ faBuilding } />  {user.company}</Text>
       <Text><FontAwesomeIcon icon={ faBirthdayCake } />  {date}</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={styles.inCase}>
          <Text>Followers</Text>
          <Text style={{textAlign: 'center'}}>{user.followers}</Text>
        </View>
        <View style={styles.inCase}>
          <Text>Following</Text>
          <Text style={{textAlign: 'center'}}>{user.following}</Text>
        </View>
        <View style={styles.inCase}>
          <Text>public repos</Text>
          <Text style={{textAlign: 'center'}}>{user.public_repos}</Text>
        </View>
        <View style={styles.inCase}>
          <Text>public gists</Text>
          <Text style={{textAlign: 'center'}}>{user.public_gists}</Text>
        </View>
      </View>
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
    width: 175,
    height: 175,
    borderRadius: 100,
    marginBottom: 75
  },
  title: { 
    fontSize: 40, 
    fontWeight:'bold',
  },
  fullName: {
    fontSize: 12,
    color: 'gray',
  },
  biography: {
    marginBottom: 15
  },
  case: {
    width: 0,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  inCase: {
    flex: 1,
    flexWrap: 'wrap',
    width: '15%',
    textAlign: 'center',
  }
});