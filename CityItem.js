import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export class CityItem extends React.Component {
    render () {
        return (
            <View>
                <Text style={styles.root}>{this.props.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        fontSize: 25,
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    }
})
