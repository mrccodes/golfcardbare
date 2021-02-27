import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import withData from '../withData.js';




class GameSelect extends React.Component {
  constructor(props) {
    super(props)

  }

  onNineHolesSelect = () => {
    this.props.data.toggleGameType(9)
    this.props.navigation.navigate('AddPlayers')
    this.props.data.setHolesList([1, 2, 3, 4, 5, 6, 7, 8, 9])
  }

  onEighteenHolesSelect = () => {
    this.props.data.toggleGameType(18)
    this.props.navigation.navigate('AddPlayers')
    this.props.data.setHolesList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
  }

  render() {
    return (
      <View style={gameselect.container}>
        <TouchableOpacity title="9holes" onPress={this.onNineHolesSelect}>
          <View style={gameselect.button}>
            <Text style={gameselect.buttonText}>9 Holes 🏌</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity title="18holes" onPress={this.onEighteenHolesSelect}>
          <View style={gameselect.button}>
            <Text style={gameselect.buttonText}>18 Holes 🏌‍♂</Text>
          </View>
        </TouchableOpacity>

      </View>

   );
  }
}

const gameselect = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white'
  },
  button: {
    marginBottom: 30,
    borderRadius: 8,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'green'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    padding: 20,
    color: 'white'
  },
  headerText: {
    color: 'black'
  }
});

export default withData(GameSelect)



