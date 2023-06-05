import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMinedBoard } from './src/Logic';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return{
      board: createMinedBoard(rows, cols, this.minesAmount())
    }
  }
  
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    
    return Math.ceil(cols*rows * params.difficultLevel)
  }


  render(){

  return (
    <SafeAreaView style={[styles.container]}>

      <View style={styles.board}>
        <MineField board={this.state.board} />
      </View>

    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems:'center',
  },
  board:{
    alignItems:'center',
    backgroundColor: '#aaa',
  },
})