import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SpotifyButton from 'library/components/SpotifyButton';
import { AuthSession } from 'expo';
import { spotifyCredentials } from 'library/networking/auth/secrets';
import { encode as btoa } from 'base-64';
import colors from 'assets/colors';
import strings from 'assets/strings';
import fonts from 'assets/fonts';
import { saveAccessToken, getAccessToken, saveRefreshToken, saveExpirationTime } from 'library/networking/auth/asyncStorage';

class LoginScreen extends Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{strings.login.title}</Text>
        <Text style={styles.welcomeTxt}>{strings.login.welcome}</Text>
        <Text style={styles.welcomeTxt}>{strings.login.instruction}</Text>
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        < SpotifyButton style={styles.loginButton} text={strings.login.button} onPress={getTokens} />
      </View>
    );
  }
}

const scopesArr = ['user-read-currently-playing', 'user-library-read', 'playlist-read-private',
  'playlist-read-collaborative', 'user-read-recently-played', 'user-top-read', 'user-follow-read'];
const scopes = scopesArr.join(' ');

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

// Get Auth Code
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
    backgroundColor: colors.spotifyBlack,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    marginTop: 100,
    fontFamily: fonts.title,
    color: colors.white,
  },
  welcomeTxt: {
    fontSize: 25,
    marginTop: 60,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontFamily: fonts.lightText,
    color: colors.white,
  },
  loginButton: {
    marginTop: 80,
  }
});

export default LoginScreen;