import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text } from 'react-native';
import colors from 'assets/colors';
import strings from 'assets/strings';
import fonts from 'assets/fonts';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Erwond',
            userData: [
                {
                    title: 'Genres', data: [
                        'Indie-Rock',
                        'Romance',
                        'Cloud Trap',
                    ]
                },
                {
                    title: 'Bands', data: [
                        'Kodaline',
                        'Billie-Eilish',
                        'Grandson',
                        'Eminem',
                    ]
                },
                {
                    title: 'Songs', data: [
                        'Lose yourself - Eminem',
                        'High Hopes - Kodaline',
                        'Best Friends - Grandson',
                        'Blood and Water - Grandson',
                        'Mad World- Jasmine Thompson',
                        'Dont Stop Me Now - Queen',
                        'Stand By Me - Ben E King',
                    ]
                }
            ]
        }
    }
    render() {
        const { username, userData } = this.state;
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.basicFont]}>{username}</Text>
                <Text style={[styles.subtitle, styles.basicFont]}>{strings.home.title}</Text>
                <SectionList
                    sections={userData}
                    renderItem={({ item }) => <Text style={[styles.listItem, styles.basicFont]}>- {item}</Text>}
                    renderSectionHeader={({ section }) => <Text style={[styles.categoryTitle, styles.basicFont]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}>
                </SectionList>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.spotifyBlack,
        padding: 30,
    },
    basicFont: {
        color: colors.white,
    },
    title: {
        fontSize: 40,
        marginTop: 35,
        marginBottom: 10,
        fontFamily: fonts.title,
    },
    subtitle: {
        fontSize: 25,
        margin: 10,
        fontFamily: fonts.text,
    },
    categoryTitle: {
        fontSize: 22,
        margin: 10,
        fontFamily: fonts.lightText,
    },
    listItem: {
        marginLeft: 10,
        fontFamily: fonts.lightText,
        fontSize: 20,
    }
});

export default HomeScreen;