import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import withData from '../../withData.js';
import Hole from '../../components/Hole.js';
import axios from 'axios';



const Holes = ({ navigation, data }) => {
  var holeList;
  if (data.gameType === 9) {
    holeList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  } else {
    holeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  }

  const determineWinner = () => {
    let totals = {}
    let tracker = 0
    for (var hole in data.scoreBoard) {
      if (tracker === 0) {
        for (var person in data.scoreBoard[hole]) {
          totals[person] = data.scoreBoard[hole][person]
        }
      } else {
        totals[person] = totals[person] +  data.scoreBoard[hole][person]
      }
      tracker++
    }

    let lowestScore = null;
    let winner = "Incomplete Game";
    for (const player in totals) {
      if (totals[player] < lowestScore || lowestScore === null) {
        lowestScore = totals[player];
        winner = player;
      }
    }
    for (const player in totals) {
      if (totals[player] === lowestScore && player !== winner) {
        winner = "Tie"
      }
    }
    alert('Winner: ' + winner)
    data.updateWinner(winner)
    if (winner !== 'Incomplete Game') {
      axios.post(`http://ec2-54-67-98-244.us-west-1.compute.amazonaws.com:3000/api/winner/${data.currentGameId}/${winner}`)
        .then((info) => {
          navigation.navigate('Home')
        })
    }
  }

  return (
    <ScrollView contentContainerStyle={holesStyles.container} >
        {holeList.map((num) => (
          <View key={num.toString()}>
            <Hole  navigation={navigation}  holeNumber={num}/>
          </View>


        ))}
      <TouchableOpacity onPress={() => {
        determineWinner()
      }}>
        <Text style={holesStyles.finish}>Finish Game</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const holesStyles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  finish: {
    textDecorationLine: "underline",
    color: "#007AFF",
    fontSize: 20,
    marginBottom : 25
  }
})

export default withData(Holes);