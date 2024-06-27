import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <>
    <RootNavigator/>
    <Toast/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})