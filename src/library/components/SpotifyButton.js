import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import colors from 'assets/colors';
import fonts from 'assets/fonts';
import images from 'assets/images';

class SpotifyButton extends Component {
    render() {
        const { text, onPress } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginButtonTxt}><Image source={images.spotifyIconWhite} style={styles.spotifyIcon} />   {text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: colors.spotifyGreen,
        borderRadius: 100,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginTop: 50,
    },
    loginButtonTxt: {
        color: colors.white,
        fontFamily: fonts.subtitle,
        fontSize: 17,
        textAlign: 'center',
    },
    spotifyIcon: {
        height: 20,
        width: 20,
    }
});

export default SpotifyButton;