import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import SpotifyButton from '../components/SpotifyButton';
import { AuthSession } from 'expo';
import { spotifyCredentials } from '../auth/secrets';

class LoginScreen extends Component {
  state = {
    result: null,
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Spotify Dating</Text>
        <Text style={styles.welcomeTxt}>Welcome to Spotify Dating. Please Log-In with your Spotify Account. Test</Text>
        <Text style={styles.welcomeTxt}>You will need a Spotify Account in order to get started.</Text>
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        < SpotifyButton style={styles.loginButton} text="LOGIN WITH SPOTIFY" onPress={getAuthorizationCode} />
      </View>
    );
  }
}

const scopesArr = ['user-read-currently-playing', 'user-library-read', 'playlist-read-private',
  'playlist-read-collaborative', 'user-read-recently-played', 'user-top-read', 'user-follow-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  try {
    const credentials = spotifyCredentials;
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    });
    return result.params.code;
  } catch (err) {
    console.error(err)
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