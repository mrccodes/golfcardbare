import React from 'react';
import axios from 'axios';
import 'react-native-gesture-handler';
import Home from './app/screens/Home.js';
import Holes from './app/screens/Holes.js';
import Context, { data } from './context.js';
import auth from '@react-native-firebase/auth'
import HoleView from './app/screens/HoleView.js';
import PastGames from './app/screens/PastGames.js';
import AddPlayers from './app/screens/AddPlayers.js';
import { ActivityIndicator, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';

firebase.initializeApp(environment.firebase);


const Stack = createStackNavigator();


class App extends React.Component {
  constructor() {
    super()
    this.toggleGameType = (type) => { this.setState({gameType: type}) }
    this.setHolesList = (list) => { this.setState({holesList: list}) }
    this.changeHoleView = (hole) => { this.setState({currentHole: hole}) }
    this.updateWinner = (winner) => { this.setState({winner: winner}) }

    this.addPlayer = (player) => {
      const currentPlayers = [...this.state.players, player];
      this.setState({players: currentPlayers})
    }

    this.updateScoreboard = (sb, hole) => {
      let scoreboard = {...this.state.scoreBoard}
      let newHoleScore = {}
      for (var player in sb) {
        newHoleScore[sb[player].name] = sb[player].score
      }
      scoreboard[hole] = newHoleScore;
      this.setState({scoreBoard:scoreboard});
    }

    this.createNewGame = () => {
      let playerNames = this.state.players.map((player) => (
        player.name
        ));
      let postBody = {
        numberOfHoles: this.state.gameType,
        players: playerNames
      }
      axios.post('http://ec2-54-67-98-244.us-west-1.compute.amazonaws.com:3000/api/games', postBody)
        .then((res) => {
          this.setState({
            scoreBoard: res.data.holes,
            currentGameId: res.data._id
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }

    this.state = {
      gameType: 8,
      user: {
        name: "Matt",
        id: "MattCarlos"
      },
      toggleGameType: this.toggleGameType,
      players: {
        name: "Matt",
        id: "MattCarlos"
      },
      addPlayer: this.addPlayer,
      removePlayer: this.removePlayer,
      holesList: [],
      setHolesList: this.setHolesList,
      createNewGame: this.createNewGame,
      currentGameId: null,
      scoreBoard: null,
      currentHole: 1,
      updateScoreboard: this.updateScoreboard,
      changeHoleView: this.changeHoleView,
      winner: "Incomplete Game",
      updateWinner: this.updateWinner,
      authUser: '',
      initializing: true
    }
  }

  updateHoles(holes) {
    this.setState({holes: holes})
  }

  onAuthStateChange(user) {
    this.setState({authUser: user});
    if (this.state.initializing) {
      this.setState({initializing: false})
    }
  }

  componentDidMount() {
    const subscriber = auth().onAuthStateChange(onAuthStateChange)
    return subscriber
  }

  render() {
    if (this.state.initializing) {
      return (
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1
        }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
    if (!user) {
      return (
         <View>
           <Text>Login</Text>
         </View>
         )
    }

     return (
      <Context.Provider value={this.state}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: "Welcome"}}
            />
            <Stack.Screen
              name="AddPlayers"
              component={AddPlayers}
              user={this.state.user}
              options={{title: "Add Friends"}}
              />
            <Stack.Screen
              name="Holes"
              component={Holes}
              />
            <Stack.Screen
              name="HolesView"
              component={HoleView}
              options={{title: 'Score'}}
              />
            <Stack.Screen
              name="PastGames"
              component={PastGames}
              options={{title: 'Past Games'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>

  );
  }

}

export default App;


    // this.removePlayer = (playerId) => {
    //   const currentPlayers = [...this.state.players];
    // }