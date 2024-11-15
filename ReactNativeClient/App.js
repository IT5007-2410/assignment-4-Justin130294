/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
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
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

// Add styles for the title
const styles = StyleSheet.create({
  appTitle: {
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: '#537791',
    // backgroundColor: '#1C5BA2',
    color: '#fff',
    padding: 10,
  },
  toastContentContainer: {
    paddingHorizontal: 15,
  },
  toastTitle: {
    fontSize: 20,
  },
  toastContent: {
    fontSize: 16,
  },
});

// Create styling config for the toast message
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={styles.toastContentContainer}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red'}}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};

// Main App component
export default class App extends React.Component {
  render() {
    return (
      <>
        <Text style={[styles.appTitle]}>🖥️ Issue Tracker</Text>
        <IssueList />
        <Toast config={toastConfig} />
      </>
    );
  }
}
