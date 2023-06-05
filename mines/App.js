import React from 'react';
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

import Field from './src/components/Field';


function App () {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <Text style={styles.text}>BEM VINDO AO MINES!!</Text>
      
      <Text style={styles.welcome}>Tamanho da Grade: {params.getRowsAmount()} x {params.getColumnsAmount()}
      </Text>
      
      <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={6} />
      <Field mined />
      <Field opened mined exploded />
      <Field opened mined />
      <Field flagged />
      <Field flagged opened />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
  },
  
  text:{
    color: '#000',
    fontSize: 35,
  },
  welcome:{

  }
})

export default App;
