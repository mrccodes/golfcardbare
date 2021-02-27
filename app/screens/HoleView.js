import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import withData from '../../withData.js';
import axios from 'axios';
import numToWord from '../../helpers/numToWord.js';

const HoleView = ({ navigation, data }) => {
  const [scoreBoard, updateScoreBoard] = useState([]);

  useEffect(() => {
    axios.get(`http://ec2-54-67-98-244.us-west-1.compute.amazonaws.com:3000/api/scoreboard/${data.currentGameId}/${data.currentHole}`)
    .then((res) => {
      const players = [...scoreBoard]
      for (const key in res.data) {
        const score = {};
        score.name = key;
        score.score = res.data[key]
        players.push(score)
      }
      updateScoreBoard(players)
    })
  }, []);

  const decrementScore = (name) => {
    const newScore = [...scoreBoard];
    newScore.forEach((user) => {
      if (user.name === name) {
        user.score--
      }
    })
    updateScoreBoard(newScore)
  }

  const incrementScore = (name) => {
    const newScore = [...scoreBoard];
    newScore.forEach((user) => {
      if (user.name === name) {
        user.score++
      }
    })
    updateScoreBoard(newScore)
  }

  const submitScore = () => {
    const gameId = data.currentGameId;
    const hole = data.currentHole;

    axios.post(`http://ec2-54-67-98-244.us-west-1.compute.amazonaws.com:3000/api/scoreboard/${data.currentGameId}/${data.currentHole}`, scoreBoard)
      .then((res) => {


        data.updateScoreboard(scoreBoard, numToWord[data.currentHole])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
  <View style={HoleViewStyle.container}>
    <Text style={HoleViewStyle.title}> Hole {data.currentHole}</Text>
    <FlatList
        data={scoreBoard}
        keyExtractor={item => item.name}
        renderItem={({item}) =>(
        <View style={HoleViewStyle.span}>
          <TouchableOpacity style={HoleViewStyle.dec} onPress={() => {
            decrementScore(item.name)
          }}>
            <Text style={HoleViewStyle.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={HoleViewStyle.stats} >{item.name}: {item.score}</Text>
          <TouchableOpacity style={HoleViewStyle.inc} onPress={() => {
            incrementScore(item.name)}}>
            <Text style={HoleViewStyle.btnText}>+</Text>
          </TouchableOpacity>
        </View>
        )}
      />
      <TouchableOpacity style={HoleViewStyle.save} onPress={() => {
        submitScore()
      }}>
            <Text style={HoleViewStyle.btnText}>Save</Text>
      </TouchableOpacity>
  </View>
  )
}

const HoleViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    flex: 1
  },
  stats: {
    fontSize: 40,
  },
  inc: {
    height: 35,
    width: 35,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  dec: {
    height: 35,
    width: 35,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey'
  },
  btnText: {
    fontSize: 30
  },
  span: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  save: {
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:30,
    width: 120,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue'

  }
})

export default withData(HoleView);

