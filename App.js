import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import cities from './city.json';
import { CityPicker } from './cityPicker.js';
import { Header } from './Header.js';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <CityPicker />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
