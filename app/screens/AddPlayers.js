import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import withData from '../../withData.js';
import Player from '../../components/Player.js';



const AddPlayers = ({ navigation, data }) => {
  const [players, setPlayers] = useState([data.user])
  const [showInput, toggleInput] = useState('false')
  const [value, onChangeText] = useState('');

  const onAddPlayerPress = (name) => {
    const newPlayer = new Player(name);
    data.addPlayer(newPlayer);
    setPlayers([...players, newPlayer]);
    onChangeText('');
  }

  const onStartGamePress = () => {
    data.createNewGame();
    navigation.navigate('Holes')
  }

  return (
    <View style={addPlayersStyles.container}>
      <Text style={addPlayersStyles.players}>Players: </Text>
      <FlatList
        data={players}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text key={item.id.toString()} id={item.name} style={addPlayersStyles.header}>{item.name}</Text> }
      />

      <TextInput
      style={addPlayersStyles.input}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
      <TouchableOpacity style={addPlayersStyles.addButton} onPress={() => {
        onAddPlayerPress(value)
      }}>
        <Text>Add Player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={addPlayersStyles.startGame} onPress={() => {
        onStartGamePress()
      }}>
        <Text>Start Game</Text>
      </TouchableOpacity>
    </View>
  )
}

const addPlayersStyles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: "lightgrey",
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  addButton: {
    marginBottom: 30,
    borderRadius: 8,
    width: 180,
    height: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 260
  },
  startGame: {
    marginBottom: 30,
    borderRadius: 30,
    fontSize: 18,
    width: 180,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "center"
  },
  players: {
    fontSize: 50
  }
})

export default withData(AddPlayers);