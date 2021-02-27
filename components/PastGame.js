import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const PastGame = (props) => {
  let names = '';
  for (const name in props.item.holes.one) {
    names = names + name + ', ';
  }
  names = names.slice(0, names.length - 2);
  return (
    <View key={props.item.gameId} style={gameStyles.container}>
      <TouchableOpacity style={gameStyles.btn}>
        <Text>Players: {names}</Text>
        <Text>Winner: {props.item.winner}</Text>
      </TouchableOpacity>

    </View>



  )
}

const gameStyles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRightColor: "white",
    borderLeftColor: 'white',
    backgroundColor: 'white',
    borderTopColor: 'white'
  },
  btn: {
    height: 100,
    width: "100%",
  }
})

export default PastGame;