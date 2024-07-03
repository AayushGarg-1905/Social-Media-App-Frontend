import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import ReduxStore from './src/redux/ReduxStore'

const App = () => {
  return (
    <Provider store={ReduxStore}>
      <RootNavigator/>
      <Toast/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})