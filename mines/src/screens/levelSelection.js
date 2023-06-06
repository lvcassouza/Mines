import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default props => {
    return (
        <Modal onRequestClose={props.onCancel}
        visible={props.isVisible} animationType="slide"
        transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.tittle}>Selecione o Nível</Text>
                    
                    {/*botoes de dificuldade */}
                    <TouchableOpacity
                        style={[styles.button, styles.easy]}
                        onPress={()=>props.onLevelSelected(0.1)}>
                            <Text style={styles.buttonLabel}>Fácil</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.button, styles.medio]}
                        onPress={()=>props.onLevelSelected(0.2)}>
                            <Text style={styles.buttonLabel}>Médio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.hard]}
                        onPress={()=>props.onLevelSelected(0.3)}>
                            <Text style={styles.buttonLabel}>Difícil</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    frame:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container:{
        backgroundColor: '#eee',
        alignItems:'center',
        justifyContent:'center',
        padding:15,
    },
    tittle:{
        fontSize:30,
        fontWeight:'bold',
    },
    button:{
        padding:5,
        marginTop:10,
    },
    buttonLabel:{
        fontSize:20,
        color:'#eee',
        fontWeight:'bold',
    },
    easy:{
        backgroundColor:'#49b65d',
    },
    medio:{
        backgroundColor:'#2765f7',
    },
    hard:{
        backgroundColor:'#f26337',
    },
})