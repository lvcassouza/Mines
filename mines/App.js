import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';
import Header from './src/components/Header';
import params from './src/params';
import MineField from './src/components/MineField';
import { cloneBoard,openField, createMinedBoard, hadExplosion, wonGame, showMines, invertFlag, flagsUsed } from './src/Logic';
import LevelSelection from './src/screens/levelSelection';



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return{
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) =>{
    const board = cloneBoard(this.state.board)
    openField(board,row,column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost){
      showMines(board)
      Alert.alert("LOOOOSER!", "Derrota!")
    }
    if (won) {
      Alert.alert('Winner! Winner! Chicken dinner.')
    }
    this.setState({board, lost, won})
  }
  
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    
    return Math.ceil(cols*rows * params.difficultLevel)

  }

  onSelectField = (row, column) => {
    
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Winner! Winner! Chicken dinner.')
    }

    this.setState({board, won})
  }

  onLevelSelected = level =>{
    params.difficultLevel = level
    this.setState(this.createState)
  }

  render(){

  return (
    <SafeAreaView style={[styles.container]}>
      <LevelSelection isVisible={this.state.showLevelSelection}
        onLevelSelected={this.onLevelSelected}
        onCancel={()=> this.setState({showLevelSelection: false})} />

          <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
            onNewGame={()=> this.setState(this.createState())} 
            onFlagPress={()=> this.setState({showLevelSelection: true})}/>

            <View style={styles.board}>
              <MineField board={this.state.board}
                onOpenField={this.onOpenField}
                onSelectField={this.onSelectField} />
            </View>

    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#aaa',
    justifyContent: 'flex-end',
    alignItems:'center',
  },
  board:{
    alignItems:'center',
    backgroundColor: '#aaa',
  },
})