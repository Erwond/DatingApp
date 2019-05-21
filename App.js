import React, { Component } from 'react';
import Navigation from './src/screens/Navigation';
import { Font } from 'expo';


class App extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'ralewayBold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
      'ralewayLight': require('./assets/fonts/Raleway/Raleway-Light.ttf'),
      'ralewayMedium': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
      'ralewayRegular': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
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