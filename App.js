import React, { Component } from 'react';
import Navigation from 'library/components/Navigation';
import { Font, AuthSession } from 'expo';


class App extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    console.log(AuthSession.getRedirectUrl());

    await Font.loadAsync({
      'ralewayBold': require('assets/fonts/Raleway/Raleway-Bold.ttf'),
      'ralewayLight': require('assets/fonts/Raleway/Raleway-Light.ttf'),
      'ralewayMedium': require('assets/fonts/Raleway/Raleway-Medium.ttf'),
      'ralewayRegular': require('assets/fonts/Raleway/Raleway-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
        <Navigation />
      ) : null
    );
  }
}

export default App;