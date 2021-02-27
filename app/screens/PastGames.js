import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import withData from '../../withData.js';
import axios from 'axios';
import PastGame from '../../components/PastGame.js'


const PastGames = ({ navigation, data }) => {
  const [gameView, setGameView] = useState(null);
  const [recentGames, setRecentGames] = useState(null)

  useEffect(() => {
    axios.get(`http://ec2-54-67-98-244.us-west-1.compute.amazonaws.com:3000/api/games`)
      .then((res) => {
        let games = [];
        for (var item in res.data) {
          games.unshift(res.data[item])
        }
        setRecentGames(games)
      })
  }, [])
  if (recentGames === null) {
    return (
      <View style={leaderboardStyles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>

    )
  }
  if (gameView === null) {
    return (
      <ScrollView contentContainerStyle={leaderboardStyles.container}>
        {recentGames.map((game) => (
          <PastGame key={game.id} item={game} />
        ))}
      </ScrollView>
    )
  }

}

const leaderboardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  }
})

export default withData(PastGames);