import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Flag from "./flag";

export default props =>{
    return(
        <View style={styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress} style={styles.flagButton} >
                    <Flag bigger />
                </TouchableOpacity>
                < Text style={styles.flagsLeft}>{props.flagsLeft}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
                <Text style={styles.buttonLabel}>Novo Jogo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#eee',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingHorizontal:100
    },
    flagContainer:{
        flexDirection:'row',
        paddingHorizontal:130,
    },
    flagButton:{
        marginTop: -2,
        minWidth: 20,
    },
    flagsLeft:{
        alignItems:'center',
        padding:5,
        fontSize:14,
        fontWeight:'bold',
        paddingTop:5,
        marginLeft:17,
        backgroundColor:'#999',
        color:'#ddd'
    },
    button:{
        backgroundColor:'#999',
        padding:7,
    },
    buttonLabel:{
        fontSize:15,
        color:'#ddd',
        fontWeight:'bold',
    }
})