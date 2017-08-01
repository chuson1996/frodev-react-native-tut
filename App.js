import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import sampleSize from 'lodash/sampleSize';
import gradients from './gradients.json';

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    data: sampleSize(gradients, 10),
    activeGradient: null,
    isModalOpen: false,
  }

  reload = () => {
    this.setState({
      data: sampleSize(gradients, 10)
    });
  }

  openGradient = (gradient) => {
    this.setState({
      activeGradient: gradient,
      isModalOpen: true,
    });
  }

  closeGradient = () => {
    this.setState({
      activeGradient: null,
      isModalOpen: false,
    });
  }

  render() {
    const { data, activeGradient, isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={isModalOpen}
        >
          {activeGradient &&
            <LinearGradient
              style={styles.gradientBackground}
              colors={activeGradient.colors}
            >
              <Text style={styles.title}>{activeGradient.name}</Text>
              <Text>{activeGradient.colors.join('→')}</Text>

              <TouchableOpacity onPress={() => this.closeGradient()}>
                <Ionicons name="ios-close" size={80} color="black" style={styles.closeButton}/>
              </TouchableOpacity>
            </LinearGradient>
          }
        </Modal>
        <Text style={styles.title}>WebGradients</Text>
        <Text style={styles.description}>
          These linear gradient colors are taken from webgradients.com
        </Text>
        <FlatList
          initialNumToRender={5}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => this.openGradient(item)}>
              <LinearGradient style={styles.listWrapper} colors={item.colors}>
                <Text style={styles.gradientName}>{item.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          refreshing={false}
          onRefresh={this.reload}
          ItemSeparatorComponent={() => <View style={styles.seperator}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  listWrapper: {
    flex: 1,
    height: width - 30 * 2,
    width: width - 30 * 2,
    marginHorizontal: 30,
    borderRadius: (width - 30 * 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seperator: {
    height: 60,
  },
  gradientName: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 40,
    backgroundColor: 'transparent',
  },
  description: {
    marginBottom: 50,
    marginTop: 20,
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
