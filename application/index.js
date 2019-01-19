import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Route, RouteStatusBar} from './config/route'
import { lightPurp } from '@utils/colors'

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RouteStatusBar backgroundColor={lightPurp} barStyle="light-content" />
        <Route/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App