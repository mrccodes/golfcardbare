import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import withData from '../withData.js'

class Hole extends React.Component{
  constructor(props) {
    super(props)
  }
  onHolePress = () => {
    this.props.navigation.navigate('HolesView')
    this.props.data.changeHoleView(this.props.holeNumber)
  }
  render() {
    return(
      <View style={holeStyle.container} >
        <TouchableOpacity style={holeStyle.hole} onPress={() => {this.onHolePress()}}>
          <Text style={holeStyle.text}> {this.props.holeNumber} ⛳</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const holeStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  hole: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 80,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  text: {
    fontSize: 40
  }
})

export default withData(Hole);