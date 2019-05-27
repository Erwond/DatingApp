import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import SpotifyButton from '../components/SpotifyButton';
import { AuthSession } from 'expo';
import { spotifyCredentials } from '../auth/secrets';
import { encode as btoa } from 'base-64';

class LoginScreen extends Component {
  state = {
    result: null,
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Spotify Dating</Text>
        <Text style={styles.welcomeTxt}>Welcome to Spotify Dating. Please Log-In with your Spotify Account. Test</Text>
        <Text style={styles.welcomeTxt}>You will need a Spotify Account in order to get started.</Text>
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        < SpotifyButton style={styles.loginButton} text="LOGIN WITH SPOTIFY" onPress={getTokens} />
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

// Async Storage
const saveAccessToken = async accessToken => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.log(error.message);
  }
};

const getAccessToken = async () => {
  let accessToken = '';
  try {
    accessToken = await AsyncStorage.getItem('accessToken') || 'none';
  } catch (error) {
    console.log(error.message);
  }
  return accessToken;
}

const saveRefreshToken = async refreshToken => {
  try {
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.log(error.message);
  }
};

const getRefreshToken = async () => {
  let refreshToken = '';
  try {
    refreshToken = await AsyncStorage.getItem('refreshToken') || 'none';
  } catch (error) {
    console.log(error.message);
  }
  return refreshToken;
}

const saveExpirationTime = async expirationTime => {
  try {
    await AsyncStorage.setItem('expirationTime', "" + expirationTime);
  } catch (error) {
    console.log(error.message);
  }
};

const getExpirationTime = async () => {
  try {
    let expiration = '';
    expiration = await AsyncStorage.getItem('expirationTime') || 'none';
  } catch (error) {
    console.log(error.message);
  }
  return expiration;
}


// Get Tokens
const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode();
    const credentials = spotifyCredentials;
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
        }`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await saveAccessToken(accessToken);
    await saveRefreshToken(refreshToken);
    await saveExpirationTime(expirationTime);

  } catch (err) {
    console.error(err);
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