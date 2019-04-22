import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


export class Header extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>Weather App</Text>
                </View>
                <Text style={styles.text2}>Weather Statistics</Text>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        height: 50,
        width: width,
        backgroundColor: 'blue',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlignVertical: 'center',
    },
    text2: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        textAlignVertical: 'center',
    }
});
