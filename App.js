import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Platform } from 'react-native';
import { LinearGradient, Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import sampleSize from 'lodash/sampleSize';
import gradients from './gradients.json';
import color from 'tinycolor2';

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    data: sampleSize(gradients, 10),
    refreshing: false
  }

  reload = () => {
    this.setState({
      refreshing: true,
    }, () => {
      if (Platform.OS === 'android') {
        this.update();
      }
    });
  }

  update = () => {
    if (this.state.refreshing) {
      this.setState({
        data: sampleSize(gradients, 10),
        refreshing: false,
      });
    }
  }

  render() {
    const { data, activeGradient, isModalOpen, refreshing } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>UI Gradients</Text>
          <Text style={styles.description}>
            Linear Gradients from webgradients.com
          </Text>
        </View>
        <FlatList
          onStartShouldSetResponder={() => true}
          onResponderRelease={this.update} // this only works on ios
          initialNumToRender={5}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <LinearGradient
              style={styles.listWrapper}
              colors={item.colors}
              start={[0, 0.5]}
              end={[1, 0.5]}
            >
              <Text
                style={[
                  styles.gradientName,
                  { color: color(item.colors[0]).isLight() ? 'black' : 'white' }
                ]
              }>{item.name}</Text>
              <View style={styles.colorsWrapper}>
                <Text style={[styles.color, { color: color(item.colors[0]).isLight() ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)' }]}>{item.colors[0]}</Text>
                <Text style={[styles.color, { color: color(item.colors[0]).isLight() ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)' }]}>{item.colors[1]}</Text>
              </View>
            </LinearGradient>
          )}
          refreshing={refreshing}
          onRefresh={this.reload}
          ItemSeparatorComponent={() => <View style={styles.seperator}/>}
          ListHeaderComponent={() => <View style={styles.seperator}/>}
          ListFooterComponent={() => <View style={styles.seperator}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#241937',
  },
  header: {
    elevation: 20,
    shadowColor: '#241937',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 2,
    zIndex: 1,
    // width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listWrapper: {
    flex: 1,
    height: 80,
    // width: width - 15 * 2,
    marginHorizontal: 15,
    paddingLeft: 20,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  color: {
    backgroundColor: 'transparent',
    marginRight: 15
  },
  colorsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 15
  },
  seperator: {
    height: 10,
  },
  gradientName: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: '#fbfcfd'
  },
  title: {
    fontSize: 40,
    backgroundColor: 'transparent',
    color: '#fbfcfd',
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
    color: '#fbfcfd',
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',
    marginVertical: 50,
  },
});
