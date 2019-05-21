import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SpotifyButton from '../components/SpotifyButton';

class LoginScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Spotify Dating</Text>
        <Text style={styles.welcomeTxt}>Welcome to Spotify Dating. Please Log-In with your Spotify Account. Test</Text>
        <Text style={styles.welcomeTxt}>You will need a Spotify Account in order to get started.</Text>
        < SpotifyButton style={styles.loginButton} text="LOGIN WITH SPOTIFY" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    marginTop: 100,
    fontFamily: 'ralewayBold',
    color: '#ffffff',
  },
  welcomeTxt: {
    fontSize: 25,
    marginTop: 60,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontFamily: 'ralewayLight',
    color: '#ffffff',
  },
  loginButton: {
    marginTop: 80,
  }
});

export default LoginScreen;