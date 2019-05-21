import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

class SpotifyButton extends Component {
    render() {
        const { text, onPress } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginButtonTxt}><Image source={require('../../assets/images/Spotify_Icon_RGB_White.png')} style={styles.spotifyIcon} />   {text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#1DB954',
        borderRadius: 100,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginTop: 50,
    },
    loginButtonTxt: {
        color: 'white',
        fontFamily: 'ralewayMedium',
        fontSize: 17,
        textAlign: 'center',
    },
    spotifyIcon: {
        height: 20,
        width: 20,
    }
});

export default SpotifyButton;