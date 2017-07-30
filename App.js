import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { Font, LinearGradient } from 'expo';


const { width } = Dimensions.get('window');

// Gradient colors are taken from https://webgradients.com/
const quotes = [{
  message: 'Stop focusing on dumb shit. Don’t be afraid to break things. Don’t be romantic. Don’t take the time to breathe. Don’t aim for perfect. And whatever you do, keep moving.',
  author: 'Gary Vaynerchuk',
  gradientBackground: ['#ff9a9e', '#fad0c4'],
}, {
  message: 'Make it simple. Make it memorable. Make it inviting to look at. Make it fun to read.',
  author: 'Gary Vaynerchuck',
  gradientBackground: ['#a18cd1', '#fbc2eb'],
}, {
  message: `Don't quit. Never give up trying to build the world you can see, even if others can't see it. Listen to your drum and your drum only. It's the one that makes the sweetest sound.`,
  author: 'Simon Sinek',
  gradientBackground: ['#fad0c4', '#fad0c4']
}, {
  message: 'If you have the opportunity to do amazing things in your life, I strongly encourage you to invite someone to join you.',
  author: 'Simon Sinek',
  gradientBackground: ['#ffecd2', '#fcb69f']
}, {
  message: `I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'`,
  author: 'Muhammad Ali',
  gradientBackground: ['#ff9a9e', '#fecfef'],
}];

export default class App extends React.Component {
  state = {
    quoteIndex: 0,
    fontLoaded: false,
  };

  componentDidMount() {
    Font.loadAsync({
      'Prata': require('./assets/fonts/Prata-Regular.ttf'),
      'Average': require('./assets/fonts/Average-Regular.ttf'),
    }).then(() => {
      this.setState({
        fontLoaded: true,
      });
    });
  }

  nextQuote = () => {
    const { quoteIndex } = this.state;
    if (quoteIndex <= quotes.length - 2) {
      this.setState({ quoteIndex: quoteIndex + 1 });
    } else {
      this.setState({ quoteIndex: 0 });
    }
  }

  render() {
    const { quoteIndex, fontLoaded } = this.state;

    return (
      <LinearGradient colors={quotes[quoteIndex].gradientBackground} style={styles.container}>
        <Text style={[styles.message, fontLoaded && { fontFamily: 'Prata' }]}>{quotes[quoteIndex].message}</Text>
        <Text style={[styles.author, fontLoaded && { fontFamily: 'Average' }]}>{quotes[quoteIndex].author}</Text>

        <View style={styles.button}>
          <Button title={'Next quote'} onPress={this.nextQuote}/>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  message: {
    backgroundColor: 'transparent',
    fontSize: 26,
    marginBottom: 20,
  },
  author: {
    backgroundColor: 'transparent',
    fontSize: 18,
    width: width - 40,
    textAlign: 'right',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
  },
});
