import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Picker,
    TextInput,
    ScrollView,
    Alert,
    Button,
    ImageBackground,
} from 'react-native';
import cities from './city.json';

export class CityPicker extends React.Component {
    state = {
        city: '',
        searchedCities: [],
        name: '',
        temperature: '',
        pressure: '',
        humidity: '',
        icon: require('./sunburn.png'),
    }

    APIkey = "4e35eff8e0a2f91b735de7882a93041c"

    getWeatherData = async function(id) {
        var request = 'https://api.openweathermap.org/data/2.5/weather?id=' + id + '&appid=' + this.APIkey;
        console.log(request);
        try {
            let response = await fetch(request);
            let responseJson = await response.json();
            this.setState({
                name: responseJson.name,
                temp: Math.round(responseJson.main.temp - 273),
                pressure: responseJson.main.pressure,
                humidity: responseJson.main.humidity,
                icon: { uri: 'http://openweathermap.org/img/w/' + responseJson.weather[0].icon + '.png'},
            })
            console.log(responseJson);
            console.log(responseJson.weather[0].icon);
            console.log('http://openweathermap.org/img/w/' + responseJson.weather[0].icon + '.png');
        } catch (error) {
            console.error(error);
        }
    }

    updateCity = (itemValue) => {
        this.setState({ city: itemValue });
        this.getWeatherData(itemValue.id);
    }

    changeTextUpdateCity = (event) => {
        var text = event.nativeEvent.text;
        var searchedCity = cities.filter(function(city) {
            return city.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
        if (searchedCity.length == 1) {
            this.setState({ city: searchedCity[0] })
            this.getWeatherData(searchedCity[0].id);
        }
        else {
            Alert.alert(
                'Unable to resolve city',
                'Please re-enter exact city name or choose from picker below'
            );
        }
    }

    searchedCities = (searchedText) => {
        var searchedCities = cities.filter(function(city) {
            return city.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({
            searchedCities: searchedCities,
        });
    }

    clearCity = () => {
        this.setState({
            city: '',
        })
    }

    renderCity = (city) => {
        return (
            <View>
                <Text>{city.name}</Text>
            </View>
        );
    }

    render() {
        var cityList = [];
        for (let i = 0; i < cities.length; i++) {
            var value = {
                coord: cities[i].coord,
                country: cities[i].country,
                id: cities[i].id,
                name: cities[i].name,
            }
            cityList.push(
                <Picker.Item key={i} label={value.name} value={value} />
            );
        }

        return (
            <ScrollView>
                <TextInput
                    style={{marginTop: 50, height: 40, borderColor: 'gray', borderWidth: 1}}
                    onEndEditing={this.changeTextUpdateCity}
                    value={this.state.city.name}
                    placeholder="Enter your city/province"
                />
                <Button
                    onPress={this.clearCity}
                    title="Clear City"
                    style={{ marginBottom: 10 }}
                />
                <Picker
                selectedValue = {this.state.city}
                onValueChange = {this.updateCity}
                style={{height: 100, width: 200}}>
                    { cityList }
                </Picker>
                <Text style={styles.text}>{this.state.city.name}</Text>
                <ImageBackground
                    source={this.state.icon}
                    style={{height: 300, width: 300}}>
                        <Text>City: {this.state.name}</Text>
                        <Text>Temperature: {this.state.temp} C</Text>
                        <Text>Pressure: {this.state.pressure} P</Text>
                        <Text>Humidity: {this.state.humidity} %</Text>
                </ImageBackground>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red',
   }
})
