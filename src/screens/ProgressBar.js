import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProgressView } from '@react-native-community/progress-view';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.ProgressStyle}>
      <ProgressView
        progressTintColor="orange"
        // trackTintColor="grey"
        progress={progress}
      />
    </View>
  )
}

export default ProgressBar;

const styles = StyleSheet.create({
  ProgressStyle:{
    position: 'absolute',
    top:500,
    bottom:0,
    left:30, 
    right:30,
    // flexDirection: 'column',
    // height: 20,
    // marginTop: 30,
    // marginLeft: 25,
    // marginRight: 25,
    // marginBottom: 40,
  },
})