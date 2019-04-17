/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { CountrySelection } from 'react-native-country-list';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  /**
   * Country selection action
   */
  onCountrySelection = (country) => {
    this.setState({selected: country});
  }

  render(){
    const { selected } = this.state;
    return (
      <View style={styles.container}>
        <CountrySelection action={(item) => this.onCountrySelection(item)} selected={selected}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 64,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
