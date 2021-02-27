import GameSelect from '../../components/GameSelect.js';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import withData from '../../withData.js'

const Home = ({ navigation }) => {
  return (
    < >
      <View style={textStyles.headerContainer}>
        <Text style={textStyles.header}>How much we golfin' today?</Text>
        <GameSelect navigation={navigation}/>
        <TouchableOpacity style={textStyles.leaderboards} onPress={() => {
          navigation.navigate('PastGames')
        }}>
          <Text style={textStyles.btnText}>Past Games</Text>
        </TouchableOpacity>
      </View>

    </>
  )
}

const textStyles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginTop: 60,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    marginBottom: 1,
    flex: 1,
    height: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboards: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderColor: "#fff",

  },
  btnText: {
    color: '#007AFF',
    textDecorationLine: 'underline'
  }
})

export default Home;